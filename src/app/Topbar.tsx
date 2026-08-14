import { Bell } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Topbar() {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-line bg-bg">
      <div className="text-xs text-text-muted font-mono">
        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="relative text-text-muted hover:text-text transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-danger shadow-[0_0_6px_theme(colors.danger)]" />
        </button>
      </div>
    </header>
  );
}
