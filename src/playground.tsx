import type { YozoraTab } from "yozora"
import type { Config } from "./data"
import { pages } from "./data"

export function tabsFor(config: Config): YozoraTab[] {
  return pages.map(([id, label, Icon]) => {
    const base = {
      id,
      icon: <Icon strokeWidth={1.8} />,
      activeIcon: config.filled ? <Icon strokeWidth={1.8} fill="currentColor" /> : undefined,
      disabled: config.disableOthers && id === "others"
    }
    return config.labels ? { ...base, label } : { ...base, "aria-label": label }
  })
}

export function snippetFor(config: Config) {
  const props = ["tabs={tabs}", "value={page}", "onValueChange={setPage}"]
  if (config.fullWidth) props.push("fullWidth")
  if (config.theme !== "system") props.push(`theme="${config.theme}"`)
  if (config.semantics !== "navigation") props.push(`semantics="${config.semantics}"`)
  if (config.position !== "bottom") props.push(`position="${config.position}"`)
  if (config.accent) props.push(`accent="${config.accent}"`)
  if (config.holdDelay !== 250) props.push(`holdDelay={${config.holdDelay}}`)
  if (!config.drift) props.push("drift={false}")
  else if (config.driftX !== 3 || config.driftY !== 5) props.push(`drift={{ x: ${config.driftX}, y: ${config.driftY} }}`)
  if (!config.haptics) props.push("haptics={false}")
  else if (config.tick !== 50 || config.arm !== 75) props.push(`haptics={{ tick: ${config.tick}, arm: ${config.arm} }}`)
  if (config.unstyled) props.push("unstyled")
  if (config.radius !== 999) props.push(`style={{ "--yozora-radius": "${config.radius}px" }}`)
  return `<Yozora\n  ${props.join("\n  ")}\n/>`
}
