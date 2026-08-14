import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { GRADE_MIX } from "@/data/mockData";

// var() references — see RouteVolumeChart.tsx. Grade colors intentionally reuse
// the same semantic tokens as GradeBadge (Export=accent, A=teal, B=steel) so a
// grade means the same color everywhere in the app.
const COLORS: Record<string, string> = {
  Export: "var(--accent)",
  "Grade A": "var(--teal)",
  "Grade B": "var(--steel)",
};

const tooltipStyle = {
  background: "var(--bg)",
  border: "1px solid var(--line)",
  borderRadius: 6,
  color: "var(--text)",
  fontFamily: "'Roboto Mono', monospace",
  fontSize: 12,
};

export default function GradeMixChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={GRADE_MIX} dataKey="value" nameKey="name" innerRadius={40} outerRadius={68} paddingAngle={3}>
            {GRADE_MIX.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            itemStyle={{ color: "var(--text)" }}
            labelStyle={{ color: "var(--text)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1.5 mt-2">
        {GRADE_MIX.map((g) => (
          <div key={g.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: COLORS[g.name] }} />
              {g.name}
            </span>
            <span className="font-mono text-text">{g.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
