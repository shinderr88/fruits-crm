import { ClipboardList, TrendingUp, AlertTriangle, Truck } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import DataTable, { Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/Badge";
import { formatINR } from "@/lib/utils";
import { ORDERS, ROUTES, INVENTORY } from "@/data/mockData";
import { OrderRecord } from "@/types";
import RouteVolumeChart from "./RouteVolumeChart";

const recentColumns: Column<OrderRecord>[] = [
  { header: "Order", accessor: (o) => <span className="font-mono font-medium">{o.id}</span> },
  { header: "Retailer", accessor: (o) => o.retailer },
  { header: "Route", accessor: (o) => <span className="font-mono text-text-secondary">{o.routeId}</span> },
  { header: "Amount", accessor: (o) => <span className="font-mono">{formatINR(o.amount)}</span> },
  { header: "Status", accessor: (o) => <StatusBadge status={o.status} /> },
];

export default function DashboardPage() {
  const pending = ORDERS.filter((o) => o.status !== "delivered").length;
  const revenue = ORDERS.reduce((s, o) => s + o.amount, 0);
  const lowStock = INVENTORY.filter((i) => i.qty < 100).length;

  return (
    <div>
      <PageHeader eyebrow="Today · Hub Overview" title="Dashboard" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard icon={ClipboardList} label="Orders Today" value={ORDERS.length} sub={`${pending} awaiting dispatch`} accent="accent" />
        <StatCard icon={TrendingUp} label="Revenue Today" value={formatINR(revenue)} sub="across 4 routes" accent="teal" />
        <StatCard icon={AlertTriangle} label="Low Stock SKUs" value={lowStock} sub="below 100 units" accent="danger" />
        <StatCard icon={Truck} label="Active Routes" value={ROUTES.length} sub="all on schedule" accent="accent" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-4">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-3">
            Order Volume by Route
          </div>
          <RouteVolumeChart />
        </Card>

        <Card className="p-4">
          <div className="text-[11px] uppercase tracking-widest text-text-muted font-mono mb-3">Route Watch</div>
          <div className="flex flex-col gap-3">
            {ROUTES.map((r) => (
              <div key={r.id} className="flex items-center justify-between pb-3 border-b border-line last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-semibold text-text">{r.name}</div>
                  <div className="text-xs text-text-muted">{r.supervisor}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono font-semibold ${r.pending > 5 ? "text-danger" : "text-teal"}`}>
                    {r.pending}
                  </div>
                  <div className="text-[10px] text-text-muted">pending</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="px-4 pt-4 text-[11px] uppercase tracking-widest text-text-muted font-mono">Recent Orders</div>
        <DataTable columns={recentColumns} rows={ORDERS.slice(0, 5)} keyExtractor={(o) => o.id} />
      </Card>
    </div>
  );
}
