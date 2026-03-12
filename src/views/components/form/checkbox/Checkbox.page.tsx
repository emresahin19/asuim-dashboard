"use client";

import { useState } from "react";
import { Card, Checkbox, Grid, GridItem } from "@/components";
import styles from "./checkbox.module.scss";

export default function CheckboxPage() {
  const [preferences, setPreferences] = useState({
    newsletter: true,
    announcements: false,
    experimental: false,
    terms: true,
  });

  return (
    <div className={styles.page}>
      <Card className={styles.heroCard} variant="gradient">
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Checkbox Gallery</h1>
        <p className={styles.subtitle}>
          Checkbox bileşeninin size, color, variant, state ve layout varyasyonlarını bu sayfada inceleyebilirsin.
        </p>
      </Card>

      <Grid withGap className={styles.sectionGrid}>
        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Sizes</h2>
              <p>sm, md, lg ölçü varyasyonları</p>
            </div>

            <div className={styles.formGrid}>
              <Checkbox size="sm" label="Small (sm)" defaultChecked />
              <Checkbox size="md" label="Medium (md)" defaultChecked />
              <Checkbox size="lg" label="Large (lg)" defaultChecked />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Colors</h2>
              <p>primary, success, info, warning, danger, neutral</p>
            </div>

            <div className={styles.formGridTwo}>
              <Checkbox color="primary" label="Primary" defaultChecked />
              <Checkbox color="success" label="Success" defaultChecked />
              <Checkbox color="info" label="Info" defaultChecked />
              <Checkbox color="warning" label="Warning" defaultChecked />
              <Checkbox color="danger" label="Danger" defaultChecked />
              <Checkbox color="neutral" label="Neutral" defaultChecked />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Variants</h2>
              <p>default, card, ghost</p>
            </div>

            <div className={styles.formGrid}>
              <Checkbox
                variant="default"
                label="Default Variant"
                description="Temel kullanım için standart checkbox görünümü."
                defaultChecked
              />

              <Checkbox
                variant="card"
                label="Card Variant"
                description="Kart görünümüyle daha belirgin seçim alanı."
                defaultChecked
              />

              <Checkbox
                variant="ghost"
                label="Ghost Variant"
                description="Minimal ve hafif görünüm isteyen ekranlar için."
                defaultChecked
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>States</h2>
              <p>checked, unchecked, disabled, error</p>
            </div>

            <div className={styles.formGridTwo}>
              <Checkbox label="Unchecked State" />
              <Checkbox label="Checked State" defaultChecked />
              <Checkbox label="Disabled State" disabled />
              <Checkbox
                label="Error State"
                description="Bu alanı onaylamanız gerekiyor."
                error="Validation error"
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Layout</h2>
              <p>align ve reverse kombinasyonları</p>
            </div>

            <div className={styles.formGrid}>
              <Checkbox
                align="start"
                label="Align Start"
                description="Çok satırlı açıklama ile birlikte üstten hizalanmış görünüm."
                defaultChecked
              />

              <Checkbox
                align="center"
                label="Align Center"
                description="Tek satır içeriklerde ortalanmış hizalama."
                defaultChecked
              />

              <Checkbox
                reverse
                label="Reverse Layout"
                description="Label solda, checkbox sağda yer alır."
                defaultChecked
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Controlled Examples</h2>
              <p>state yönetimi ve custom icon kullanımı</p>
            </div>

            <div className={styles.formGrid}>
              <Checkbox
                checked={preferences.newsletter}
                onChange={(event) =>
                  setPreferences((prev) => ({ ...prev, newsletter: event.target.checked }))
                }
                label="Newsletter"
                description="Haftalık ürün güncellemelerini e-posta ile al."
              />

              <Checkbox
                checked={preferences.announcements}
                onChange={(event) =>
                  setPreferences((prev) => ({ ...prev, announcements: event.target.checked }))
                }
                label="Announcements"
                description="Sistem bakım ve duyurularını takip et."
              />

              <Checkbox
                checked={preferences.experimental}
                onChange={(event) =>
                  setPreferences((prev) => ({ ...prev, experimental: event.target.checked }))
                }
                label="Experimental Features"
                description="Beta özellikleri etkinleştir."
                icon={<span className={styles.customIcon}>✓</span>}
              />

              <Checkbox
                variant="card"
                checked={preferences.terms}
                onChange={(event) =>
                  setPreferences((prev) => ({ ...prev, terms: event.target.checked }))
                }
                label="Terms & Privacy"
                description="Kullanım koşulları ve gizlilik politikasını kabul ediyorum."
              />
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}