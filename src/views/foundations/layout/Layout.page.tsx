import { Grid, GridItem } from "@/components";
import styles from "./layout.module.scss";

const Card = ({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "accent";
}) => (
  <div
    style={{
      background:
        variant === "accent"
          ? "var(--color-primary-100)"
          : "var(--color-bg-card)",
      padding: 16,
      borderRadius: 8,
      textAlign: "center",
      fontWeight: 600,
      border: "1px solid var(--color-border)",
    }}
  >
    {label}
  </div>
);

export default function GridPage() {
  return (
    <div style={{ padding: 32 }}>
      <h1>AsUIm Grid System</h1>

      {/* ------------------------------------------------ */}
      <h2>1. 4x4 Base Layout</h2>
      <Grid withGap>
        {[1, 2, 3, 4].map((n) => (
          <GridItem key={n} span={1}>
            <Card label={`Span 1`} />
          </GridItem>
        ))}
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>2. Responsive Demonstration</h2>
      <p>sm=4 → md=2 → lg=1</p>

      <Grid withGap>
        {[1, 2, 3, 4].map((n) => (
          <GridItem key={n} sm={4} md={2} lg={1}>
            <Card label={`Responsive`} variant="accent" />
          </GridItem>
        ))}
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>3. 1 + 3 Pattern</h2>
      <Grid withGap>
        <GridItem md={1}>
          <Card label="1" />
        </GridItem>
        <GridItem md={3}>
          <Card label="3" />
        </GridItem>
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>4. 2 + 2 Pattern</h2>
      <Grid withGap>
        <GridItem md={2}>
          <Card label="2" />
        </GridItem>
        <GridItem md={2}>
          <Card label="2" />
        </GridItem>
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>5. Nested Grid – Level 1</h2>

      <Grid withGap withPadding>
        <GridItem md={2}>
          <Card label="Parent 2" />
        </GridItem>

        <GridItem md={2}>
          <Grid withGap>
            <GridItem span={2}>
              <Card label="Nested 2" />
            </GridItem>
            <GridItem span={2}>
              <Card label="Nested 2" />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>6. Deep Nested (Level 2)</h2>

      <Grid withGap withPadding>
        <GridItem md={4}>
          <Grid withGap>
            <GridItem md={2}>
              <Card label="Level 1 - 2" />
            </GridItem>

            <GridItem md={2}>
              <Grid withGap>
                <GridItem span={2}>
                  <Card label="Level 2 - 2" variant="accent" />
                </GridItem>
                <GridItem span={2}>
                  <Card label="Level 2 - 2" variant="accent" />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>7. Stress Test (Dynamic Items)</h2>

      <Grid withGap>
        {Array.from({ length: 12 }).map((_, i) => (
          <GridItem key={i} sm={2} md={1}>
            <Card label={`Item ${i + 1}`} />
          </GridItem>
        ))}
      </Grid>

      {/* ------------------------------------------------ */}
      <h2>8. Full Width + Sidebar Interaction Test</h2>

      <Grid withGap withPadding>
        <GridItem md={3}>
          <Card label="3" />
        </GridItem>
        <GridItem md={1}>
          <Card label="1" />
        </GridItem>
      </Grid>
    </div>
  );
}