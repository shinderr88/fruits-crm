import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import DataTable, { Column } from "@/components/ui/DataTable";
import { ROUTES } from "@/data/mockData";
import { RouteInfo } from "@/types";
import RevenueTrendChart from "./RevenueTrendChart";
import GradeMixChart from "./GradeMixChart";

const columns: Column<RouteInfo>[] = [
  { header: "Route", accessor: (r) => <span className="font-medium">{r.name}</span> },
  { header: "Supervisor", accessor: (r) => <span className="text-text-secondary">{r.supervisor}</span> },
  { header: "Retailers", accessor: (r) => <span className="font-mono">{r.retailers}</span> },
  {
    header: "Pending Orders",
    accessor: (r) => (
      <span className={`font-mono font-semibold ${r.pending > 5 ? "text-danger" : "text-teal"}`}>{r.pending}</span>
    ),
  },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader eyebrow="Performance · Last 4 Weeks" title="Reports" />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-4">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-3">Revenue Trend</div>
          <RevenueTrendChart />
        </Card>
        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-3">Grade Mix</div>
          <GradeMixChart />
        </Card>
      </div>

      <Card className="p-4">
        <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-3">Route Performance</div>
        <DataTable columns={columns} rows={ROUTES} keyExtractor={(r) => r.id} />
      </Card>
    </div>
  );
}
