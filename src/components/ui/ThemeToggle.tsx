import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  return (
    <button
      onClick={toggleMode}
      className="w-8 h-8 rounded-md flex items-center justify-center border border-line bg-surface text-text-muted hover:text-text transition-colors"
      aria-label="Toggle theme"
      title={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
