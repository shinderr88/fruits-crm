import { useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";
import DataTable, { Column } from "@/components/ui/DataTable";
import { formatINR } from "@/lib/utils";
import { RETAILERS } from "@/data/mockData";
import { RetailerRecord } from "@/types";

const columns: Column<RetailerRecord>[] = [
  { header: "Retailer", accessor: (r) => <span className="font-medium">{r.name}</span> },
  { header: "Route", accessor: (r) => <span className="font-mono text-text-secondary">{r.routeId}</span> },
  { header: "Orders (30d)", accessor: (r) => <span className="font-mono">{r.orders30d}</span> },
  {
    header: "Outstanding",
    accessor: (r) => (
      <span className={`font-mono font-semibold ${r.outstanding > 0 ? "text-danger" : "text-teal"}`}>
        {r.outstanding > 0 ? formatINR(r.outstanding) : "Clear"}
      </span>
    ),
  },
];

export default function RetailersPage() {
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => RETAILERS.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div>
      <PageHeader
        eyebrow="Onboarded Shops"
        title="Retailers"
        action={<SearchInput value={query} onChange={setQuery} placeholder="Search retailer..." />}
      />
      <Card>
        <DataTable columns={columns} rows={rows} keyExtractor={(r) => r.name} />
      </Card>
    </div>
  );
}
