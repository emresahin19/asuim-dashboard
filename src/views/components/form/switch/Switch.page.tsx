"use client";

import { Card, Grid, GridItem, Switch } from "@/components";
import { useState } from "react";
import styles from "./switch.module.scss";

export default function SwitchPage() {
    const [plan, setPlan] = useState("starter");
    
    return (
        <div className={styles.page}>
            <Card className={styles.heroCard}>
                <p className={styles.overline}>Components</p>
                <h1 className={styles.title}>Switch Gallery</h1>
                <p className={styles.subtitle}>
                    Switch bileşeninin size, color, variant, state ve group kullanım örneklerini bu sayfada görebilirsin.
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
                            <Switch name="sizes" size="sm" label="Small (sm)" defaultChecked />
                            <Switch name="sizes" size="md" label="Medium (md)" />
                            <Switch name="sizes" size="lg" label="Large (lg)" />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Colors</h2>
                            <p>primary, success, info, danger, warning, neutral</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Switch name="colors" color="primary" label="Primary" defaultChecked />
                            <Switch name="colors" color="success" label="Success" defaultChecked />
                            <Switch name="colors" color="info" label="Info" defaultChecked />
                            <Switch name="colors" color="danger" label="Danger" defaultChecked />
                            <Switch name="colors" color="warning" label="Warning" defaultChecked />
                            <Switch name="colors" color="neutral" label="Neutral" defaultChecked />
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
                            <Switch
                                name="variants"
                                label="Default Variant"
                                description="Temel kullanım için standart switch görünümü."
                                defaultChecked
                            />
                            <Switch
                                name="variants"
                                label="Loading State"
                                description="Switch'in yükleniyor durumunu göstermek için spinner eklenmiş hali."
                                loading
                                defaultChecked

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
                            <Switch name="states" label="Unselected State" />
                            <Switch name="states-disabled-on" label="Disabled State" disabled defaultChecked />
                            <Switch name="states" label="Selected State" defaultChecked />
                            <Switch name="states-disabled-off" label="Disabled State" disabled />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Controlled Groups</h2>
                            <p>form state ile yönetilen switch group örnekleri</p>
                        </div>

                        <h3>Subscription Plan</h3>
                        <div className={styles.formGrid}>
                            <Switch
                                name="plan"
                                value="starter"
                                checked={plan === "starter"}
                                onChange={(event) => setPlan(event.target.value)}
                                label="Starter"
                                description="Küçük ekipler için başlangıç planı"
                            />
                            <Switch
                                name="plan"
                                value="pro"
                                checked={plan === "pro"}
                                onChange={(event) => setPlan(event.target.value)}
                                label="Pro"
                                description="Üretim ortamı için gelişmiş plan"
                            />
                            <Switch
                                name="plan"
                                value="enterprise"
                                checked={plan === "enterprise"}
                                onChange={(event) => setPlan(event.target.value)}
                                label="Enterprise"
                                description="Kurumsal ekipler için ölçeklenebilir plan"
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
                            <Switch
                                name="layout"
                                label="Align Start"
                                description="Çok satırlı açıklamayla üstten hizalama."
                                defaultChecked
                            />
                            <Switch
                                name="layout-reverse"
                                reverse
                                label="Reverse Layout"
                                description="Label solda, switch sağda görünür."
                                defaultChecked
                            />
                        </div>
                    </Card>
                </GridItem>

            </Grid>
        </div>
    );
}