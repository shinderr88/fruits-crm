import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}

export default function PageHeader({ eyebrow, title, action }: PageHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent font-mono mb-1">
          <span className="w-3.5 h-[2px] bg-accent inline-block" />
          {eyebrow}
        </div>
        <h1 className="text-xl font-display font-bold text-text">{title}</h1>
      </div>
      {action}
    </div>
  );
}
