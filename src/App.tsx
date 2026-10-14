import type { Config, PageId } from "./data"
import type { CSSProperties } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { Ground } from "./pages/Ground"
import { defaults, pages } from "./data"
import { Others } from "./pages/Others"
import { tabsFor } from "./playground"
import { Home } from "./pages/Home"
import { Docs } from "./pages/Docs"
import { Yozora } from "yozora"

export type LogEntry = { n: number; id: string; at: string }

const pathOf = (id: PageId) => (id === "home" ? "/" : `/${id}`)

export function App() {
  const [config, setConfig] = useState<Config>(defaults)
  const [events, setEvents] = useState<LogEntry[]>([])
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const update = (patch: Partial<Config>) => setConfig((prev) => ({ ...prev, ...patch }))

  const segment = pathname.split("/")[1]
  const page = (pages.find(([id]) => id === segment)?.[0] ?? "home") as PageId

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const choose = (id: string) => {
    navigate(pathOf(id as PageId))
    setEvents((prev) => [{ n: (prev[0]?.n ?? 0) + 1, id, at: new Date().toLocaleTimeString([], { hour12: false }) }, ...prev].slice(0, 6))
  }

  const wrap = (children: React.ReactNode) => (
    <div className="wrap" data-bar={config.position}>
      {children}
    </div>
  )

  return (
    <>
      <Routes>
        <Route path="/" element={<Home go={choose} barPosition={config.position} />} />
        <Route path="/ground" element={wrap(<Ground config={config} update={update} reset={() => setConfig(defaults)} events={events} />)} />
        <Route path="/others" element={wrap(<Others />)} />
        <Route path="/docs" element={wrap(<Docs />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Yozora
        aria-label="Sections"
        tabs={tabsFor(config)}
        defaultValue={page}
        onValueChange={choose}
        fullWidth={config.fullWidth}
        theme={config.theme}
        semantics={config.semantics}
        position={config.position}
        accent={config.accent || undefined}
        holdDelay={config.holdDelay}
        drift={config.drift ? { x: config.driftX, y: config.driftY } : false}
        haptics={config.haptics ? { tick: config.tick, arm: config.arm } : false}
        unstyled={config.unstyled}
        style={config.radius === 999 ? undefined : ({ "--yozora-radius": `${config.radius}px` } as CSSProperties)}
      />
    </>
  )
}
