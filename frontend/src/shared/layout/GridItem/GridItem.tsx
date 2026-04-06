import type { CSSProperties, ReactNode } from "react";

type GridItemProps = {
  children: ReactNode;
  start?: number;
  span?: number;
};

export function GridItem({
  children,
  start = 12,
  span,
}: GridItemProps) {
  const style: CSSProperties = {
    gridColumn: start ? `${start} / span ${span}` : `span ${span}`,
  };
  return <div style={style}>{children}</div>;
}
