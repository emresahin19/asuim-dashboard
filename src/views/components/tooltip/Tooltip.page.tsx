"use client";

import { useState } from 'react';
import { Button, Card, Grid, GridItem, Tooltip } from '@/components';
import { TooltipAlign, TooltipPosition, TooltipVariant } from '@/components/ui/tooltip';
import styles from './tooltip.module.scss';

const variants: TooltipVariant[] = ['dark', 'light', 'soft'];
const positions: TooltipPosition[] = ['top', 'right', 'bottom', 'left'];
const aligns: TooltipAlign[] = ['start', 'center', 'end'];

export default function TooltipPage() {
  const [manualOpen, setManualOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Card className={styles.heroCard}>
        <p className={styles.overline}>Components</p>
        <h1 className={styles.title}>Tooltip Gallery</h1>
        <p className={styles.subtitle}>
          Tooltip bileseninin varyasyonlarini tek sayfada gorebilirsin: variant, position,
          align, trigger mode, delay, arrow ve controlled kullanim.
        </p>
      </Card>

      <Grid withGap className={styles.sectionGrid}>
        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Variants</h2>
              <p>dark, light, soft</p>
            </div>

            <div className={styles.row}>
              {variants.map((variant) => (
                <Tooltip key={variant} variant={variant} content={`Variant: ${variant}`}>
                  <Button variant="soft">{variant}</Button>
                </Tooltip>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Positions</h2>
              <p>top, right, bottom, left</p>
            </div>

            <div className={styles.row}>
              {positions.map((position) => (
                <Tooltip key={position} position={position} content={`Position: ${position}`}>
                  <Button variant="outline">{position}</Button>
                </Tooltip>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Align</h2>
              <p>start, center, end (top position)</p>
            </div>

            <div className={styles.row}>
              {aligns.map((align) => (
                <Tooltip key={align} position="top" align={align} content={`Align: ${align}`}>
                  <Button variant="ghost">{align}</Button>
                </Tooltip>
              ))}
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Trigger Modes</h2>
              <p>hover, click, manual</p>
            </div>

            <div className={styles.row}>
              <Tooltip trigger="hover" content="Hover trigger (default)">
                <Button>Hover Trigger</Button>
              </Tooltip>

              <Tooltip trigger="click" content="Click trigger, disari tiklayinca kapanir">
                <Button variant="outline">Click Trigger</Button>
              </Tooltip>

              <Tooltip
                trigger="manual"
                open={manualOpen}
                onOpenChange={setManualOpen}
                content="Controlled tooltip (manual mode)"
              >
                <Button
                  variant="soft"
                  onClick={() => setManualOpen((prev) => !prev)}
                >
                  Manual Toggle
                </Button>
              </Tooltip>
            </div>
          </Card>
        </GridItem>

        <GridItem xs={1} sm={2}>
          <Card className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2>Behavior Options</h2>
              <p>delay, arrow, maxWidth, disabled</p>
            </div>

            <div className={styles.row}>
              <Tooltip delay={450} content="Gecikmeli acilis (450ms)">
                <Button variant="outline">Delay 450ms</Button>
              </Tooltip>

              <Tooltip withArrow={false} content="Arrow gizli tooltip">
                <Button variant="outline">Arrow Off</Button>
              </Tooltip>

              <Tooltip
                maxWidth={220}
                content="Bu uzun tooltip metni maxWidth ile satira kirilir ve sabit bir genislikte render edilir."
              >
                <Button variant="outline">Max Width</Button>
              </Tooltip>

              <Tooltip disabled content="Bu gorunmeyecek">
                <Button variant="outline">Disabled Tooltip</Button>
              </Tooltip>
            </div>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}
