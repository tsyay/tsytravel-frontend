import type { ReactNode } from "react";
import styles from "./grid.module.css";

type GridProps = {
  children: ReactNode;
};

export function Grid({ children }: GridProps) {
  return <div className={styles.grid}>{children}</div>;
}
