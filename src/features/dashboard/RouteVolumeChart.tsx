import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { ROUTES } from "@/data/mockData";

const data = ROUTES.map((r) => ({ name: r.id, orders: r.retailers + r.pending * 2 }));

// Colors here are CSS variable references, not literals — recharts renders these
// as SVG attribute values, and modern browsers resolve var() there just like in
// a stylesheet. So this chart tracks theme/accent changes with zero JS-side
// color duplication; there's exactly one place --accent etc. are defined
// (globals.css + ThemeContext), not a copy per chart file.
const tooltipStyle = {
  background: "var(--bg)",
  border: "1px solid var(--line)",
  borderRadius: 6,
  color: "var(--text)",
  fontFamily: "'Roboto Mono', monospace",
  fontSize: 12,
};

export default function RouteVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="var(--line)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "var(--text-secondary)", fontSize: 12, fontFamily: "'Roboto Mono', monospace" }} axisLine={{ stroke: "var(--line)" }} tickLine={false} />
        <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12, fontFamily: "'Roboto Mono', monospace" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={{ color: "var(--text)" }}
          labelStyle={{ color: "var(--text)" }}
          cursor={{ fill: "var(--surface-2)" }}
        />
        <Bar dataKey="orders" fill="var(--accent)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
