import { HTMLAttributes } from "react";
import { classNames } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: "accent" | "teal" | "danger" | "none";
}

const accentMap: Record<string, string> = {
  accent: "before:bg-accent",
  teal: "before:bg-teal",
  danger: "before:bg-danger",
  none: "",
};

export default function Card({ accent = "none", className, children, ...rest }: CardProps) {
  return (
    <div
      className={classNames(
        "relative rounded-lg bg-surface border border-line overflow-hidden",
        accent !== "none" &&
          "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px]",
        accent !== "none" && accentMap[accent],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
