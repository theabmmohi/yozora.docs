import { useEffect, useRef, useState } from "react"
import type { CSSProperties, PointerEvent } from "react"
import { Yozora } from "yozora"
import type { YozoraTab } from "yozora"
import { ArrowRight, BookOpen } from "lucide-react"
import { homeFeatures, phoneTabs, stats, words } from "../data"
import type { PageId } from "../data"
import { Install } from "../components/Docs"
import { CountUp, Reveal, Stars } from "../components/Motion"

const rise = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties

function PhoneDemo({ active }: { active: boolean }) {
  const [tab, setTab] = useState("chats")
  const [auto, setAuto] = useState(true)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (!auto || !active) return
    const id = setInterval(() => setTab((cur) => phoneTabs[(phoneTabs.findIndex(([key]) => key === cur) + 1) % phoneTabs.length][0]), 2000)
    return () => clearInterval(id)
  }, [auto, active])

  useEffect(() => () => clearTimeout(timer.current), [])

  const tabs: YozoraTab[] = phoneTabs.map(([id, label, Icon]) => ({
    id,
    label,
    icon: <Icon strokeWidth={1.8} />,
    activeIcon: <Icon strokeWidth={1.8} fill="currentColor" />
  }))
  const title = phoneTabs.find(([key]) => key === tab)![1]

  const pick = (id: string) => {
    setTab(id)
    setAuto(false)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAuto(true), 6000)
  }

  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-title" key={title}>
          {title}
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div className="skeleton" key={i} style={{ animationDelay: `${i * 150}ms` }}>
            <i />
            <span />
          </div>
        ))}
      </div>
      <div className="phone-bar">
        <Yozora aria-label="Live demo" tabs={tabs} value={tab} onValueChange={pick} position="static" fullWidth theme="dark" accent="#a78bfa" />
      </div>
    </div>
  )
}

export function Home({ go, barPosition }: { go: (id: PageId) => void; barPosition: string }) {
  const hero = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = hero.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const glow = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div className="home" data-bar={barPosition}>
      <section className="hero-home" ref={hero} data-paused={!visible}>
        <Stars active={visible} />
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="tag rise" style={rise(0)}>
              夜空 · night sky
            </div>
            <h1 className="title rise" style={rise(100)}>
              yozora
            </h1>
            <p className="lead rise" style={rise(220)}>
              A fluid, draggable floating tab bar for React. Tap to switch. Hold and slide to glide.
            </p>
            <div className="cta rise" style={rise(340)}>
              <button className="btn-primary" onClick={() => go("ground")}>
                Try the playground <ArrowRight size={16} />
              </button>
              <button className="btn-ghost" onClick={() => go("docs")}>
                <BookOpen size={16} /> Read the docs
              </button>
            </div>
            <div className="rise" style={rise(460)}>
              <Install />
            </div>
          </div>
          <div className="rise" style={rise(300)}>
            <PhoneDemo active={visible} />
          </div>
        </div>
      </section>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...words, ...words].map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      </div>
      <section className="section">
        <Reveal>
          <h2>Everything a native tab bar feels like</h2>
        </Reveal>
        <div className="fgrid">
          {homeFeatures.map(([Icon, title, text], i) => (
            <Reveal key={title} delayMs={i * 70}>
              <div className="fcard" onPointerMove={glow}>
                <div className="ico">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <div className="stats">
        {stats.map(([value, label], i) => (
          <Reveal key={label} delayMs={i * 80}>
            <div className="stat">
              <b>
                <CountUp to={value} />
              </b>
              <span>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <section className="section">
        <Reveal>
          <div className="final-card">
            <h2>Give your app the native feel</h2>
            <p>One import, one component, no dependencies.</p>
            <div className="cta">
              <button className="btn-primary" onClick={() => go("ground")}>
                Open the playground <ArrowRight size={16} />
              </button>
            </div>
            <Install />
          </div>
        </Reveal>
      </section>
    </div>
  )
}
