import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { REVENUE_TREND } from "@/data/mockData";

// See RouteVolumeChart.tsx for why these are var() references, not hex literals.
const tooltipStyle = {
  background: "var(--bg)",
  border: "1px solid var(--line)",
  borderRadius: 6,
  color: "var(--text)",
  fontFamily: "'Roboto Mono', monospace",
  fontSize: 12,
};

export default function RevenueTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={REVENUE_TREND} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
        <CartesianGrid stroke="var(--line)" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: "var(--text-secondary)", fontSize: 12, fontFamily: "'Roboto Mono', monospace" }} axisLine={{ stroke: "var(--line)" }} tickLine={false} />
        <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 12, fontFamily: "'Roboto Mono', monospace" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          itemStyle={{ color: "var(--text)" }}
          labelStyle={{ color: "var(--text)" }}
        />
        <Line type="monotone" dataKey="revenue" stroke="var(--teal)" strokeWidth={2.5} dot={{ fill: "var(--teal)", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
