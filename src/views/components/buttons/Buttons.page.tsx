"use client";

import { useState } from 'react';
import { Button, Card, Grid, GridItem, Icon } from '@/components';
import ArrowRightIcon from '@/components/ui/icon/icons/ArrowRight';
import CirclePlusIcon from '@/components/ui/icon/icons/CirclePlus';
import ExternalLinkIcon from '@/components/ui/icon/icons/ExternalLink';
import SaveIcon from '@/components/ui/icon/icons/Save';
import TrashIcon from '@/components/ui/icon/icons/Trash';
import styles from './buttons.module.scss';

export default function ButtonsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        window.setTimeout(() => {
            setIsSaving(false);
        }, 1800);
    };

    return (
        <div className={styles.page}>
            <Card className={styles.heroCard}>
                <p className={styles.overline}>Components</p>
                <h1 className={styles.title}>Button Gallery</h1>
                <p className={styles.subtitle}>
                    Button bileseninin variant, color, size, icon-only, link ve loading gibi tum standart
                    kullanimlarini bu sayfada gorebilirsin.
                </p>
            </Card>

            <Grid withGap className={styles.sectionGrid}>
                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Variants</h2>
                            <p>solid, outline, soft, ghost, link</p>
                        </div>

                        <div className={styles.comboGrid}>
                            <Button variant="solid">Solid Button</Button>
                            <Button variant="outline">Outline Button</Button>
                            <Button variant="soft">Soft Button</Button>
                            <Button variant="ghost">Ghost Button</Button>
                            <Button variant="link">Link Variant</Button>
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Colors</h2>
                            <p>primary, success, info, warning, danger, neutral</p>
                        </div>

                        <div className={styles.colorGrid}>
                            <Button color="primary">Primary</Button>
                            <Button color="success">Success</Button>
                            <Button color="info">Info</Button>
                            <Button color="warning">Warning</Button>
                            <Button color="danger">Danger</Button>
                            <Button color="neutral">Neutral</Button>
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Sizes</h2>
                            <p>sm, md, lg ve fullWidth</p>
                        </div>

                        <div className={styles.row}>
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                        </div>

                        <div className={styles.stretchWrap}>
                            <Button fullWidth leftIcon={<Icon icon={CirclePlusIcon} size={16} decorative />}>
                                Full Width Action
                            </Button>
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Icon Usage</h2>
                            <p>left/right icon ve sadece icon buton</p>
                        </div>

                        <div className={styles.row}>
                            <Button leftIcon={<Icon icon={SaveIcon} size={16} decorative />}>Kaydet</Button>
                            <Button
                                variant="outline"
                                rightIcon={<Icon icon={ArrowRightIcon} size={16} decorative />}
                            >
                                Devam Et
                            </Button>
                            <Button
                                iconOnly
                                aria-label="Yeni kayit"
                                leftIcon={<Icon icon={CirclePlusIcon} size={17} decorative />}
                            />
                            <Button
                                iconOnly
                                variant="outline"
                                color="danger"
                                aria-label="Sil"
                                leftIcon={<Icon icon={TrashIcon} size={17} decorative />}
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Link Buttons</h2>
                            <p>ic route ve dis link kullanimlari</p>
                        </div>

                        <div className={styles.buttonGrid}>
                            <Button href="/dashboard" variant="soft">
                                Dashboard'a Git
                            </Button>
                            <Button
                                href="https://nextjs.org/docs"
                                external
                                variant="outline"
                                rightIcon={<Icon icon={ExternalLinkIcon} size={15} decorative />}
                            >
                                External Docs
                            </Button>
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>States</h2>
                            <p>loading, disabled ve loadingText</p>
                        </div>

                        <div className={styles.buttonGrid}>
                            <Button loading loadingText="Yukleniyor...">
                                Submit
                            </Button>
                            <Button disabled variant="outline">
                                Disabled
                            </Button>
                            <Button onClick={handleSave} loading={isSaving} loadingText="Kaydediliyor...">
                                Simule Save
                            </Button>
                        </div>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}