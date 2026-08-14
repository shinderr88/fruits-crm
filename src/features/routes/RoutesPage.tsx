import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import RouteStopTimeline from "./RouteStopTimeline";
import { classNames } from "@/lib/utils";
import { ROUTES as INITIAL_ROUTES } from "@/data/mockData";
import { RouteInfo } from "@/types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function nextRouteId(routes: RouteInfo[]): string {
  const maxN = routes.reduce((max, r) => {
    const n = parseInt(r.id.replace("R-", ""), 10);
    return Number.isNaN(n) ? max : Math.max(max, n);
  }, 0);
  return `R-${String(maxN + 1).padStart(2, "0")}`;
}

export default function RoutesPage() {
  // TODO: replace INITIAL_ROUTES / this local state with a GET /routes call and
  // a POST /routes call on create once the FastAPI backend exists — the shape
  // of RouteInfo here already matches what those endpoints should exchange.
  const [routes, setRoutes] = useState<RouteInfo[]>(INITIAL_ROUTES);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [stopDrafts, setStopDrafts] = useState<string[]>([]);
  const [stopInput, setStopInput] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setSupervisor("");
    setDays([]);
    setStopDrafts([]);
    setStopInput("");
    setError("");
  };

  const toggleDay = (day: string) => {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const addStop = () => {
    const trimmed = stopInput.trim();
    if (!trimmed) return;
    setStopDrafts((prev) => [...prev, trimmed]);
    setStopInput("");
  };

  const removeStop = (index: number) => {
    setStopDrafts((prev) => prev.filter((_, i) => i !== index));
  };

  const moveStop = (index: number, direction: -1 | 1) => {
    setStopDrafts((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleCreate = () => {
    if (!name.trim() || !supervisor.trim() || days.length === 0) {
      setError("Route name, supervisor, and at least one delivery day are required.");
      return;
    }
    if (stopDrafts.length < 2) {
      setError("Add at least two stops (a starting point and a destination).");
      return;
    }
    const id = nextRouteId(routes);
    const newRoute: RouteInfo = {
      id,
      name: name.trim(),
      supervisor: supervisor.trim(),
      retailers: 0,
      day: WEEKDAYS.filter((d) => days.includes(d)).join(" / "),
      pending: 0,
      stops: stopDrafts.map((stopName, i) => ({
        id: `${id}-S${String(i + 1).padStart(2, "0")}`,
        name: stopName,
        sequence: i + 1,
        completed: false,
      })),
    };
    setRoutes((prev) => [...prev, newRoute]);
    setModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => setRoutes((prev) => prev.filter((r) => r.id !== id));

  return (
    <div>
      <PageHeader
        eyebrow="Delivery Cycles"
        title="Routes"
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-accent text-bg hover:opacity-90 transition-opacity"
          >
            <Plus size={14} /> New Route
          </button>
        }
      />

      {routes.length === 0 ? (
        <div className="text-center py-16 text-sm text-text-muted">
          No routes yet — add one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {routes.map((r) => (
            <Card key={r.id} className="p-4 group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[11px] text-text-muted font-mono">{r.id}</div>
                  <div className="text-base font-display font-bold text-text">{r.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-teal/15 text-teal font-mono font-semibold text-xs">
                    {r.retailers}
                  </div>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-danger transition"
                    aria-label={`Delete ${r.name}`}
                    title="Delete route"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <Row label="Supervisor" value={r.supervisor} />
              <Row label="Delivery days" value={r.day} mono />
              <Row
                label="Pending orders"
                value={String(r.pending)}
                mono
                valueClassName={r.pending > 5 ? "text-danger" : "text-teal"}
              />
              <RouteStopTimeline stops={r.stops} />
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); resetForm(); }} title="New route">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Route name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Baramati Rural"
              className="w-full px-3 py-2 rounded-md bg-bg border border-line text-sm text-text outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Supervisor</label>
            <input
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              placeholder="e.g. Shekhar Dongare"
              className="w-full px-3 py-2 rounded-md bg-bg border border-line text-sm text-text outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Delivery days</label>
            <div className="flex gap-1.5 flex-wrap">
              {WEEKDAYS.map((day) => {
                const active = days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={classNames(
                      "px-2.5 py-1.5 rounded text-xs font-medium border transition-colors",
                      active
                        ? "bg-accent text-bg border-accent"
                        : "bg-bg text-text-secondary border-line hover:border-text-muted"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Stops, in delivery order
            </label>
            <p className="text-[11px] text-text-muted mb-2">
              Start with the warehouse, end with the last delivery point.
            </p>

            <div className="flex gap-2 mb-2">
              <input
                value={stopInput}
                onChange={(e) => setStopInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addStop();
                  }
                }}
                placeholder="e.g. Warehouse"
                className="flex-1 px-3 py-2 rounded-md bg-bg border border-line text-sm text-text outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={addStop}
                className="px-3 py-2 rounded-md text-xs font-semibold bg-surface-2 text-text border border-line hover:border-text-muted transition-colors"
              >
                Add
              </button>
            </div>

            {stopDrafts.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-2">
                {stopDrafts.map((stopName, i) => (
                  <div
                    key={`${stopName}-${i}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg border border-line"
                  >
                    <span className="text-[10px] font-mono text-text-muted w-4">{i + 1}</span>
                    <span className="flex-1 text-sm text-text truncate">{stopName}</span>
                    <button
                      type="button"
                      onClick={() => moveStop(i, -1)}
                      disabled={i === 0}
                      className="text-text-muted hover:text-text disabled:opacity-30 disabled:hover:text-text-muted transition-colors"
                      aria-label={`Move ${stopName} up`}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStop(i, 1)}
                      disabled={i === stopDrafts.length - 1}
                      className="text-text-muted hover:text-text disabled:opacity-30 disabled:hover:text-text-muted transition-colors"
                      aria-label={`Move ${stopName} down`}
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeStop(i)}
                      className="text-text-muted hover:text-danger transition-colors"
                      aria-label={`Remove ${stopName}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-xs text-danger">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => { setModalOpen(false); resetForm(); }}
              className="px-4 py-2 rounded-md text-sm font-medium text-text-secondary border border-line hover:border-text-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-md text-sm font-semibold bg-accent text-bg hover:opacity-90 transition-opacity"
            >
              Create route
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  valueClassName,
}: {
  label: string;
  value: string;
  mono?: boolean;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm py-1">
      <span className="text-text-muted">{label}</span>
      <span className={`text-text font-medium ${mono ? "font-mono" : ""} ${valueClassName ?? ""}`}>{value}</span>
    </div>
  );
}
