import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Brand {
  appName: string;
  tagline: string;
}

interface BrandContextValue extends Brand {
  setBrand: (brand: Brand) => void;
}

const DEFAULT_BRAND: Brand = { appName: "Aadhya Fresh Fruits", tagline: "Hub Console" };
const STORAGE_KEY = "hub:brand";

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

function getInitialBrand(): Brand {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return DEFAULT_BRAND;
  try {
    return { ...DEFAULT_BRAND, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_BRAND;
  }
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(getInitialBrand);

  useEffect(() => {
    document.title = `${brand.appName} — ${brand.tagline}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(brand));
  }, [brand]);

  return <BrandContext.Provider value={{ ...brand, setBrand: setBrandState }}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
