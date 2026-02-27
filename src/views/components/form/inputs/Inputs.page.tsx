"use client";

import { Card, Grid, GridItem, Input, Select, SelectLite, SelectOption, SelectValue } from "@/components";
import { useState } from "react";
import styles from "./inputs.module.scss";

export default function InputsPage() {
    const [formData, setFormData] = useState({
        default: "",
        email: "",
        clearable: "Silinebilir Veri",
        password: "gizlisifreler",
        search: "",
        tel: "",
        url: "",
        number: "",
        ghost: "",
        textarea: "",
        errorInput: "hatalı-giriş",
        readonly: "Sadece okunabilir veri",
        disabled: "Bu alana veri girilemez"
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.page}>
            <Card className={styles.heroCard}>
                <p className={styles.overline}>Components</p>
                <h1 className={styles.title}>Input Gallery</h1>
                <p className={styles.subtitle}>
                    AsUIm Input bileşeninin tüm varyasyonlarını, durumlarını ve kullanım senaryolarını bu sayfada görebilirsin.
                </p>
            </Card>

            <Grid withGap className={styles.sectionGrid}>
                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Sizes</h2>
                            <p>sm, md, lg ölçü varyasyonları</p>
                        </div>

                        <div className={styles.formGridThree}>
                            <Input size="sm" label="Small Input (sm)" placeholder="Height: 36px" />
                            <Input size="md" label="Medium Input (md)" placeholder="Height: 44px (Default)" />
                            <Input size="lg" label="Large Input (lg)" placeholder="Height: 52px" />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>States</h2>
                            <p>default, disabled, readOnly, error</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Input
                                label="Active State"
                                placeholder="Type something..."
                                name="default"
                                value={formData.default}
                                onChange={handleChange}
                            />

                            <Input
                                label="Disabled State"
                                name="disabled"
                                value={formData.disabled}
                                disabled
                                onChange={handleChange}
                            />

                            <Input
                                label="Read Only State"
                                name="readonly"
                                value={formData.readonly}
                                readOnly
                                onChange={handleChange}
                            />

                            <Input
                                label="Error State"
                                name="errorInput"
                                value={formData.errorInput}
                                onChange={handleChange}
                                error="Bu e-posta adresi geçersizdir."
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Input Types</h2>
                            <p>text, email, password, search, tel, url, number, textarea</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Input
                                type="text"
                                label="Text"
                                name="default"
                                value={formData.default}
                                onChange={handleChange}
                                placeholder="Ad Soyad"
                            />

                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ornek@domain.com"
                            />

                            <Input
                                type="password"
                                label="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Şifreniz"
                            />

                            <Input
                                type="search"
                                label="Search"
                                name="search"
                                value={formData.search}
                                onChange={handleChange}
                                placeholder="Ara..."
                            />

                            <Input
                                type="tel"
                                label="Telephone"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                placeholder="+90 5XX XXX XX XX"
                            />

                            <Input
                                type="url"
                                label="URL"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />

                            <Input
                                type="number"
                                label="Number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder="0"
                            />

                            <Input
                                type="textarea"
                                label="Textarea"
                                name="textarea"
                                rows={4}
                                value={formData.textarea}
                                onChange={handleChange}
                                placeholder="Uzun metin girişi..."
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Feature Set</h2>
                            <p>clearable, unit, ghost, full width kombinasyonları</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Input
                                label="Clearable Input"
                                name="clearable"
                                placeholder="Yaz ve sil..."
                                isClearable
                                value={formData.clearable}
                                onChange={handleChange}
                            />

                            <Input
                                type="number"
                                label="With Unit"
                                name="number"
                                placeholder="0.00"
                                unit="USD"
                                value={formData.number}
                                onChange={handleChange}
                            />

                            <Input
                                variant="ghost"
                                label="Ghost Variant"
                                name="ghost"
                                placeholder="Arkaplanı şeffaf input..."
                                value={formData.ghost}
                                onChange={handleChange}
                            />

                            <Input
                                fullWidth
                                label="Full Width"
                                placeholder="Container genişliğine yayılır"
                            />
                        </div>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}