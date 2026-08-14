import { Check } from "lucide-react";
import { RouteStop } from "@/types";
import { classNames } from "@/lib/utils";

interface RouteStopTimelineProps {
  stops: RouteStop[];
}

// Renders every stop from origin to destination. Completed stops (and the
// line leading out of them) use the accent color; anything not yet reached
// stays muted. The first incomplete stop gets a pulsing ring — this is the
// one place in the app designed to be driven by live data: swap `stops` for
// whatever a WebSocket/poll updates as the supervisor's app marks stops off,
// and this re-renders correctly with no other changes.
export default function RouteStopTimeline({ stops }: RouteStopTimelineProps) {
  const completedCount = stops.filter((s) => s.completed).length;
  const firstIncompleteIndex = stops.findIndex((s) => !s.completed);

  if (stops.length === 0) {
    return <p className="text-xs text-text-muted mt-3 pt-3 border-t border-line">No stops added yet.</p>;
  }

  return (
    <div className="mt-3 pt-3 border-t border-line">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono">Stops</span>
        <span className="text-[10px] font-mono text-text-secondary">
          {completedCount} / {stops.length} complete
        </span>
      </div>

      {stops.map((stop, idx) => {
        const isLast = idx === stops.length - 1;
        const isCurrent = idx === firstIncompleteIndex;

        return (
          <div key={stop.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="relative flex items-center justify-center">
                {isCurrent && (
                  <span className="absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75 animate-ping" />
                )}
                <span
                  className={classNames(
                    "relative flex items-center justify-center rounded-full flex-shrink-0",
                    stop.completed
                      ? "w-3.5 h-3.5 bg-accent"
                      : isCurrent
                        ? "w-3 h-3 border-2 border-accent bg-surface"
                        : "w-2.5 h-2.5 border border-line bg-surface-2"
                  )}
                >
                  {stop.completed && <Check size={9} className="text-bg" strokeWidth={3} />}
                </span>
              </span>
              {!isLast && (
                <div className={classNames("w-px flex-1 min-h-[16px]", stop.completed ? "bg-accent" : "bg-line")} />
              )}
            </div>

            <div className={classNames("flex-1 flex items-center justify-between", isLast ? "pb-0" : "pb-3")}>
              <span
                className={classNames(
                  "text-xs",
                  stop.completed ? "text-text font-medium" : isCurrent ? "text-text font-medium" : "text-text-muted"
                )}
              >
                {stop.name}
              </span>
              {stop.completed && stop.completedAt && (
                <span className="text-[10px] font-mono text-text-muted">{stop.completedAt}</span>
              )}
              {isCurrent && !stop.completed && (
                <span className="text-[10px] font-mono text-accent">En route</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
