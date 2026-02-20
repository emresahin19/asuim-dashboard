import { Card, Grid, GridItem } from "@/components";
import styles from "./layout.module.scss";

const ItemCard = ({ label }: { label: string }) => (
  <Card className={styles.itemCard}>{label}</Card>
);

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className={styles.section}>
    <Card className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </Card>
  </section>
);

export default function GridPage() {
  const baseSpans = [1, 1, 1, 1];
  const responsiveItems = ["sm:4 md:2 lg:1", "sm:4 md:2 lg:1", "sm:4 md:2 lg:1", "sm:4 md:2 lg:1"];

  return (
    <>
      <Section
        title="1. 4x4 Base Layout"
        description="Her satır 4 kolondan oluşur; GridItem varsayılanı span=4’tür."
      >
        <Grid withGap>
          {baseSpans.map((span, index) => (
            <GridItem key={`base-${index}`} span={span}>
              <ItemCard label={`Span ${span}`} />
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section
        title="2. Responsive Davranış"
        description="Aynı item küçük ekranda tek satır, orta ekranda 2 kolon, büyükte 1 kolon kaplar."
      >
        <Grid withGap>
          {responsiveItems.map((label, index) => (
            <GridItem key={`resp-${index}`} sm={4} md={2} lg={1}>
              <ItemCard label={label} />
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section
        title="3. Sık Kullanılan Pattern’ler"
        description="Dashboard düzenlerinde en sık kullanılan dağılımlar: 1+3, 2+2 ve 3+1."
      >
        <div className={styles.stack}>
          <Grid withGap>
            <GridItem md={1}>
              <ItemCard label="1" />
            </GridItem>
            <GridItem md={3}>
              <ItemCard label="3" />
            </GridItem>
          </Grid>

          <Grid withGap>
            <GridItem md={2}>
              <ItemCard label="2" />
            </GridItem>
            <GridItem md={2}>
              <ItemCard label="2" />
            </GridItem>
          </Grid>

          <Grid withGap>
            <GridItem md={3}>
              <ItemCard label="3" />
            </GridItem>
            <GridItem md={1}>
              <ItemCard label="1" />
            </GridItem>
          </Grid>
        </div>
      </Section>

      <Section
        title="4. Nested Grid"
        description="GridItem içerisinde yeni bir Grid açılarak hiyerarşik bloklar oluşturulur."
      >
        <Grid withGap withPadding>
          <GridItem md={2}>
            <ItemCard label="Parent 2" />
          </GridItem>

          <GridItem md={2}>
            <Grid withGap>
              <GridItem span={2}>
                <ItemCard label="Nested 2" />
              </GridItem>
              <GridItem span={2}>
                <ItemCard label="Nested 2" />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Section>

      <Section
        title="5. Stress Test"
        description="Çoklu item akışında kolon düzeni ve gap ölçeklenmesini görselleştirir."
      >
        <Grid withGap>
          {Array.from({ length: 12 }).map((_, index) => (
            <GridItem key={`item-${index + 1}`} sm={2} md={1}>
              <ItemCard label={`Item ${index + 1}`} />
            </GridItem>
          ))}
        </Grid>
      </Section>
    </>
  );
}