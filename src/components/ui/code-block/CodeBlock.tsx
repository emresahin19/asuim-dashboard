"use client"

import { useMemo, useState } from 'react'
import { clsx } from '@/utils'
import styles from './code-block.module.scss'

type CodeBlockProps = {
  code: string
  language?: string
  className?: string
  showLineNumbers?: boolean
  allowCopy?: boolean
}

const KEYWORDS = new Set([
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'default',
  'else',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'import',
  'interface',
  'let',
  'new',
  'null',
  'return',
  'switch',
  'throw',
  'true',
  'try',
  'type',
  'undefined',
  'var',
  'while',
])

const TOKEN_REGEX =
  /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?|\/?>|=>|=|\{|\}|\(|\)|\[|\]|:|;|,|\.|\b\d+(?:\.\d+)?\b|[a-zA-Z_$][\w$-]*)/gm

const HTML_ATTRS = new Set([
  'className',
  'class',
  'id',
  'style',
  'type',
  'name',
  'value',
  'placeholder',
  'href',
  'src',
  'alt',
  'role',
  'title',
  'disabled',
  'checked',
  'defaultValue',
  'onClick',
  'onChange',
  'onSubmit',
])

function isStringToken(token: string) {
  return (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'")) ||
    (token.startsWith('`') && token.endsWith('`'))
  )
}

function isTypeToken(token: string) {
  return /^[A-Z][A-Za-z0-9_$]*$/.test(token)
}

function isTagNameToken(token: string) {
  return /^[A-Za-z][\w-]*$/.test(token)
}

function renderHighlightedLine(line: string, lineIndex: number) {
  const tokens: { value: string; start: number; end: number }[] = []
  const matches = line.matchAll(TOKEN_REGEX)

  for (const match of matches) {
    const value = match[0]
    const start = match.index ?? 0
    tokens.push({ value, start, end: start + value.length })
  }

  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let inTag = false
  let expectTagName = false

  for (let index = 0; index < tokens.length; index += 1) {
    const current = tokens[index]
    const next = tokens[index + 1]
    const { value, start } = current

    if (start > lastIndex) {
      nodes.push(line.slice(lastIndex, start))
    }

    let tokenClass = styles.token

    if (value.startsWith('//')) {
      tokenClass = styles.comment
    } else if (isStringToken(value)) {
      tokenClass = styles.string
    } else if (!Number.isNaN(Number(value))) {
      tokenClass = styles.number
    } else if (KEYWORDS.has(value)) {
      tokenClass = styles.keyword
    } else if (value === '<' || value === '</') {
      tokenClass = styles.punctuation
      inTag = true
      expectTagName = true
    } else if (value === '>' || value === '/>') {
      tokenClass = styles.punctuation
      inTag = false
      expectTagName = false
    } else if (
      value === '=' ||
      value === '=>' ||
      value === '{' ||
      value === '}' ||
      value === '(' ||
      value === ')' ||
      value === '[' ||
      value === ']' ||
      value === ':' ||
      value === ';' ||
      value === ',' ||
      value === '.'
    ) {
      tokenClass = styles.punctuation
    } else if (inTag && expectTagName && isTagNameToken(value)) {
      tokenClass = styles.tag
      expectTagName = false
    } else if (
      inTag &&
      (HTML_ATTRS.has(value) || value.startsWith('data-') || value.startsWith('aria-') || /^on[A-Z]/.test(value) || next?.value === '=')
    ) {
      tokenClass = styles.attribute
    } else if (isTypeToken(value)) {
      tokenClass = styles.type
    } else if (next?.value === '(') {
      tokenClass = styles.function
    }

    nodes.push(
      <span className={tokenClass} key={`${lineIndex}-${index}`}>
        {value}
      </span>,
    )

    lastIndex = start + value.length
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex))
  }

  return nodes.length > 0 ? nodes : [' ']
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showLineNumbers = true,
  allowCopy = true,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const lines = useMemo(() => code.replace(/\t/g, '  ').split('\n'), [code])

  const handleCopy = async () => {
    if (!allowCopy) {
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)

      window.setTimeout(() => {
        setIsCopied(false)
      }, 1200)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.header}>
        <span className={styles.lang}>{language}</span>
        {allowCopy && (
          <button
            className={styles.copyButton}
            onClick={handleCopy}
            type="button"
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>

      <pre className={styles.pre}>
        <code>
          {lines.map((line, index) => (
            <div className={styles.line} key={`line-${index}`}>
              {showLineNumbers && (
                <span className={styles.lineNumber}>{index + 1}</span>
              )}
              <span className={styles.lineContent}>
                {renderHighlightedLine(line, index)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
