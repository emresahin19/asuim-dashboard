"use client";

import { Card, Grid, GridItem, Input, Select, SelectLite, SelectOption, SelectValue } from "@/components";
import { useEffect, useState } from "react";
import styles from "./inputs.module.scss";

const FRAMEWORKS: SelectOption[] = [
    { label: "React", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" },
    { label: "Nuxt.js", value: "nuxtjs" },
];

const GROUPED_OPTIONS = [
    {
        label: "Frontend",
        options: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
        ],
    },
    {
        label: "Backend",
        options: [
            { label: "Node.js", value: "node" },
            { label: "Python", value: "python" },
            { label: "Go", value: "go" },
        ],
    },
    {
        label: "DevOps",
        options: [
            { label: "Docker", value: "docker" },
            { label: "Kubernetes", value: "k8s" },
            { label: "AWS", value: "aws" },
        ],
    },
];

const ROLES = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Guest", value: "guest", disabled: true },
];

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

    const [singleValue, setSingleValue] = useState<SelectValue>(null);
    const [multiValue, setMultiValue] = useState<SelectValue>([]);
    const [groupedValue, setGroupedValue] = useState<SelectValue>(null);
    const [role, setRole] = useState<string | undefined>(undefined);
    const [isSelectLoading, setIsSelectLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsSelectLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

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

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Select Sizes</h2>
                            <p>sm, md, lg ve single select</p>
                        </div>

                        <div className={styles.formGrid}>
                            <Select
                                size="sm"
                                label="Small Select (sm)"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                            <Select
                                size="md"
                                label="Medium Select (md)"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                            <Select
                                size="lg"
                                label="Large Select (lg)"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Select Modes</h2>
                            <p>multi, searchable, grouped</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Select
                                isMulti
                                isSearchable
                                label="Multi + Searchable"
                                placeholder="Teknoloji seç..."
                                options={FRAMEWORKS}
                                value={multiValue}
                                onChange={setMultiValue}
                            />

                            <Select
                                isSearchable
                                label="Grouped Options"
                                placeholder="Alan seç..."
                                options={GROUPED_OPTIONS}
                                value={groupedValue}
                                onChange={setGroupedValue}
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Select States</h2>
                            <p>loading, disabled, error</p>
                        </div>

                        <div className={styles.formGridTwo}>
                            <Select
                                isLoading={isSelectLoading}
                                label="Loading State"
                                placeholder={isSelectLoading ? "Yükleniyor..." : "Hazır"}
                                options={FRAMEWORKS}
                                value={null}
                                onChange={() => { }}
                                disabled={isSelectLoading}
                            />

                            <Select
                                disabled
                                label="Disabled State"
                                placeholder="Seçim yapılamaz"
                                options={FRAMEWORKS}
                                value={FRAMEWORKS[0]}
                                onChange={() => { }}
                            />

                            <Select
                                error="Lütfen geçerli bir seçim yapınız."
                                label="Error State"
                                placeholder="Hatalı durum"
                                options={FRAMEWORKS}
                                value={null}
                                onChange={() => { }}
                            />

                            <SelectLite
                                label="Select Lite"
                                placeholder="Rol seçiniz..."
                                size="md"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>Select Lite Sizes</h2>
                            <p>native select: sm, md, lg</p>
                        </div>

                        <div className={styles.formGridThree}>
                            <SelectLite
                                label="Role (sm)"
                                placeholder="Rol seçiniz..."
                                size="sm"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <SelectLite
                                label="Role (md)"
                                placeholder="Rol seçiniz..."
                                size="md"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <SelectLite
                                label="Role (lg)"
                                placeholder="Rol seçiniz..."
                                size="lg"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}