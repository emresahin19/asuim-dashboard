"use client";

import { Card, Grid, GridItem } from "@/components";
import { ModalPosition, ModalSize, ModalVariant, useModal } from "@/context/modal";
import styles from "./modal.module.scss";

const variants: ModalVariant[] = ["default", "elevated", "glass"];
const sizes: ModalSize[] = ["sm", "md", "lg", "xl", "full"];
const positions: ModalPosition[] = ["center", "top", "bottom", "left", "right"];

export default function ModalPage() {
  const modal = useModal();

  const openBasic = () => {
    modal.open({
      title: "Temel Modal",
      description: "Standart ayarlarla acilan modal ornegi.",
      content: (
        <div className={styles.contentStack}>
          <p>Bu modal, varsayilan backdrop ve kapanis davranislariyla acildi.</p>
          <button type="button" className={styles.inlineButton} onClick={() => modal.closeTop()}>
            Kapat
          </button>
        </div>
      ),
    });
  };

  const openVariant = (variant: ModalVariant) => {
    modal.open({
      title: `${variant.toUpperCase()} Variant`,
      description: "Farkli gorunus stillerini test etmek icin.",
      variant,
      content: (
        <div className={styles.contentStack}>
          <p>Bu modal `{variant}` variant ile render edildi.</p>
          <button type="button" className={styles.inlineButton} onClick={() => modal.closeTop()}>
            Kapat
          </button>
        </div>
      ),
    });
  };

  const openSize = (size: ModalSize) => {
    modal.open({
      title: `${size.toUpperCase()} Size`,
      size,
      description: "Modal boyut secenekleri.",
      content: (
        <div className={styles.contentStack}>
          <p>Bu modal `{size}` boyutunda acildi.</p>
          <p>Ozellikle `full` secenegi tam ekran akislarda kullanisli olur.</p>
        </div>
      ),
    });
  };

  const openPosition = (position: ModalPosition) => {
    modal.open({
      title: `${position.toUpperCase()} Position`,
      position,
      description: "Ekran konum secenekleri.",
      content: <p>Modal konumu: `{position}`.</p>,
    });
  };

  const openBehavior = () => {
    modal.open({
      title: "Davranis Modu",
      description: "Backdrop klik ile kapanmaz, ESC kapatmaz.",
      withBackdrop: true,
      closeOnBackdropClick: false,
      closeOnEscape: false,
      dismissible: false,
      lockScroll: true,
      variant: "elevated",
      content: (
        <div className={styles.contentStack}>
          <p>Bu modal test amaclidir. Kapatmak icin alttaki butonu kullan.</p>
          <button type="button" className={styles.inlineButton} onClick={() => modal.clear()}>
            Tum Modallari Kapat
          </button>
        </div>
      ),
    });
  };

  const openWithoutBackdrop = () => {
    modal.open({
      title: "Backdrop Yok",
      description: "Arka plan karartmasiz modal ornegi.",
      withBackdrop: false,
      position: "right",
      size: "lg",
      content: <p>Bu modal backdrop olmadan acildi.</p>,
    });
  };

  const openStacked = () => {
    modal.open({
      title: "Birinci Modal",
      description: "Stack testinin ilk adimi.",
      content: (
        <div className={styles.contentStack}>
          <p>Ikinci modal acmak icin butona tikla.</p> 
          <div style={{ display: 'flex' }}>
            <button type="button" className={styles.inlineButton} onClick={() => modal.closeTop()}>
            Modal Kapat
          </button>
          <button
            type="button"
            className={styles.inlineButton}
            onClick={() =>
              modal.open({
                title: "Ikinci Modal",
                description: "Ayni anda birden fazla modal acilabilir.",
                variant: "glass",
                position: "center",
                content: (
                  <div className={styles.contentStack}>
                    <p>Bu modal stackte en ustte gorunur.</p>
                    <button type="button" className={styles.inlineButton} onClick={() => modal.closeTop()}>
                      Usttekini Kapat
                    </button>
                  </div>
                ),
              })
            }
          >
            Ikinci Modali Ac
          </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className={styles.page}>
      <Card className={styles.heroCard}>
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Modal Gallery</h1>
        <p className={styles.subtitle}>
          Modal modulunun tum standartlarini tek sayfada deneyebilirsin: variant, size,
          position, backdrop ve kapanis davranislari.
        </p>
      </Card>

      <Grid withGap className={styles.sectionGrid}>
        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Quick Actions</h2>
              <p>Temel acma/kapama ve stack senaryolari</p>
            </div>

            <div className={styles.buttonGrid}>
              <button type="button" className={styles.actionButton} onClick={openBasic}>
                Temel Modal Ac
              </button>
              <button type="button" className={styles.actionButton} onClick={openStacked}>
                Stacked Modal Ac
              </button>
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Variants</h2>
              <p>default, elevated, glass</p>
            </div>

            <div className={styles.comboGrid}>
              {variants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  className={styles.actionButton}
                  onClick={() => openVariant(variant)}
                >
                  {variant}
                </button>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Sizes</h2>
              <p>sm, md, lg, xl, full</p>
            </div>

            <div className={styles.buttonGrid}>
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={styles.actionButton}
                  onClick={() => openSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Positions</h2>
              <p>center, top, bottom, left, right</p>
            </div>

            <div className={styles.comboGrid}>
              {positions.map((position) => (
                <button
                  key={position}
                  type="button"
                  className={styles.actionButton}
                  onClick={() => openPosition(position)}
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
              <h2>Backdrop & Behavior</h2>
              <p>Backdrop acik/kapali ve kapanis davranislari</p>
            </div>

            <div className={styles.buttonGrid}>
              <button type="button" className={styles.actionButton} onClick={openBehavior}>
                Kilitli Davranis (ESC/Klik Kapali)
              </button>
              <button type="button" className={styles.actionButton} onClick={openWithoutBackdrop}>
                Backdrop Olmadan Ac
              </button>
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}
