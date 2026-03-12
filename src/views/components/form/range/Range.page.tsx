"use client";

import { useState } from "react";
import asimTheCat from "@/assets/image/asimthecat-120x120.png";
import { Card, Grid, GridItem, Range } from "@/components";
import styles from "./range.module.scss";

export default function RangePage() {
  const [sizeValues, setSizeValues] = useState({ sm: 24, md: 48, lg: 72 });
  const [colorValues, setColorValues] = useState({
    primary: 36,
    success: 52,
    info: 68,
    warning: 42,
    danger: 58,
    neutral: 74,
  });
  const [stepValues, setStepValues] = useState({
    integer: 40,
    decimal: 1.5,
    customMinMax: 450,
  });
  const [stateValues, setStateValues] = useState({
    basic: 28,
    withError: 82,
    disabled: 35,
  });
  const [formattedValues, setFormattedValues] = useState({
    percent: 65,
    volume: 30,
    zoom: 110,
  });
  const [imageThumbValue, setImageThumbValue] = useState(55);

  return (
    <div className={styles.page}>
      <Card className={styles.heroCard} variant="gradient">
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Range Gallery</h1>
        <p className={styles.subtitle}>
          Range bileşeninin size, color, value, state, format ve thumb varyasyonlarını bu sayfada inceleyebilirsin.
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
              <Range
                size="sm"
                label="Small (sm)"
                min={0}
                max={100}
                value={sizeValues.sm}
                showValue
                onChange={(event) =>
                  setSizeValues((prev) => ({ ...prev, sm: Number(event.target.value) }))
                }
              />
              <Range
                size="md"
                label="Medium (md)"
                min={0}
                max={100}
                value={sizeValues.md}
                showValue
                onChange={(event) =>
                  setSizeValues((prev) => ({ ...prev, md: Number(event.target.value) }))
                }
              />
              <Range
                size="lg"
                label="Large (lg)"
                min={0}
                max={100}
                value={sizeValues.lg}
                showValue
                onChange={(event) =>
                  setSizeValues((prev) => ({ ...prev, lg: Number(event.target.value) }))
                }
              />
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
              <Range
                color="primary"
                label="Primary"
                value={colorValues.primary}
                showValue
                onChange={(event) =>
                  setColorValues((prev) => ({ ...prev, primary: Number(event.target.value) }))
                }
              />
              <Range
                color="success"
                label="Success"
                value={colorValues.success}
                showValue
                onChange={(event) =>
                  setColorValues((prev) => ({ ...prev, success: Number(event.target.value) }))
                }
              />
              <Range
                color="info"
                label="Info"
                value={colorValues.info}
                showValue
                onChange={(event) =>
                  setColorValues((prev) => ({ ...prev, info: Number(event.target.value) }))
                }
              />
              <Range
                color="warning"
                label="Warning"
                value={colorValues.warning}
                showValue
                onChange={(event) =>
                  setColorValues((prev) => ({ ...prev, warning: Number(event.target.value) }))
                }
              />
              <Range
                color="danger"
                label="Danger"
                value={colorValues.danger}
                showValue
                onChange={(event) =>
                  setColorValues((prev) => ({ ...prev, danger: Number(event.target.value) }))
                }
              />
              <Range
                color="neutral"
                label="Neutral"
                value={colorValues.neutral}
                showValue
                onChange={(event) =>
                  setColorValues((prev) => ({ ...prev, neutral: Number(event.target.value) }))
                }
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Steps & Limits</h2>
              <p>step, min, max ve custom interval örnekleri</p>
            </div>

            <div className={styles.formGrid}>
              <Range
                label="Integer Step (step=5)"
                min={0}
                max={100}
                step={5}
                value={stepValues.integer}
                showValue
                minLabel="0"
                maxLabel="100"
                onChange={(event) =>
                  setStepValues((prev) => ({ ...prev, integer: Number(event.target.value) }))
                }
              />
              <Range
                label="Decimal Step (step=0.1)"
                min={0}
                max={3}
                step={0.1}
                value={stepValues.decimal}
                minLabel="0.0"
                maxLabel="3.0"
                showValue
                formatValue={(val) => `${val.toFixed(1)}x`}
                onChange={(event) =>
                  setStepValues((prev) => ({ ...prev, decimal: Number(event.target.value) }))
                }
              />
              <Range
                label="Custom Range (200-800)"
                min={200}
                max={800}
                step={50}
                value={stepValues.customMinMax}
                minLabel="200"
                maxLabel="800"
                showValue
                onChange={(event) =>
                  setStepValues((prev) => ({ ...prev, customMinMax: Number(event.target.value) }))
                }
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>States</h2>
              <p>default, error ve disabled durumları</p>
            </div>

            <div className={styles.formGrid}>
              <Range
                label="Default State"
                value={stateValues.basic}
                showValue
                onChange={(event) =>
                  setStateValues((prev) => ({ ...prev, basic: Number(event.target.value) }))
                }
              />
              <Range
                label="Error State"
                value={stateValues.withError}
                showValue
                error="Seçilen değer izin verilen aralığın dışında."
                onChange={(event) =>
                  setStateValues((prev) => ({ ...prev, withError: Number(event.target.value) }))
                }
              />
              <Range
                label="Disabled State"
                value={stateValues.disabled}
                showValue
                disabled
                onChange={(event) =>
                  setStateValues((prev) => ({ ...prev, disabled: Number(event.target.value) }))
                }
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Formatted Values</h2>
              <p>formatValue ile birim bazlı gösterim</p>
            </div>

            <div className={styles.formGrid}>
              <Range
                label="Progress"
                value={formattedValues.percent}
                showValue
                minLabel="0%"
                maxLabel="100%"
                formatValue={(val) => `%${val}`}
                onChange={(event) =>
                  setFormattedValues((prev) => ({ ...prev, percent: Number(event.target.value) }))
                }
              />
              <Range
                label="Volume"
                color="info"
                value={formattedValues.volume}
                minLabel="Mute"
                maxLabel="Max"
                showValue
                formatValue={(val) => `${val} dB`}
                onChange={(event) =>
                  setFormattedValues((prev) => ({ ...prev, volume: Number(event.target.value) }))
                }
              />
              <Range
                label="Zoom"
                color="success"
                min={50}
                max={200}
                step={10}
                value={formattedValues.zoom}
                showValue
                formatValue={(val) => `${val}%`}
                onChange={(event) =>
                  setFormattedValues((prev) => ({ ...prev, zoom: Number(event.target.value) }))
                }
              />
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Thumb Image</h2>
              <p>custom thumbImage ile görsel tabanlı slider örneği</p>
            </div>

            <div className={styles.formGrid}>
              <Range
                label="Asim The Cat Slider"
                color="warning"
                min={0}
                max={100}
                value={imageThumbValue}
                showValue
                minLabel="0"
                maxLabel="100"
                thumbImage={asimTheCat}
                thumbSize={28}
                formatValue={(val) => `${val} / 100`}
                onChange={(event) => setImageThumbValue(Number(event.target.value))}
              />
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}