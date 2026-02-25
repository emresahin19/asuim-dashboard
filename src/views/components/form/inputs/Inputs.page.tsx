"use client";

import { Input } from "@/components"; // Path'i kendi yapına göre düzenle
import { useState } from "react";

export default function InputsPage() {
    // Tüm inputları tek state objesinde yönetmek temiz kod pratiğidir.
    const [formData, setFormData] = useState({
        default: "",
        clearable: "Silinebilir Veri",
        password: "gizlisifreler",
        number: "",
        ghost: "",
        textarea: "",
        errorInput: "hatalı-giriş"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-sans)" }}>
            
            <header style={{ marginBottom: "40px", borderBottom: "1px solid var(--color-border)", paddingBottom: "20px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Input Gallery</h1>
                <p style={{ color: "var(--color-text-muted)" }}>AsUIm Native Input Component Varyasyonları</p>
            </header>

            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

                {/* 1. SIZES (BOYUTLAR) */}
                <section>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>1. Sizes (Boyutlar)</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "end" }}>
                        <Input 
                            size="sm" 
                            label="Small Input (sm)" 
                            placeholder="Height: 36px" 
                        />
                        <Input 
                            size="md" 
                            label="Medium Input (md)" 
                            placeholder="Height: 44px (Default)" 
                        />
                        <Input 
                            size="lg" 
                            label="Large Input (lg)" 
                            placeholder="Height: 52px" 
                        />
                    </div>
                </section>

                {/* 2. STATES (DURUMLAR) */}
                <section>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>2. States (Durumlar)</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                        <Input 
                            label="Active State" 
                            placeholder="Type something..." 
                            name="default"
                            value={formData.default}
                            onChange={handleChange}
                        />
                        <Input 
                            label="Disabled State" 
                            value="Bu alana veri girilemez" 
                            disabled 
                        />
                        <Input 
                            label="Read Only State" 
                            value="Sadece okunabilir veri" 
                            readOnly 
                        />
                        <Input 
                            label="Error State" 
                            name="errorInput"
                            value={formData.errorInput}
                            onChange={handleChange}
                            error="Bu e-posta adresi geçersizdir." 
                        />
                    </div>
                </section>

                {/* 3. FEATURES (ÖZELLİKLER) */}
                <section>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>3. Feature Set</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                        
                        {/* Ignore browser autocomplete on password fields for better UX */}
                        <input style={{display: 'none'}}/>
                        {/* Password Toggle */}
                        <Input 
                            type="password"
                            label="Password Input" 
                            name="password"
                            placeholder="Şifreniz"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {/* Clearable */}
                        <Input 
                            label="Clearable Input" 
                            name="clearable"
                            placeholder="Yaz ve sil..."
                            isClearable={true}
                            value={formData.clearable}
                            onChange={handleChange}
                        />

                        {/* Unit Suffix */}
                        <Input 
                            type="number"
                            label="With Unit" 
                            name="number"
                            placeholder="0.00"
                            unit="USD"
                            value={formData.number}
                            onChange={handleChange}
                        />
                    </div>
                </section>

                 {/* 4. VARIANTS & TEXTAREA */}
                 <section>
                    <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>4. Variants & Textarea</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                             {/* Ghost Variant */}
                            <Input 
                                variant="ghost"
                                label="Ghost Variant" 
                                name="ghost"
                                placeholder="Arkaplanı şeffaf input..."
                                value={formData.ghost}
                                onChange={handleChange}
                            />
                             {/* Full Width */}
                             <Input 
                                fullWidth
                                label="Full Width Prop" 
                                placeholder="Genişliğe yayılır" 
                            />
                        </div>

                        {/* Textarea */}
                        <Input 
                            type="textarea"
                            label="Textarea" 
                            name="textarea"
                            placeholder="Uzun metin girişi..."
                            rows={4}
                            value={formData.textarea}
                            onChange={handleChange}
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}