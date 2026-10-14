import type { ReactNode } from "react"
import { highlight } from "../highlight"
import { useCopy } from "../hooks"

export function Code({ text }: { text: string }) {
  const [copied, copy] = useCopy(text)
  return (
    <pre>
      <button className="copy" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
      <code>{highlight(text)}</code>
    </pre>
  )
}

export function Install() {
  const [copied, copy] = useCopy("npm i yozora")
  return (
    <div className="install">
      npm i yozora
      <button onClick={copy}>{copied ? "Copied" : "Copy"}</button>
    </div>
  )
}

export function Table({ head, rows, codeColumns = [0] }: { head: string[]; rows: string[][]; codeColumns?: number[] }) {
  const last = head.length - 1
  return (
    <div className="scroll">
      <table>
        <thead>
          <tr>
            {head.map((title, i) => (
              <th key={title} className={i === last ? "desc" : undefined}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i} className={i === last ? "desc" : undefined}>
                  {codeColumns.includes(i) && cell ? <code className={/\s/.test(cell) ? undefined : "nw"}>{cell}</code> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="doc" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export function Shield({ alt, href, src }: { alt: string; href: string; src: string }) {
  return (
    <a className="shield-link" href={href} target="_blank" rel="noreferrer">
      <img className="shield-img" src={src} alt={alt} height={20} />
    </a>
  )
}
