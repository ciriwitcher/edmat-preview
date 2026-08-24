import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  as: Component = "div",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return <Component className={`container-edmat ${className}`}>{children}</Component>;
}
