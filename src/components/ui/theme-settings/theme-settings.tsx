'use client'

import { useState } from 'react'
import { useTheme } from '@/context/theme/ThemeContext'
import styles from './theme-settings.module.scss'
import { Icon } from '@/components/ui/icon/icon'
import { Palette, PrimaryColor } from '@/context/theme/types'

const colors: PrimaryColor[] = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
const palettes: Palette[] = ['slate', 'gray', 'zinc', 'neutral', 'stone']

export function ThemeSettings() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="settings" size={22} />
      </button>

      {open && (
        <aside className={styles.root}>
          <header className={styles.header}>
            <h3>Appearance</h3>
          </header>

          <section className={styles.section}>
            <h4>Theme</h4>
            <div className={styles.row}>
              <button className={styles.button} onClick={() => setTheme({ scheme: 'light' })}>Light</button>
              <button className={styles.button} onClick={() => setTheme({ scheme: 'dark' })}>Dark</button>
            </div>
          </section>

          <section className={styles.section}>
            <h4>Palette</h4>
            <div className={styles.grid}>
              {palettes.map(p => (
                <button
                  key={p}
                  className={styles.button}
                  data-active={theme.palette === p}
                  onClick={() => setTheme({ palette: p })}
                  style={{
                    background: `var(--color-${p}-200)`,
                    color: `var(--color-${p}-800)`,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h4>Primary</h4>
            <div className={styles.grid}>
              {colors.map(c => (
                <button
                  key={c}
                  className={styles.button}
                  data-active={theme.primary === c}
                  onClick={() => setTheme({ primary: c })}
                  style={{
                    background: `var(--color-${c}-200)`,
                    color: `var(--color-${c}-800)`,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h4>Direction</h4>
            <div className={styles.row}>
              <button className={styles.button} onClick={() => setTheme({ direction: 'ltr' })}>LTR</button>
              <button className={styles.button} onClick={() => setTheme({ direction: 'rtl' })}>RTL</button>
            </div>
          </section>
        </aside>
      )}

    </>
  )
}
