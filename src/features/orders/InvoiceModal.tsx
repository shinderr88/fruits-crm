import { Printer, X } from "lucide-react";
import { OrderRecord } from "@/types";
import { formatINR } from "@/lib/utils";

interface InvoiceModalProps {
  order: OrderRecord;
  onClose: () => void;
}

export default function InvoiceModal({
  order,
  onClose,
}: InvoiceModalProps) {
  const invoiceNumber = `INV-${order.id.replace("ORD-", "")}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className="mx-auto my-8 w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 print:hidden">
          <div>
            <h2 className="text-base font-semibold text-text">
              Invoice
            </h2>

            <p className="mt-1 text-xs text-text-muted">
              {invoiceNumber}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white hover:opacity-90"
            >
              <Printer size={15} />
              Print / PDF
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-text-muted hover:bg-surface-2 hover:text-text"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Invoice */}
        <div className="invoice-printable p-8">
          <div className="flex items-start justify-between border-b border-line pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                  E
                </div>

                <div>
                  <div className="text-lg font-bold text-text">
                    Enterprise Hub
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    Operations Platform
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold tracking-tight text-text">
                INVOICE
              </div>

              <div className="mt-1 font-mono text-xs text-text-secondary">
                {invoiceNumber}
              </div>

              <div className="mt-1 text-xs text-text-muted">
                {new Date().toLocaleDateString("en-IN")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 border-b border-line py-6">
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Bill To
              </div>

              <div className="text-sm font-semibold text-text">
                {order.retailer}
              </div>

              <div className="mt-1 text-xs text-text-secondary">
                Route: {order.routeId}
              </div>
            </div>

            <div className="text-right">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Order
              </div>

              <div className="font-mono text-sm font-medium text-text">
                {order.id}
              </div>

              <div className="mt-1 text-xs capitalize text-text-secondary">
                Status: {order.status}
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="overflow-hidden rounded-lg border border-line">
              <div className="grid grid-cols-[1fr_100px_140px] border-b border-line bg-surface-2 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                <span>Description</span>
                <span className="text-right">Items</span>
                <span className="text-right">Amount</span>
              </div>

              <div className="grid grid-cols-[1fr_100px_140px] px-4 py-4 text-sm">
                <span className="text-text">
                  Order {order.id}
                </span>

                <span className="text-right font-mono tabular-nums text-text-secondary">
                  {order.items}
                </span>

                <span className="text-right font-mono font-semibold tabular-nums text-text">
                  {formatINR(order.amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-b border-line pb-6">
            <div className="w-64">
              <div className="flex items-center justify-between py-2 text-sm">
                <span className="text-text-secondary">
                  Subtotal
                </span>

                <span className="font-mono text-text">
                  {formatINR(order.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-3 text-base font-semibold">
                <span className="text-text">Total</span>

                <span className="font-mono text-accent">
                  {formatINR(order.amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center">
            <div className="text-xs font-medium text-text-secondary">
              Thank you for your business.
            </div>

            <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-text-muted">
              Generated by Enterprise Hub
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}