"use client";

import { useState } from "react";
import { Card, Grid, GridItem, Radio } from "@/components";
import styles from "./radio.module.scss";

export default function RadioPage() {
    const [plan, setPlan] = useState("starter");

    return (
        <div className={styles.page}>
            <Card className={styles.heroCard}>
                <p className={styles.overline}>Components</p>
                <h1 className={styles.title}>Radio Gallery</h1>
                <p className={styles.subtitle}>
                    Radio bileşeninin size, color, variant, state ve group kullanım örneklerini bu sayfada görebilirsin.
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
                            <Radio name="sizes" size="sm" label="Small (sm)" defaultChecked />
                            <Radio name="sizes" size="md" label="Medium (md)" />
                            <Radio name="sizes" size="lg" label="Large (lg)" />
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
                            <Radio name="colors1" color="primary" label="Primary" defaultChecked />
                            <Radio name="colors2" color="success" label="Success" defaultChecked />
                            <Radio name="colors3" color="info" label="Info" defaultChecked />
                            <Radio name="colors4" color="warning" label="Warning" defaultChecked />
                            <Radio name="colors5" color="danger" label="Danger" defaultChecked />
                            <Radio name="colors6" color="neutral" label="Neutral" defaultChecked />
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
                            <Radio
                                name="variants"
                                variant="default"
                                label="Default Variant"
                                description="Temel kullanım için standart radio görünümü."
                                defaultChecked
                            />
                            <Radio
                                name="variants"
                                variant="card"
                                label="Card Variant"
                                description="Kart görünümünde seçim alanı."
                            />
                            <Radio
                                name="variants"
                                variant="ghost"
                                label="Ghost Variant"
                                description="Minimal, sade görünüm."
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>States</h2>
                            <p>selected, unselected, disabled, error</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Radio name="states" label="Unselected State" />
                            <Radio name="states" label="Selected State" defaultChecked />
                            <Radio name="states-disabled" label="Disabled State" disabled defaultChecked />
                            <Radio
                                name="states"
                                label="Error State"
                                description="Lütfen bir plan seçiniz."
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
                            <Radio
                                name="layout"
                                align="start"
                                label="Align Start"
                                description="Çok satırlı açıklamayla üstten hizalama."
                                defaultChecked
                            />
                            <Radio
                                name="layout"
                                align="center"
                                label="Align Center"
                                description="Tek satır içeriklerde ortalanmış hizalama."
                            />
                            <Radio
                                name="layout-reverse"
                                reverse
                                label="Reverse Layout"
                                description="Label solda, radio sağda görünür."
                                defaultChecked
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Controlled Groups</h2>
                            <p>form state ile yönetilen radio group örnekleri</p>
                        </div>

                        <h3>Subscription Plan</h3>
                        <div className={styles.formGrid}>
                            <Radio
                                name="plan"
                                value="starter"
                                variant="card"
                                hideIndicator
                                checked={plan === "starter"}
                                onChange={(event) => setPlan(event.target.value)}
                                label="Starter"
                                description="Küçük ekipler için başlangıç planı"
                            />
                            <Radio
                                name="plan"
                                value="pro"
                                variant="card"
                                hideIndicator
                                checked={plan === "pro"}
                                onChange={(event) => setPlan(event.target.value)}
                                label="Pro"
                                description="Üretim ortamı için gelişmiş plan"
                            />
                            <Radio
                                name="plan"
                                value="enterprise"
                                variant="card"
                                hideIndicator
                                checked={plan === "enterprise"}
                                onChange={(event) => setPlan(event.target.value)}
                                label="Enterprise"
                                description="Kurumsal ekipler için ölçeklenebilir plan"
                            />
                        </div>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}