# AsUIm Dashboard - Project Manifestosu ve Mimari Dokümantasyonu

**Version:** 3.1 (Nx-Ready / Native Edition)\
**Rol:** Senior Frontend Architect & Code Guardian\
**Durum:** Strict Compliance Required

------------------------------------------------------------------------

## 1. Proje Felsefesi ve Temel Kimlik

AsUIm Dashboard; performans, öngörülebilirlik ve mimari disiplin
odağında geliştirilen, harici UI kütüphanesi barındırmayan, %100 Native
SCSS ve TypeScript tabanlı bir dashboard mimarisidir.

### 1.1 Native Kuralı

-   Yasaklar: styled-components, emotion, tailwind, bootstrap veya
    herhangi bir hazır UI kütüphanesi kullanılamaz.
-   Hedef: Lighthouse Performance, Accessibility ve SEO skorlarında
    maksimum seviyeye ulaşmak.
-   Vizyon: Gelecekte No-Code Builder altyapısına dönüşeceği için her
    component serileştirilebilir (serializable) ve CSS Variable tabanlı
    olmalıdır.

------------------------------------------------------------------------

## 2. Mimari ve Dizin Yapısı

Proje, gelecekte Nx monorepo yapısına sorunsuz geçiş yapabilecek şekilde **Container/Presenter** yaklaşımı ile tasarlanmıştır.

### 2.1 Makro Yapı

    src/
    ├── app/                  # Framework Layer (Next.js App Router)
    ├── views/                # Presenter Layer (Sayfa kompozisyonu)
    ├── components/           # Atomic & Feature Layer
    │   ├── ui/               # Dumb Components (Button, Input)
    │   ├── features/         # Smart Components (ThemeSettings, UserProfile)
    │   ├── layout/           # Structural (Grid, Container)
    │   └── data/             # Data-Aware (Table, Chart)
    ├── config/               # SSOT (Routing, sabitler)
    ├── context/              # Global state katmanı
    ├── hooks/                # Custom logic katmanı
    ├── styles/               # Theme Engine (SCSS, Tokens)
    ├── lib/                  # Utility fonksiyonlar
    └── types/                # Global tipler

------------------------------------------------------------------------

## 3. Component Categorization Layer

Her component kendi klasöründe izole edilmelidir. Tek dosya component kullanımı YASAKTIR.

    components/
    ├── ui/         # Dumb Components (Button, Input)
    ├── features/   # Smart Components (ThemeSettings, UserProfile)
    ├── layout/     # Structural (Grid, Container)
    ├── data/       # Data-Aware (Table, Chart)

-   ui katmanı veri bilmez.
-   data katmanı veri farkındalığına sahiptir ancak business logic
    barındırmaz.
-   layout katmanı sadece yerleşim sorumluluğuna sahiptir.

------------------------------------------------------------------------

## 4. Strict Component Pattern

Her component kendi klasöründe izole edilmelidir.

1. Standart UI Component Örneği
    Basit, atomik bir bileşen.

    src/components/ui/button/               <-- Klasör: kebab-case
    ├── index.ts                            <-- Barrel File (Public Export)
    ├── Button.tsx                          <-- Component: PascalCase
    ├── button.module.scss                  <-- Style: kebab-case
    └── button.types.ts                     <-- Types: kebab-case

2. Complex Feature Örneği
    İçinde hook veya yardımcı fonksiyon barındırabilecek, "Connected" bir bileşen.

    src/components/features/theme-settings/ <-- Klasör: kebab-case (Git dostu)
    ├── index.ts                            <-- Barrel File (Public Export)
    ├── ThemeSettings.tsx                   <-- Component: PascalCase (React standardı)
    ├── theme-settings.module.scss          <-- Style: kebab-case
    ├── theme-settings.types.ts             <-- Types: kebab-case
    └── theme-settings.utils.ts             <-- Utils: kebab-case (Helper logic)

3. Context & Provider Örneği
    State yönetimi olduğu için dosya isimlendirmesi biraz daha spesifiktir ancak kural bozulmaz.
    
    src/context/theme/                      <-- Klasör: kebab-case
    ├── index.ts                            <-- Export: Provider ve Hook dışarı açılır
    ├── ThemeContext.tsx                    <-- Context Def: PascalCase
    ├── ThemeProvider.tsx                   <-- Provider Comp: PascalCase
    ├── useTheme.ts                         <-- Hook: camelCase (İstisna: Hook standardı)
    └── theme.types.ts                      <-- Types: kebab-case

-   Tek dosya component kullanımı yasaktır.
-   Dosya isimleri kebab-case, component isimleri PascalCase olmalıdır.

------------------------------------------------------------------------

## 5. Design Token Contract

Design token sistemi bir API sözleşmesi olarak kabul edilir.

### 5.1 Temel Kurallar

-   Componentler doğrudan SCSS map'lerine erişemez.
-   Componentler yalnızca CSS Variable kullanır.
-   Tüm variable isimleri `--asuim-` prefixi ile başlar.
-   Token silmek breaking change olarak değerlendirilir.
-   Token yeniden adlandırmak major versiyon değişikliğidir.

### 5.2 Token Katmanları

-   Raw Tokens: SCSS Map olarak tutulur, doğrudan CSS üretmez.
-   Theme Injection: Aktif tema tokenları :root seviyesinde CSS Variable
    olarak basılır.
-   Proxy chain yasaktır. Variable başka variable'a referans vermez.

------------------------------------------------------------------------

## 6. Naming Conventions ve API Standartları

-   variant="outlined"
-   isDisabled={true}
-   isLoading={true}
-   onValueChange={(val) =\> ...}

Tahmin edilebilir API tasarımı zorunludur.

------------------------------------------------------------------------

## 7. Styling Engine: Lazy SCSS

### 7.1 Grid Sistemi

-   width: calc(100% - var(--grid-gap) \* 2)
-   Negatif margin sadece belgelenmiş istisnai durumlarda
    kullanılabilir.

### 7.2 Icon Standardı

-   Lucide SVG kullanılır.
-   SVG currentColor ile renklendirilir.
-   Boyutlandırma CSS üzerinden yapılır.

------------------------------------------------------------------------

## 8. Accessibility Standardı

AsUIm erişilebilirliği opsiyonel değil, zorunlu kabul eder.

-   Interactive elementler role ve aria-\* attribute içerir.
-   WCAG AA kontrast seviyesi minimum standarttır.
-   Focus ring kaldırılmaz.
-   Klavye navigasyonu desteklenmelidir.
-   Form alanları label ile ilişkilendirilmelidir.

------------------------------------------------------------------------

## 9. Server Component Strategy

Next.js App Router mimarisi doğrultusunda:

-   Varsayılan olarak tüm componentler Server Component kabul edilir.
-   Sadece interaktif olanlar "use client" içerir.
-   Data fetching server-first yaklaşımı ile yapılır.
-   View katmanında client-side fetch tercih edilmez.
-   Server ve Client boundary net şekilde ayrılmalıdır.

------------------------------------------------------------------------

## 10. State Management Standartları

### 10.1 Context Pattern

    src/context/Theme/
    ├── ThemeContext.tsx
    ├── ThemeProvider.tsx
    └── useTheme.ts

-   Context dosyaları parçalıdır.
-   Tek dosya dev context yasaktır.
-   Guard clause içeren custom hook zorunludur.

### 10.2 Hook Standartları

-   Her hook tek sorumluluğa sahiptir.
-   UI logic view'dan ayrıştırılır.

------------------------------------------------------------------------

## 11. Routing ve SSOT

-   Tüm route'lar src/config/routes.ts içinde tanımlıdır.
-   Route ID'ler TypeScript ile infer edilir.
-   Hardcoded string kullanımı yasaktır.
-   Breadcrumb ve metadata buradan beslenir.

------------------------------------------------------------------------

## 12. Performance Disiplini

-   No FOUC: ThemeScript zorunludur.
-   next/font kullanılır. Harici CDN yasaktır.
-   Ağır componentler dynamic import ile yüklenir.
-   Animasyonlu componentler requestAnimationFrame ile optimize edilir.

------------------------------------------------------------------------

## 13. Signature Features

-   SidebarTrace mimari olarak korunmalıdır.
-   Gesture Control (Mobile) native hissi bozmayacak şekilde
    uygulanmalıdır.

------------------------------------------------------------------------

## 14. Versioning ve Breaking Change Politikası

-   Minor versiyon: yeni özellik, geriye dönük uyumlu.
-   Patch: bug fix.
-   Major: token değişimi, mimari kırılım, API değişikliği.
-   Token silme major değişikliktir.

------------------------------------------------------------------------

## 15. Temel İlke

AsUIm opinionated bir mimaridir.

-   Predictability \> Flexibility
-   Constraint \> Chaos
-   Performance bir pazarlama metriği değil, tasarım kısıtıdır.
