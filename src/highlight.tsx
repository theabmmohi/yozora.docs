import type { ReactNode } from "react"

const rules: [string, RegExp][] = [
  ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
  ["string", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/],
  ["tag", /<\/?[A-Z][\w.]*/],
  ["number", /\b\d+(?:\.\d+)?(?:px|ms|vw|vh|rem|em)?\b|#[0-9a-fA-F]{3,8}\b/],
  ["keyword", /\b(?:import|from|export|const|let|return|function|default|type|as|new|async|await|if|else)\b/],
  ["bool", /\b(?:true|false|null|undefined)\b/],
  ["var", /--[\w-]+/],
  ["fn", /\b[A-Za-z_$][\w$]*(?=\()/],
  ["attr", /[A-Za-z_][\w:-]*(?==)/],
  ["prop", /[A-Za-z_-][\w-]*(?=\s*:(?!:))/]
]

const pattern = new RegExp(rules.map(([, re]) => `(${re.source})`).join("|"), "g")

export function highlight(text: string) {
  const out: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const at = match.index ?? 0
    if (at > last) out.push(text.slice(last, at))
    const kind = rules[rules.findIndex((_, i) => match[i + 1] !== undefined)][0]
    out.push(
      <span key={at} className={`tk-${kind}`}>
        {match[0]}
      </span>
    )
    last = at + match[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
