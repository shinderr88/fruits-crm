import { LucideIcon } from "lucide-react";
import Card from "./Card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  accent?: "accent" | "teal" | "danger";
}

export default function StatCard({ icon: Icon, label, value, sub, accent = "accent" }: StatCardProps) {
  const iconColor = { accent: "text-accent", teal: "text-teal", danger: "text-danger" }[accent];
  return (
    <Card accent={accent} className="p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest text-text-muted font-mono">{label}</span>
        <Icon size={16} className={iconColor} />
      </div>
      <div className="text-2xl font-display font-bold text-text tabular-nums">{value}</div>
      {sub && <div className="text-xs text-text-secondary">{sub}</div>}
    </Card>
  );
}
