import { typographyFontVariables } from '@/app/fonts.typography'

export default function TypographySystemPage() {
    return (
        <div className={typographyFontVariables} style={{ padding: '48px', maxWidth: 960 }}>
            {/* ======================================================
                PAGE TITLE
            ====================================================== */}
            <header style={{ marginBottom: 64 }}>
                <h1 style={{ marginBottom: 8 }}>Typography System</h1>
                <p style={{ opacity: 0.7 }}>
                    Font families, hierarchy and text styles used across the UI.
                </p>
            </header>

            {/* ======================================================
                HEADINGS
            ====================================================== */}
            <section style={{ marginBottom: 64 }}>
                <h2>Headings</h2>

                <div style={{ marginTop: 24 }}>
                    <h1>Heading 1 – The quick brown fox</h1>
                    <h2>Heading 2 – The quick brown fox</h2>
                    <h3>Heading 3 – The quick brown fox</h3>
                    <h4>Heading 4 – The quick brown fox</h4>
                    <h5>Heading 5 – The quick brown fox</h5>
                    <h6>Heading 6 – The quick brown fox</h6>
                </div>
            </section>

            {/* ======================================================
                PARAGRAPHS
            ====================================================== */}
            <section style={{ marginBottom: 64 }}>
                <h2>Paragraphs</h2>

                <p>
                    This is a standard paragraph. The quick brown fox jumps over
                    the lazy dog. Used for most body content.
                </p>

                <p style={{ fontSize: 14, opacity: 0.75 }}>
                    Small / secondary text. Used for hints, labels or metadata.
                </p>
            </section>

            {/* ======================================================
                BLOCKQUOTE
            ====================================================== */}
            <section style={{ marginBottom: 64 }}>
                <h2>Quote</h2>

                <blockquote
                    style={{
                        margin: '24px 0',
                        paddingLeft: 16,
                        borderLeft: '4px solid currentColor',
                        opacity: 0.8,
                        fontStyle: 'italic',
                    }}
                >
                    Typography is the craft of endowing human language with a
                    durable visual form.
                </blockquote>
            </section>

            {/* ======================================================
                FONT FAMILIES
            ====================================================== */}
            <section style={{ marginBottom: 64 }}>
                <h2>Font Families</h2>

                <div style={{ marginTop: 32, display: 'grid', gap: 32 }}>
                    <FontSample
                        title="Inter (UI / Base)"
                        family="var(--font-inter)"
                    />

                    <FontSample
                        title="DM Sans"
                        family="var(--font-dm-sans)"
                    />

                    <FontSample
                        title="Manrope"
                        family="var(--font-manrope)"
                    />

                    <FontSample
                        title="Plus Jakarta Sans"
                        family="var(--font-plus-jakarta-sans)"
                    />

                    <FontSample
                        title="Quicksand"
                        family="var(--font-quicksand)"
                    />

                    <FontSample
                        title="Bona Nova (Serif)"
                        family="var(--font-bona-nova)"
                    />

                    <FontSample
                        title="Roboto Serif"
                        family="var(--font-roboto-serif)"
                    />

                    <FontSample
                        title="Bebas Neue (Display)"
                        family="var(--font-bebas-neue)"
                    />

                    <FontSample
                        title="Bayon (Brand)"
                        family="var(--font-bayon)"
                    />
                </div>
            </section>
        </div>
    );
}

/* ======================================================
   HELPERS
====================================================== */

function FontSample({
    title,
    family,
}: {
    title: string;
    family: string;
}) {
    return (
        <div>
            <h3 style={{ marginBottom: 8 }}>{title}</h3>

            <div style={{ fontFamily: family, lineHeight: 1.5 }}>
                <p>The quick brown fox jumps over the lazy dog.</p>
                <p style={{ fontWeight: 500 }}>
                    Medium – The quick brown fox jumps over the lazy dog.
                </p>
                <p style={{ fontWeight: 700 }}>
                    Bold – The quick brown fox jumps over the lazy dog.
                </p>
                <p style={{ fontStyle: 'italic' }}>
                    Italic – The quick brown fox jumps over the lazy dog.
                </p>
            </div>
        </div>
    );
}
