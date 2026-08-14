import { classNames } from "@/lib/utils";

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1.5 rounded text-xs font-medium border transition-colors",
        active
          ? "bg-accent text-bg border-accent"
          : "bg-surface text-text-secondary border-line hover:border-text-muted"
      )}
    >
      {label}
    </button>
  );
}
