import { useMemo, useState } from "react";
import {
  FileText,
  Plus,
  Search,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import DataTable, { Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/Badge";

import { formatINR } from "@/lib/utils";
import { ORDERS } from "@/data/mockData";
import { OrderRecord, OrderStatus } from "@/types";

import OrderCreateModal from "./OrderCreateModal";
import InvoiceModal from "./InvoiceModal";

const STATUSES: Array<OrderStatus | "all"> = [
  "all",
  "placed",
  "confirmed",
  "packed",
  "dispatched",
  "delivered",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(ORDERS);
  const [filter, setFilter] =
    useState<OrderStatus | "all">("all");

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);

  const [invoiceOrder, setInvoiceOrder] =
    useState<OrderRecord | null>(null);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        filter === "all" || order.status === filter;

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.retailer.toLowerCase().includes(query) ||
        order.routeId.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orders, filter, search]);

  const handleCreateOrder = (order: OrderRecord) => {
    setOrders((current) => [order, ...current]);
    setCreateOpen(false);
  };

  const columns: Column<OrderRecord>[] = [
    {
      header: "Order",
      accessor: (o) => (
        <span className="font-mono font-medium">
          {o.id}
        </span>
      ),
    },

    {
      header: "Retailer",
      accessor: (o) => o.retailer,
    },

    {
      header: "Route",
      accessor: (o) => (
        <span className="font-mono text-text-secondary">
          {o.routeId}
        </span>
      ),
    },

    {
      header: "Items",
      accessor: (o) => (
        <span className="font-mono tabular-nums">
          {o.items}
        </span>
      ),
    },

    {
      header: "Amount",
      accessor: (o) => (
        <span className="font-mono tabular-nums">
          {formatINR(o.amount)}
        </span>
      ),
    },

    {
      header: "Status",
      accessor: (o) => (
        <StatusBadge status={o.status} />
      ),
    },

    {
      header: "Invoice",
      accessor: (o) => (
        <button
          type="button"
          onClick={() => setInvoiceOrder(o)}
          className="
            inline-flex items-center gap-1.5
            rounded-md
            px-2.5 py-1.5
            text-xs
            text-text-secondary
            hover:bg-accent/10
            hover:text-accent
            transition-colors
          "
        >
          <FileText size={14} />
          Invoice
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Incoming Queue"
        title="Orders"
      />

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-sm">
            <Search
              size={16}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-text-muted
              "
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders, retailers..."
              className="form-input pl-9"
            />
          </div>

          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="
              inline-flex items-center
              justify-center gap-2
              rounded-lg
              bg-accent
              px-4 py-2
              text-sm font-semibold
              text-white
              shadow-[0_0_20px_var(--accent-glow)]
              hover:brightness-110
              transition-all
            "
          >
            <Plus size={16} />
            Create Order
          </button>
        </div>
      </Card>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((status) => (
          <Chip
            key={status}
            label={
              status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() +
                  status.slice(1)
            }
            active={filter === status}
            onClick={() => setFilter(status)}
          />
        ))}
      </div>

      {/* Table */}
      <Card>
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
              Order Queue
            </div>

            <div className="mt-1 text-xs text-text-secondary">
              {rows.length}{" "}
              {rows.length === 1 ? "order" : "orders"}
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          keyExtractor={(o) => o.id}
        />
      </Card>

      {/* Create order */}
      {createOpen && (
        <OrderCreateModal
          onClose={() => setCreateOpen(false)}
          onCreate={handleCreateOrder}
        />
      )}

      {/* Invoice */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
}