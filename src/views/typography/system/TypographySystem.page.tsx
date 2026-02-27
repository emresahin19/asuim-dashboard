import { typographyFontVariables } from '@/app/fonts.typography'
import { Card } from '@/components/ui/card'
import { CodeBlock } from '@/components/ui/code-block'
import styles from './typography-system.module.scss'
import { clsx } from '@/utils'

const headingRows = [
    { tag: 'h1', label: 'Heading 1', sample: 'Platform Typography Standard' },
    { tag: 'h2', label: 'Heading 2', sample: 'Consistent and readable hierarchy' },
    { tag: 'h3', label: 'Heading 3', sample: 'Section titles and blocks' },
    { tag: 'h4', label: 'Heading 4', sample: 'Card level emphasis' },
    { tag: 'h5', label: 'Heading 5', sample: 'Compact title variant' },
    { tag: 'h6', label: 'Heading 6', sample: 'Micro heading / metadata title' },
] as const

const fontFamilies = [
    { title: 'Inter (UI / Base)', family: 'var(--font-inter)' },
    { title: 'DM Sans', family: 'var(--font-dm-sans)' },
    { title: 'Manrope', family: 'var(--font-manrope)' },
    { title: 'Plus Jakarta Sans', family: 'var(--font-plus-jakarta-sans)' },
    { title: 'Quicksand', family: 'var(--font-quicksand)' },
    { title: 'Bona Nova (Serif)', family: 'var(--font-bona-nova)' },
    { title: 'Roboto Serif', family: 'var(--font-roboto-serif)' },
    { title: 'Bebas Neue (Display)', family: 'var(--font-bebas-neue)' },
    { title: 'Bayon (Brand)', family: 'var(--font-bayon)' },
] as const

const quoteCodeSample = `<blockquote className="quote">
    Typography is the craft of endowing human language
    with a durable visual form.
</blockquote>`

export default function TypographySystemPage() {
    return (
        <div className={clsx(typographyFontVariables, styles.page)}>
            <Card className={styles.heroCard}>
                <p className={styles.typeOverline}>Foundations</p>
                <h1 className={styles.title}>Typography System</h1>
                <p className={clsx(styles.subtitle, styles.typeLead)}>
                    Font aileleri, metin hiyerarşisi ve içerik tipleri için üretime hazır
                    standartlar. Başlık ölçekleri mobilde daha kompakt, tablet ve üstünde
                    daha ferah bir ritimde çalışır.
                </p>
            </Card>

            <Card className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <h2>Heading Scale</h2>
                    <p>h1-h6 token tabanlıdır ve `md` breakpoint’ten itibaren büyür.</p>
                </div>

                <div className={styles.stack}>
                    {headingRows.map((item) => (
                        <div className={styles.headingRow} key={item.tag}>
                            <p className={clsx(styles.token, styles.typeCode)}>
                                {item.label} · var(--font-size-{item.tag})
                            </p>
                            <HeadingPreview tag={item.tag} text={item.sample} />
                        </div>
                    ))}
                </div>
            </Card>

            <Card className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <h2>Body, Quote & Code</h2>
                    <p>Uzun içerik, quote kullanımı ve dokümantasyon code örnekleri.</p>
                </div>

                <div className={styles.stack}>
                    <p>
                        Base paragraph metni `--font-size-base` ve `--line-height-base`
                        değerlerini kullanır. İçerik yoğun ekranlarda bu satır ritmi,
                        okunabilirliği korur.
                    </p>
                    <p className={styles.typeLead}>
                        Lead metin, section girişlerinde vurgu için kullanılır.
                    </p>
                    <p className={styles.typeCaption}>
                        Caption metin; not, yardımcı bilgi ve düşük öncelikli açıklamalar
                        için tasarlanmıştır.
                    </p>
                    <p className={styles.typeCode}>type-code: body.fontSize = 1rem</p>
                    <blockquote className={styles.quote}>
                        Typography is the craft of endowing human language with a durable
                        visual form.
                    </blockquote>

                    <CodeBlock
                        language="tsx"
                        code={quoteCodeSample}
                        showLineNumbers
                        allowCopy
                        className={styles.codeSample}
                    />
                </div>
            </Card>

            <Card className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <h2>Font Families</h2>
                    <p>Üründe kullanılan ailelerin örnek cümleleri ve ağırlık varyasyonları.</p>
                </div>

                <div className={styles.fontGrid}>
                    {fontFamilies.map((font) => (
                        <FontSample key={font.title} title={font.title} family={font.family} />
                    ))}
                </div>
            </Card>
        </div>
    )
}

function HeadingPreview({
    tag,
    text,
}: {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    text: string
}) {
    if (tag === 'h1') return <h1>{text}</h1>
    if (tag === 'h2') return <h2>{text}</h2>
    if (tag === 'h3') return <h3>{text}</h3>
    if (tag === 'h4') return <h4>{text}</h4>
    if (tag === 'h5') return <h5>{text}</h5>
    return <h6>{text}</h6>
}

function FontSample({ title, family }: { title: string; family: string }) {
    return (
        <div className={styles.fontCard}>
            <h3 className={styles.fontName}>{title}</h3>

            <div
                className={styles.fontSample}
                style={{ '--sample-font': family } as React.CSSProperties}
            >
                <p>The quick brown fox jumps over the lazy dog.</p>
                <p style={{ fontWeight: 500 }}>Medium — The quick brown fox.</p>
                <p style={{ fontWeight: 700 }}>Bold — The quick brown fox.</p>
                <p style={{ fontStyle: 'italic' }}>Italic — The quick brown fox.</p>
            </div>

            <p className={styles.meta}>{family}</p>
        </div>
    )
}
