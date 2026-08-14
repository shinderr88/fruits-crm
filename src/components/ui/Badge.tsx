import { Grade, OrderStatus } from "@/types";

const GRADE_LABEL: Record<Grade, string> = { Export: "EXPORT", A: "GRADE A", B: "GRADE B" };
const GRADE_CLASS: Record<Grade, string> = {
  Export: "bg-accent/15 text-accent border-accent/30",
  A: "bg-teal/15 text-teal border-teal/30",
  B: "bg-steel/15 text-steel border-steel/30",
};

export function GradeBadge({ grade }: { grade: Grade }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider border ${GRADE_CLASS[grade]}`}
    >
      {GRADE_LABEL[grade]}
    </span>
  );
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  dispatched: "Dispatched",
  delivered: "Delivered",
};
const STATUS_CLASS: Record<OrderStatus, string> = {
  placed: "text-text-secondary",
  confirmed: "text-accent",
  packed: "text-steel",
  dispatched: "text-teal",
  delivered: "text-success",
};
const STATUS_GLOW: Record<OrderStatus, string> = {
  placed: "bg-text-muted",
  confirmed: "bg-accent shadow-[0_0_6px_theme(colors.accent)]",
  packed: "bg-steel shadow-[0_0_6px_theme(colors.steel)]",
  dispatched: "bg-teal shadow-[0_0_6px_theme(colors.teal)]",
  delivered: "bg-success shadow-[0_0_6px_theme(colors.success)]",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${STATUS_CLASS[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_GLOW[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  );
}
