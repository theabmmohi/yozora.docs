import { repoUrl, swatches, version } from "../data"
import type { Config } from "../data"
import type { LogEntry } from "../App"
import { highlight } from "../highlight"
import { useCopy } from "../hooks"
import { snippetFor } from "../playground"
import { Row, Seg, Slider, Switch } from "../components/Controls"

type Props = { config: Config; update: (patch: Partial<Config>) => void; reset: () => void; events: LogEntry[] }

function RepoLink() {
  return (
    <div className="repo">
      <a className="repo-link" href={repoUrl} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        theabmmohi/yozora
      </a>
    </div>
  )
}

export function Ground({ config, update, reset, events }: Props) {
  const snippet = snippetFor(config)
  const [copied, copy] = useCopy(snippet)

  return (
    <>
      <RepoLink />
      <p className="hint">
        The bar you're using is a live Yozora (<code>yozora@{version}</code>). Tap a tab, or hold one and slide across the others. The page changes only when you let go. Everything below reconfigures this very bar.
      </p>
      <div className="card">
        <h3>Try a prop</h3>
        <Switch label="Disable the Others tab" checked={config.disableOthers} onChange={(disableOthers) => update({ disableOthers })} />
        <p className="hint">
          A disabled tab can't be selected by touch or keyboard. It's the <code>disabled: true</code> field on a tab.
        </p>
      </div>
      <div className="card">
        <h3>Events</h3>
        <ul className="log">
          {events.length === 0 && <li>onValueChange fires here. Slide across several tabs: it fires once, on release.</li>}
          {events.map((entry) => (
            <li key={entry.n}>
              {entry.at} onValueChange(<b>"{entry.id}"</b>)
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3>Look</h3>
        <Switch label="Labels" checked={config.labels} onChange={(labels) => update({ labels })} />
        <Switch label="Filled icon when selected" checked={config.filled} onChange={(filled) => update({ filled })} />
        <Switch label="fullWidth" checked={config.fullWidth} onChange={(fullWidth) => update({ fullWidth })} />
        <Row label="theme">
          <Seg value={config.theme} options={["light", "dark", "system"]} onChange={(theme) => update({ theme })} />
        </Row>
        <Row label="position">
          <Seg value={config.position} options={["bottom", "top"]} onChange={(position) => update({ position })} />
        </Row>
        <Row label="accent">
          <div className="swatches">
            {swatches.map((color) => (
              <button
                key={color || "default"}
                className="swatch"
                aria-label={color || "default accent"}
                aria-pressed={config.accent === color}
                style={{ background: color || "linear-gradient(135deg, #1d8cf0 50%, #6cb6ff 50%)" }}
                onClick={() => update({ accent: color })}
              />
            ))}
          </div>
        </Row>
        <Slider label="--yozora-radius" value={config.radius} min={0} max={999} unit="px" onChange={(radius) => update({ radius })} />
        <Switch label="unstyled" checked={config.unstyled} onChange={(unstyled) => update({ unstyled })} />
        {config.unstyled && <p className="hint">Unstyled keeps only behavior: no colors, padding or blur. Use Reset to get the look back.</p>}
      </div>
      <div className="card">
        <h3>Behavior</h3>
        <Row label="semantics">
          <Seg value={config.semantics} options={["navigation", "tabs"]} onChange={(semantics) => update({ semantics })} />
        </Row>
        <Slider label="holdDelay" value={config.holdDelay} min={100} max={600} step={10} unit="ms" onChange={(holdDelay) => update({ holdDelay })} />
        <Switch label="drift" checked={config.drift} onChange={(drift) => update({ drift })} />
        {config.drift && (
          <>
            <Slider label="drift x" value={config.driftX} min={0} max={12} unit="px" onChange={(driftX) => update({ driftX })} />
            <Slider label="drift y" value={config.driftY} min={0} max={14} unit="px" onChange={(driftY) => update({ driftY })} />
          </>
        )}
        <Switch label="haptics (Android)" checked={config.haptics} onChange={(haptics) => update({ haptics })} />
        {config.haptics && (
          <>
            <Slider label="tick" value={config.tick} min={5} max={150} unit="ms" onChange={(tick) => update({ tick })} />
            <Slider label="arm" value={config.arm} min={5} max={250} unit="ms" onChange={(arm) => update({ arm })} />
          </>
        )}
      </div>
      <div className="card">
        <h3>Code</h3>
        <pre>
          <button className="copy" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </button>
          <code>{highlight(snippet)}</code>
        </pre>
        <button className="btn" onClick={reset}>
          Reset all
        </button>
      </div>
    </>
  )
}
