'use client'

import { useState } from 'react'

import { useTheme } from '@/context'
import { Icon } from '@/components'
import { getThemeSwatchStyle } from '@/context/theme/theme.css-vars'

import styles from './theme-settings.module.scss'
import { colors, palettes } from '@/config'
import SettingsIcon from '@/components/ui/icon/icons/Settings'

export function ThemeSettings() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <button
        className={styles.trigger}
        data-open={open}
        aria-expanded={open}
        aria-label="Toggle theme settings"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon icon={SettingsIcon} size={22} />
      </button>

      {open && (
        <aside className={styles.root}>
          <header className={styles.header}>
            <h3>Appearance</h3>
            <p>Choose your visual preferences</p>
          </header>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h4>Theme</h4>
              <span>Mode</span>
            </div>
            <div className={styles.segmented}>
              <button
                className={styles.optionButton}
                data-active={theme.scheme === 'light'}
                onClick={() => setTheme({ scheme: 'light' })}
              >
                Light
              </button>
              <button
                className={styles.optionButton}
                data-active={theme.scheme === 'dark'}
                onClick={() => setTheme({ scheme: 'dark' })}
              >
                Dark
              </button>
            </div>
          </section>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h4>Palette</h4>
              <span>Base tones</span>
            </div>
            <div className={styles.swatchGrid}>
              {palettes.map(p => (
                <button
                  key={p}
                  className={styles.swatchButton}
                  data-active={theme.palette === p}
                  onClick={() => setTheme({ palette: p })}
                  style={getThemeSwatchStyle(p)}
                >
                  <span>{p}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h4>Primary</h4>
              <span>Accent color</span>
            </div>
            <div className={styles.swatchGrid}>
              {colors.map(c => (
                <button
                  key={c}
                  className={styles.swatchButton}
                  data-active={theme.primary === c}
                  onClick={() => setTheme({ primary: c })}
                  style={getThemeSwatchStyle(c)}
                >
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h4>Direction</h4>
              <span>Layout flow</span>
            </div>
            <div className={styles.segmented}>
              <button
                className={styles.optionButton}
                data-active={theme.direction === 'ltr'}
                onClick={() => setTheme({ direction: 'ltr' })}
              >
                LTR
              </button>
              <button
                className={styles.optionButton}
                data-active={theme.direction === 'rtl'}
                onClick={() => setTheme({ direction: 'rtl' })}
              >
                RTL
              </button>
            </div>
          </section>
        </aside>
      )}

    </>
  )
}
