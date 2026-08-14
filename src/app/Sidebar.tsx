import { NavLink } from "react-router-dom";
import { LayoutGrid, ClipboardList, Boxes, Tag, Truck, Store, BarChart3, Settings } from "lucide-react";
import { classNames } from "@/lib/utils";
import { useBrand } from "@/context/BrandContext";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/pricing", label: "Pricing", icon: Tag },
  { to: "/routes", label: "Routes", icon: Truck },
  { to: "/retailers", label: "Retailers", icon: Store },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar() {
  const { appName, tagline } = useBrand();

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-surface border-r border-line">
      <div className="px-5 py-5 border-b border-line">
        <div className="text-[10px] uppercase tracking-[0.25em] text-accent font-mono">{tagline}</div>
        <div className="text-lg font-display font-bold text-text mt-0.5 truncate">{appName}</div>
      </div>

      <nav className="flex-1 py-4">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              classNames(
                "flex items-center gap-3 px-5 py-2.5 text-sm border-l-2 transition-colors",
                isActive
                  ? "text-text bg-surface-2 border-accent font-semibold"
                  : "text-text-muted border-transparent hover:text-text-secondary"
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          classNames(
            "flex items-center gap-3 px-5 py-3 text-sm border-t border-line transition-colors",
            isActive ? "text-text bg-surface-2" : "text-text-muted hover:text-text-secondary"
          )
        }
      >
        <Settings size={16} />
        Settings
      </NavLink>
    </aside>
  );
}
