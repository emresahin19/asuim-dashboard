"use client";

import { Card, Grid, GridItem, Input, SelectLite } from "@/components";
import { useEffect, useState } from "react";
import styles from "./select.module.scss";
import { Select, SelectOption, SelectValue } from "@/components";

// --- MOCK DATA ---
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
    { label: "Guest", value: "guest", disabled: true }
];

export default function InputsPage() {
    const [singleValue, setSingleValue] = useState<SelectValue>(null);
    const [multiValue, setMultiValue] = useState<SelectValue>([]);
    const [groupedValue, setGroupedValue] = useState<SelectValue>(null);
    const [role, setRole] = useState<string | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.page}>
            <Card className={styles.heroCard}>
                <p className={styles.overline}>Components</p>
                <h1 className={styles.title}>Select Gallery</h1>
                <p className={styles.subtitle}>Single, Multi, Grouped ve Searchable modları içeren akıllı dropdown.</p>
            </Card>

            <Grid withGap className={styles.sectionGrid}>
                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>1. Single Select</h2>
                        </div>

                        <div className={styles.formGrid}>
                            <Select
                                size="sm"
                                label="Small (sm)"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                            <Select
                                size="md"
                                label="Medium (Default)"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                            <Select
                                size="lg"
                                label="Large (lg)"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                            />
                            <Select
                                label="Without Indicator"
                                placeholder="Framework seç..."
                                options={FRAMEWORKS}
                                value={singleValue}
                                onChange={setSingleValue}
                                variant="lite"
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>2. Multi Select & Searchable</h2>
                        </div>

                        <div className={styles.formGrid}>
                            <Select
                                isMulti
                                isSearchable
                                label="Multi Select (Searchable)"
                                placeholder="Teknolojileri ekle..."
                                options={FRAMEWORKS}
                                value={multiValue}
                                onChange={setMultiValue}
                            />

                            {/* Read-Only Multi (Search Kapalı) */}
                            <Select
                                isMulti
                                isSearchable={false}
                                label="Multi Select (No Search)"
                                placeholder="Listeden seç..."
                                options={FRAMEWORKS}
                                value={multiValue}
                                onChange={setMultiValue}
                            />
                            
                            <Select
                                isMulti
                                isSearchable
                                variant="lite"
                                label="Multi Select (Lite)"
                                placeholder="Teknolojileri ekle..."
                                options={FRAMEWORKS}
                                value={multiValue}
                                onChange={setMultiValue}
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>3. Grouped Data</h2>
                        </div>

                        <div className={styles.formGrid}>
                            <Select
                                isSearchable
                                label="Departman Bazlı Seçim"
                                placeholder="Alan seçiniz..."
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
                            <h2>4. Component States</h2>
                        </div>

                        <div className={styles.formGrid}>
                            <Select
                                isLoading={isLoading}
                                label="Async Loading State"
                                placeholder={isLoading ? "Veriler yükleniyor..." : "Yüklendi!"}
                                options={FRAMEWORKS}
                                value={null}
                                onChange={() => { }}
                                disabled={isLoading}
                            />

                            {/* Disabled State */}
                            <Select
                                disabled
                                label="Disabled State"
                                placeholder="Seçim yapılamaz"
                                options={FRAMEWORKS}
                                value={FRAMEWORKS[0]}
                                onChange={() => { }}
                            />

                            {/* Error State */}
                            <Select
                                error="Lütfen geçerli bir seçim yapınız."
                                label="Error State"
                                placeholder="Hatalı durum"
                                options={FRAMEWORKS}
                                value={null}
                                onChange={() => { }}
                            />
                        </div>
                    </Card>
                </GridItem>

                <GridItem xs={1} sm={2}>
                    <Card className={styles.sectionCard}>
                        <div className={styles.sectionHead}>
                            <h2>5. Select Lite</h2>
                        </div>

                        <div className={styles.formGridTwo}>
                            <SelectLite
                                label="Role"
                                placeholder="Rol seçiniz..."
                                size="sm"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                fullWidth
                            />

                            <SelectLite
                                label="Role"
                                placeholder="Rol seçiniz..."
                                size="md"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                fullWidth
                            />

                            <SelectLite
                                label="Role"
                                placeholder="Rol seçiniz..."
                                size="lg"
                                options={ROLES}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                fullWidth
                            />
                        </div>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}