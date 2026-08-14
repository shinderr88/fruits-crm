import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import DataTable, { Column } from "@/components/ui/DataTable";
import { GradeBadge } from "@/components/ui/Badge";
import { formatINR, localize } from "@/lib/utils";
import { PRICING } from "@/data/mockData";
import { PriceRecord } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function PricingPage() {
  const { language } = useLanguage();

  const columns: Column<PriceRecord>[] = useMemo(
    () => [
      { header: "SKU", accessor: (p) => <span className="font-medium">{localize(p.sku, language)}</span> },
      { header: "Grade", accessor: (p) => <GradeBadge grade={p.grade} /> },
      { header: "Unit", accessor: (p) => <span className="text-text-secondary">{p.unit}</span> },
      { header: "Price", accessor: (p) => <span className="font-mono font-semibold">{formatINR(p.price)}</span> },
      {
        header: "Change",
        accessor: (p) => {
          const diff = p.price - p.prevPrice;
          if (diff === 0) return <span className="text-text-muted font-mono text-xs">—</span>;
          const Icon = diff > 0 ? TrendingUp : TrendingDown;
          return (
            <span className={`inline-flex items-center gap-1 text-xs font-mono font-medium ${diff > 0 ? "text-teal" : "text-danger"}`}>
              <Icon size={12} />
              {formatINR(Math.abs(diff))}
            </span>
          );
        },
      },
      { header: "Updated", accessor: (p) => <span className="text-text-secondary">{p.updated}</span> },
    ],
    [language]
  );

  return (
    <div>
      <PageHeader eyebrow="Rates · Updated Daily" title="Pricing" />
      <Card>
        <DataTable columns={columns} rows={PRICING} keyExtractor={(p) => `${p.sku.en}-${p.grade}`} />
      </Card>
    </div>
  );
}
