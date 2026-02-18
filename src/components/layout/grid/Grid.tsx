import styles from "./grid.module.scss";
import { GridProps } from "./grid.types";
import { clsx } from "@/utils";

export function Grid({
  children,
  withGap = true,
  withPadding = false,
  className,
  ...rest
}: GridProps) {
  return (
    <div
      className={clsx(
        styles.grid,
        withGap && styles.withGap,
        withPadding && styles.withPadding,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}