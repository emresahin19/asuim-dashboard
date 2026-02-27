"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Card, DatePicker, Grid, GridItem } from "@/components";
import styles from "./date-picker.module.scss";

export default function DatePickerPage() {
    const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
    const [emptyDate, setEmptyDate] = useState<Date | undefined>(undefined);
    const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
        from: new Date(new Date().setDate(new Date().getDate() - 3)),
        to: new Date(),
    });
    const [rangeWithPresets, setRangeWithPresets] = useState<DateRange | undefined>();
    const [errorDate, setErrorDate] = useState<Date | undefined>(undefined);

    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
    const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);

    const handleSingleChange = (value: Date | DateRange | undefined) => {
        setSingleDate(value instanceof Date ? value : undefined);
    };

    const handleEmptyChange = (value: Date | DateRange | undefined) => {
        setEmptyDate(value instanceof Date ? value : undefined);
    };

    const handleRangeChange = (value: Date | DateRange | undefined) => {
        if (!value || !("from" in value)) {
            setRangeDate(undefined);
            return;
        }

        setRangeDate(value as DateRange);
    };

    const handlePresetRangeChange = (value: Date | DateRange | undefined) => {
        if (!value || !("from" in value)) {
            setRangeWithPresets(undefined);
            return;
        }

        setRangeWithPresets(value as DateRange);
    };

    const handleErrorDateChange = (value: Date | DateRange | undefined) => {
        setErrorDate(value instanceof Date ? value : undefined);
    };

    return (
        <div className={styles.page}>
            <Card className={styles.heroCard}>
                <p className={styles.overline}>Components</p>
                <h1 className={styles.title}>Date Picker Gallery</h1>
                <p className={styles.subtitle}>
                    DatePicker bileşeninin single/range, presets, state ve tarih kısıt varyasyonlarını bu sayfada inceleyebilirsin.
                </p>
            </Card>

            <Grid withGap className={styles.sectionGrid}>
                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Single Mode</h2>
                            <p>tekli tarih seçimi için temel kullanım</p>
                        </div>

                        <div className={styles.formGrid}>
                            <DatePicker
                                label="Appointment Date"
                                mode="single"
                                value={singleDate}
                                onChange={handleSingleChange}
                                placeholder="Randevu tarihi seç"
                            />

                            <DatePicker
                                label="Optional Date"
                                mode="single"
                                value={emptyDate}
                                onChange={handleEmptyChange}
                                placeholder="İsteğe bağlı tarih"
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Range Mode</h2>
                            <p>başlangıç-bitiş aralığı seçimi</p>
                        </div>

                        <div className={styles.formGrid}>
                            <DatePicker
                                label="Report Period"
                                mode="range"
                                value={rangeDate}
                                onChange={handleRangeChange}
                                placeholder="Tarih aralığı seç"
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Presets</h2>
                            <p>range modunda hızlı kısayol butonları</p>
                        </div>

                        <div className={styles.formGrid}>
                            <DatePicker
                                label="Analytics Window"
                                mode="range"
                                showPresets
                                value={rangeWithPresets}
                                onChange={handlePresetRangeChange}
                                placeholder="Preset ile aralık seç"
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>States</h2>
                            <p>default, disabled ve error durumları</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <DatePicker
                                label="Default State"
                                mode="single"
                                value={singleDate}
                                onChange={handleSingleChange}
                                placeholder="Tarih seç"
                            />

                            <DatePicker
                                label="Disabled State"
                                mode="single"
                                value={singleDate}
                                onChange={handleSingleChange}
                                disabled
                                placeholder="Pasif"
                            />

                            <DatePicker
                                label="Error State"
                                mode="single"
                                value={errorDate}
                                onChange={handleErrorDateChange}
                                error="Lütfen geçerli bir teslim tarihi seçiniz."
                                placeholder="Teslim tarihi seç"
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Min / Max Date</h2>
                            <p>seçimi belirli bir tarih aralığı ile sınırlandırma</p>
                        </div>

                        <div className={styles.formGrid}>
                            <DatePicker
                                label="Booking Date"
                                mode="single"
                                value={singleDate}
                                onChange={handleSingleChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholder="Son 14 gün ile +30 gün arası"
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Layout</h2>
                            <p>fullWidth ve farklı içerik genişliklerinde kullanım</p>
                        </div>

                        <div className={styles.formGrid}>
                            <DatePicker
                                label="Full Width Picker"
                                mode="single"
                                value={singleDate}
                                onChange={handleSingleChange}
                                fullWidth
                                placeholder="Container genişliğine yayılır"
                            />
                        </div>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}