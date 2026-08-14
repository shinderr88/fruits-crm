import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Mode = "dark" | "light";

export interface AccentPreset {
  key: string;
  label: string;
  dark: string;
  light: string;
}

// The one JS-side color list in the app — feeds the Settings swatches AND
// the actual --accent CSS variable. Add an entry here to offer a new brand color.
export const ACCENT_PRESETS: AccentPreset[] = [
  { key: "indigo", label: "Indigo", dark: "#4C6EF5", light: "#3355D9" },
  { key: "blue", label: "Blue", dark: "#3B82F6", light: "#2563EB" },
  { key: "violet", label: "Violet", dark: "#8B5CF6", light: "#7C3AED" },
  { key: "teal", label: "Teal", dark: "#14B8A6", light: "#0D9488" },
  { key: "rose", label: "Rose", dark: "#F43F5E", light: "#E11D48" },
  { key: "amber", label: "Amber", dark: "#F59E0B", light: "#B45309" },
];

interface ThemeContextValue {
  mode: Mode;
  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  accentKey: string;
  setAccentKey: (key: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MODE_STORAGE_KEY = "hub:theme-mode";
const ACCENT_STORAGE_KEY = "hub:theme-accent";

function getInitialMode(): Mode {
  const saved = localStorage.getItem(MODE_STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getInitialAccent(): string {
  const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
  return saved && ACCENT_PRESETS.some((p) => p.key === saved) ? saved : "indigo";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(getInitialMode);
  const [accentKey, setAccentKey] = useState<string>(getInitialAccent);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const preset = ACCENT_PRESETS.find((p) => p.key === accentKey) ?? ACCENT_PRESETS[0];
    document.documentElement.style.setProperty("--accent", preset[mode]);
    localStorage.setItem(ACCENT_STORAGE_KEY, accentKey);
  }, [accentKey, mode]);

  const toggleMode = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode, accentKey, setAccentKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
