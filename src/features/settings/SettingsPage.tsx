import { useState } from "react";
import { Check, Sun, Moon } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { useBrand } from "@/context/BrandContext";
import { useTheme, ACCENT_PRESETS } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { classNames } from "@/lib/utils";

export default function SettingsPage() {
  const { appName, tagline, setBrand } = useBrand();
  const { mode, setMode, accentKey, setAccentKey } = useTheme();
  const { language, setLanguage } = useLanguage();

  const [nameDraft, setNameDraft] = useState(appName);
  const [taglineDraft, setTaglineDraft] = useState(tagline);

  const saveBrand = () => setBrand({ appName: nameDraft.trim() || appName, tagline: taglineDraft.trim() || tagline });

  return (
    <div>
      <PageHeader eyebrow="Configuration" title="Settings" />

      <div className="grid grid-cols-2 gap-4">
        {/* Branding */}
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-4">Branding</div>

          <label className="block text-xs font-medium text-text-secondary mb-1.5">App name</label>
          <input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={saveBrand}
            className="w-full mb-4 px-3 py-2 rounded-md bg-bg border border-line text-sm text-text outline-none focus:border-accent"
          />

          <label className="block text-xs font-medium text-text-secondary mb-1.5">Tagline / sidebar eyebrow</label>
          <input
            value={taglineDraft}
            onChange={(e) => setTaglineDraft(e.target.value)}
            onBlur={saveBrand}
            className="w-full px-3 py-2 rounded-md bg-bg border border-line text-sm text-text outline-none focus:border-accent"
          />
          <p className="text-xs text-text-muted mt-3">
            Shown in the sidebar and the browser tab title. Saved automatically.
          </p>
        </Card>

        {/* Product language */}
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-4">Product Language</div>
          <p className="text-xs text-text-secondary mb-4">
            Controls which language SKU names display in on Inventory and Pricing —
            independent of the interface language.
          </p>
          <div className="flex gap-2">
            {(["en", "mr"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={classNames(
                  "flex-1 py-2.5 rounded-md text-sm font-medium border transition-colors",
                  language === lang
                    ? "bg-accent text-bg border-accent"
                    : "bg-bg text-text-secondary border-line hover:border-text-muted"
                )}
              >
                {lang === "en" ? "English" : "मराठी"}
              </button>
            ))}
          </div>
        </Card>

        {/* Appearance — mode */}
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-4">Appearance</div>
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => setMode("dark")}
              className={classNames(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium border transition-colors",
                mode === "dark"
                  ? "bg-accent text-bg border-accent"
                  : "bg-bg text-text-secondary border-line hover:border-text-muted"
              )}
            >
              <Moon size={14} /> Dark
            </button>
            <button
              onClick={() => setMode("light")}
              className={classNames(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium border transition-colors",
                mode === "light"
                  ? "bg-accent text-bg border-accent"
                  : "bg-bg text-text-secondary border-line hover:border-text-muted"
              )}
            >
              <Sun size={14} /> Light
            </button>
          </div>
        </Card>

        {/* Appearance — accent */}
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-4">Brand Color</div>
          <div className="flex gap-3 flex-wrap">
            {ACCENT_PRESETS.map((preset) => {
              const active = accentKey === preset.key;
              return (
                <button
                  key={preset.key}
                  onClick={() => setAccentKey(preset.key)}
                  title={preset.label}
                  className="flex flex-col items-center gap-1.5"
                >
                  {/* The swatch color itself is the thing being chosen — the one
                      place in the app where a literal color value in JSX is the
                      point, not a styling shortcut. Every other component reads
                      color only from Tailwind classes tied to CSS variables. */}
                  <span
                    className={classNames(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-transform",
                      active ? "ring-2 ring-offset-2 ring-offset-surface scale-105" : ""
                    )}
                    style={{ backgroundColor: preset[mode], ...(active ? { boxShadow: `0 0 0 2px ${preset[mode]}` } : {}) }}
                  >
                    {active && <Check size={14} color="#fff" strokeWidth={3} />}
                  </span>
                  <span className="text-[10px] text-text-muted">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
