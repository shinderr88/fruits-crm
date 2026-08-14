import { useState } from "react";
import { X } from "lucide-react";
import { OrderRecord } from "@/types";

interface OrderCreateModalProps {
  onClose: () => void;
  onCreate: (order: OrderRecord) => void;
}

export default function OrderCreateModal({
  onClose,
  onCreate,
}: OrderCreateModalProps) {
  const [form, setForm] = useState({
    retailer: "",
    routeId: "",
    items: 1,
    amount: "",
  });

  const update = (key: string, value: string | number) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.retailer.trim() ||
      !form.routeId.trim() ||
      !form.amount ||
      Number(form.items) <= 0
    ) {
      return;
    }

    const order: OrderRecord = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      retailer: form.retailer.trim(),
      routeId: form.routeId.trim(),
      items: Number(form.items),
      amount: Number(form.amount),
      status: "placed",
    };

    onCreate(order);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-text">
              Create Order
            </h2>

            <p className="mt-1 text-xs text-text-muted">
              Create a new incoming order.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <FormField label="Retailer">
            <input
              required
              value={form.retailer}
              onChange={(e) => update("retailer", e.target.value)}
              placeholder="Enter retailer name"
              className="form-input"
            />
          </FormField>

          <FormField label="Route">
            <input
              required
              value={form.routeId}
              onChange={(e) => update("routeId", e.target.value)}
              placeholder="RT-001"
              className="form-input"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Items">
              <input
                required
                min={1}
                type="number"
                value={form.items}
                onChange={(e) =>
                  update("items", Number(e.target.value))
                }
                className="form-input"
              />
            </FormField>

            <FormField label="Amount">
              <input
                required
                min={0}
                step="0.01"
                type="number"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                placeholder="0.00"
                className="form-input"
              />
            </FormField>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-4 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-text"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
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
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </span>

      {children}
    </label>
  );
}