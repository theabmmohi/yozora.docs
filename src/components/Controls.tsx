import type { ReactNode } from "react"

export function Seg<T extends string>({ value, options, onChange }: { value: T; options: T[]; onChange: (next: T) => void }) {
  return (
    <div className="seg">
      {options.map((option) => (
        <button key={option} aria-pressed={option === value} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}
    </div>
  )
}

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="row">
      <span>{label}</span>
      {children}
    </div>
  )
}

export function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <Row label={label}>
      <button className="switch" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} />
    </Row>
  )
}

type SliderProps = { label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (next: number) => void }

export function Slider({ label, value, min, max, step = 1, unit = "", onChange }: SliderProps) {
  return (
    <Row label={label}>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <output>
        {value}
        {unit}
      </output>
    </Row>
  )
}
