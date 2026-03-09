"use client";

import { Card, Grid, GridItem } from "@/components";
import { ToastPosition, ToastTone, ToastVariant, useToaster } from "@/context";
import styles from "./toaster.module.scss";

const variants: ToastVariant[] = ["soft", "outline", "solid"];
const tones: ToastTone[] = ["default", "info", "success", "warning", "danger"];

const toneStyleMap: Record<ToastTone, string> = {
  default: "toneDefault",
  info: "toneInfo",
  success: "toneSuccess",
  warning: "toneWarning",
  danger: "toneDanger",
};
const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const sampleTextByTone: Record<ToastTone, string> = {
  default: "Varsayilan bilgilendirme mesaji gosterildi.",
  info: "Bilgi toast'i ile sonraki adim aciklandi.",
  success: "Islem basariyla tamamlandi.",
  warning: "Dikkat: bazi alanlari kontrol etmelisin.",
  danger: "Hata olustu. Lutfen tekrar dene.",
};

export default function ToasterPage() {
  const toaster = useToaster();

  return (
    <div className={styles.page}>
      <Card className={styles.heroCard}>
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Toaster Gallery</h1>
        <p className={styles.subtitle}>
          Toaster modulunun tum standartlarini bu sayfada gorebilirsin: string/array mesaj,
          variant, tone, duration ve ekrandaki konum secenekleri.
        </p>
      </Card>

      <Grid withGap className={styles.sectionGrid}>
        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Quick Actions</h2>
              <p>Pratik helper fonksiyonlari ve string/array mesaj ornekleri</p>
            </div>

            <div className={styles.buttonGrid}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => toaster.show("Basit string mesaj toast'i")}
              >
                String Mesaj
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() =>
                  toaster.show([
                    "Birinci satir dogrulandi.",
                    "Ikinci satir da basariyla eklendi.",
                  ], {
                    title: "Array Mesaj",
                    tone: "info",
                  })
                }
              >
                Array Mesaj
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() => toaster.success("Kayit basariyla tamamlandi")}
              >
                success()
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() => toaster.warning("Eksik alanlar bulundu", { variant: "outline" })}
              >
                warning()
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() =>
                  toaster.danger("Kritik hata toast'i", {
                    title: "Hata",
                    duration: 0,
                    dismissible: true,
                    variant: "solid",
                  })
                }
              >
                Kalici (duration:0)
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() => toaster.clear()}
              >
                Tumunu Temizle
              </button>
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Variants x Tones</h2>
              <p>Her variant altinda tone seceneklerini border rengiyle test et</p>
            </div>

            <div className={styles.variantToneGroups}>
              {variants.map((variant) => (
                <section key={variant} className={styles.variantGroup}>
                  <h3>{variant}</h3>

                  <div className={styles.toneGrid}>
                    {tones.map((tone) => (
                      <button
                        key={`${variant}-${tone}`}
                        type="button"
                        className={`${styles.toneButton} ${styles[toneStyleMap[tone]]}`}
                        onClick={() =>
                          toaster.show(sampleTextByTone[tone], {
                            title: `${variant.toUpperCase()} / ${tone.toUpperCase()}`,
                            tone,
                            variant,
                          })
                        }
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Positions</h2>
              <p>Top ve bottom dahil tum konum secenekleri</p>
            </div>

            <div className={styles.positionGrid}>
              {positions.map((position) => (
                <button
                  key={position}
                  type="button"
                  className={styles.actionButton}
                  onClick={() =>
                    toaster.info(`Konum: ${position}`, {
                      title: "Position Demo",
                      position,
                    })
                  }
                >
                  {position}
                </button>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Dynamic Duration</h2>
              <p>Mesaj uzunluguna gore otomatik bekleme suresi</p>
            </div>

            <div className={styles.buttonGrid}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => toaster.show("Kisa mesaj")}
              >
                Kisa Mesaj
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() =>
                  toaster.show(
                    "Bu biraz daha uzun bir mesaj. Kullaniciya daha fazla baglam verirken toaster ekranda daha uzun kalir.",
                  )
                }
              >
                Uzun Mesaj
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() =>
                  toaster.show("Sabit sure: 10 saniye", {
                    duration: 10000,
                    tone: "default",
                  })
                }
              >
                duration: 10000
              </button>
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}
