import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Edit3,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import DataTable, { Column } from "@/components/ui/DataTable";
import { GradeBadge } from "@/components/ui/Badge";
import { INVENTORY } from "@/data/mockData";
import { InventoryBatch } from "@/types";
import { localize } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type InventoryForm = {
  sku: string;
  grade: InventoryBatch["grade"];
  batch: string;
  qty: number;
  unit: string;
  received: string;
  agingDays: number;
};

const emptyForm: InventoryForm = {
  sku: "",
  grade: "A",
  batch: "",
  qty: 0,
  unit: "kg",
  received: "",
  agingDays: 0,
};

export default function InventoryPage() {
  const { language } = useLanguage();

  const [inventory, setInventory] = useState<InventoryBatch[]>(INVENTORY);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<InventoryBatch | null>(null);
  const [form, setForm] = useState<InventoryForm>(emptyForm);

  const filteredInventory = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return inventory;

    return inventory.filter((item) => {
      return (
        item.batch.toLowerCase().includes(query) ||
        String(item.sku).toLowerCase().includes(query) ||
        String(item.grade).toLowerCase().includes(query)
      );
    });
  }, [inventory, search]);

  const openAddModal = () => {
    setEditingBatch(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: InventoryBatch) => {
    setEditingBatch(item);

    setForm({
      sku: localize(item.sku, language),
      grade: item.grade,
      batch: item.batch,
      qty: item.qty,
      unit: item.unit,
      received: item.received,
      agingDays: item.agingDays,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBatch(null);
    setForm(emptyForm);
  };

  const handleDelete = (batch: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete batch ${batch}?`
    );

    if (!confirmed) return;

    setInventory((current) =>
      current.filter((item) => item.batch !== batch)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.batch.trim() || !form.sku.trim() || form.qty < 0) {
      return;
    }

    if (editingBatch) {
      setInventory((current) =>
        current.map((item) =>
          item.batch === editingBatch.batch
            ? {
                ...item,
                sku: { en: form.sku, mr: form.sku },
                grade: form.grade as InventoryBatch["grade"],
                batch: form.batch,
                qty: form.qty,
                unit: form.unit,
                received: form.received,
                agingDays: form.agingDays,
              }
            : item
        )
      );
    } else {
      const newBatch: InventoryBatch = {
        sku: { en: form.sku, mr: form.sku },
        grade: form.grade as InventoryBatch["grade"],
        batch: form.batch,
        qty: form.qty,
        unit: form.unit,
        received: form.received,
        agingDays: form.agingDays,
      };

      setInventory((current) => [newBatch, ...current]);
    }

    closeModal();
  };

  const columns: Column<InventoryBatch>[] = useMemo(
    () => [
      {
        header: "SKU",
        accessor: (i) => (
          <span className="font-mono text-xs">
            {localize(i.sku, language)}
          </span>
        ),
      },

      {
        header: "Grade",
        accessor: (i) => <GradeBadge grade={i.grade} />,
      },

      {
        header: "Batch",
        accessor: (i) => (
          <span className="font-mono text-xs text-text">
            {i.batch}
          </span>
        ),
      },

      {
        header: "Qty",
        accessor: (i) => (
          <div className="flex items-center gap-2">
            <span
              className={`font-mono tabular-nums ${
                i.qty < 100 ? "text-danger font-semibold" : "text-text"
              }`}
            >
              {i.qty}
            </span>

            <span className="text-xs text-text-muted">{i.unit}</span>

            {i.qty < 100 && (
              <AlertTriangle
                size={14}
                className="text-danger"
                aria-label="Low stock"
              />
            )}
          </div>
        ),
      },

      {
        header: "Received",
        accessor: (i) => (
          <span className="text-text-secondary">
            {i.received}
          </span>
        ),
      },

      {
        header: "Ageing",
        accessor: (i) => (
          <span
            className={`font-mono text-xs px-2 py-0.5 rounded ${
              i.agingDays > 5
                ? "bg-danger/15 text-danger"
                : i.agingDays > 3
                ? "bg-warning/15 text-warning"
                : "bg-surface-2 text-text-secondary"
            }`}
          >
            Day {i.agingDays}
          </span>
        ),
      },

      {
        header: "Actions",
        accessor: (i) => (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => openEditModal(i)}
              className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
              aria-label={`Edit ${i.batch}`}
            >
              <Edit3 size={15} />
            </button>

            <button
              type="button"
              onClick={() => handleDelete(i.batch)}
              className="p-1.5 rounded-md text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
              aria-label={`Delete ${i.batch}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ),
      },
    ],
    [language]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inventory"
        title="Manage stock batches, quantities and ageing."
      />

      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SKU, grade or batch..."
              className="
                w-full rounded-lg
                border border-line
                bg-surface-2
                pl-9 pr-3 py-2
                text-sm text-text
                placeholder:text-text-muted
                outline-none
                focus:border-accent
                transition-colors
              "
            />
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="
              inline-flex items-center justify-center gap-2
              rounded-lg
              bg-accent
              px-4 py-2
              text-sm font-medium
              text-white
              hover:opacity-90
              transition-opacity
            "
          >
            <Plus size={16} />
            Add Batch
          </button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono">
              Inventory Batches
            </div>

            <div className="mt-1 text-xs text-text-secondary">
              {filteredInventory.length}{" "}
              {filteredInventory.length === 1 ? "batch" : "batches"}
            </div>
          </div>
        </div>

        <DataTable<InventoryBatch>
          columns={columns}
          rows={filteredInventory}
          keyExtractor={(i) => i.batch}
        />
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="
              w-full max-w-lg
              rounded-xl
              border border-line
              bg-surface
              shadow-2xl
            "
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-text">
                  {editingBatch ? "Update Batch" : "Add Inventory Batch"}
                </h2>

                <p className="mt-0.5 text-xs text-text-muted">
                  {editingBatch
                    ? "Update inventory batch details."
                    : "Add a new inventory batch to stock."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-md text-text-muted hover:text-text hover:bg-surface-2"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="SKU">
                  <input
                    required
                    value={form.sku}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sku: e.target.value }))
                    }
                    className="form-input"
                    placeholder="SKU-001"
                  />
                </FormField>

                <FormField label="Grade">
                  <select
                    value={form.grade}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        grade: e.target.value as InventoryBatch["grade"],
                      }))
                    }
                    className="form-input"
                  >
                    <option value="Export">Export</option>
                    <option value="A">Grade A</option>
                    <option value="B">Grade B</option>
                  </select>
                </FormField>

                <FormField label="Batch">
                  <input
                    required
                    value={form.batch}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, batch: e.target.value }))
                    }
                    className="form-input"
                    placeholder="BATCH-001"
                  />
                </FormField>

                <FormField label="Quantity">
                  <input
                    required
                    min="0"
                    type="number"
                    value={form.qty}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        qty: Number(e.target.value),
                      }))
                    }
                    className="form-input"
                  />
                </FormField>

                <FormField label="Unit">
                  <select
                    value={form.unit}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, unit: e.target.value }))
                    }
                    className="form-input"
                  >
                    <option value="kg">kg</option>
                    <option value="ton">ton</option>
                    <option value="units">units</option>
                    <option value="boxes">boxes</option>
                  </select>
                </FormField>

                <FormField label="Received">
                  <input
                    required
                    value={form.received}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        received: e.target.value,
                      }))
                    }
                    className="form-input"
                    placeholder="08 Aug 2026"
                  />
                </FormField>

                <FormField label="Ageing Days">
                  <input
                    min="0"
                    type="number"
                    value={form.agingDays}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        agingDays: Number(e.target.value),
                      }))
                    }
                    className="form-input"
                  />
                </FormField>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    rounded-lg border border-line
                    px-4 py-2 text-sm
                    text-text-secondary
                    hover:bg-surface-2
                    hover:text-text
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    rounded-lg bg-accent
                    px-4 py-2 text-sm font-medium text-white
                    hover:opacity-90
                  "
                >
                  {editingBatch ? "Update Batch" : "Add Batch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-wider font-mono text-text-muted">
        {label}
      </span>

      {children}
    </label>
  );
}