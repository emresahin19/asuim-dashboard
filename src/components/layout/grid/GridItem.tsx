import styles from "./grid.module.scss";
import { GridItemProps } from "./grid.types";
import { clsx } from "@/utils";

export function GridItem({
  span = 4,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  children,
  ...rest
}: GridItemProps) {
  return (
    <div
      className={clsx(
        styles.item,
        styles[`span-${span}`],
        xs && styles[`xs-${xs}`],
        sm && styles[`sm-${sm}`],
        md && styles[`md-${md}`],
        lg && styles[`lg-${lg}`],
        xl && styles[`xl-${xl}`],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}