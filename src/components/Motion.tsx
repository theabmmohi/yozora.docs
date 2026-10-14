import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { reducedMotion } from "../hooks"

type Comet = { x: number; y: number; vx: number; vy: number; life: number }

export function Reveal({ children, delayMs = 0 }: { children: ReactNode; delayMs?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") return setShown(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal${shown ? " in" : ""}`} style={{ transitionDelay: `${delayMs}ms` }}>
      {children}
    </div>
  )
}

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const run = () => {
      if (reducedMotion() || to === 0) return setValue(to)
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / 1200, 1)
        setValue(Math.round(to * (1 - (1 - p) ** 3)))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    if (typeof IntersectionObserver === "undefined") return run()
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])
  return <span ref={ref}>{value}</span>
}

export function Stars({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const wake = useRef(() => {})

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const still = reducedMotion()
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4
    }))
    let comet: Comet | null = null
    let nextComet = performance.now() + 1500
    let w = 0
    let h = 0
    let raf = 0

    const draw = (t: number) => {
      if (!activeRef.current && !still) {
        raf = 0
        return
      }
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "#cfe2ff"
      for (const s of stars) {
        ctx.globalAlpha = still ? 0.7 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((t / 1000) * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      if (still) return
      if (!comet && t > nextComet) {
        comet = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.35, vx: 5 + Math.random() * 3, vy: 2.4 + Math.random() * 1.6, life: 1 }
        nextComet = t + 2500 + Math.random() * 3500
      }
      if (comet) {
        const len = Math.hypot(comet.vx, comet.vy)
        const tx = comet.x - (comet.vx / len) * 90
        const ty = comet.y - (comet.vy / len) * 90
        const grad = ctx.createLinearGradient(comet.x, comet.y, tx, ty)
        grad.addColorStop(0, `rgba(255,255,255,${comet.life})`)
        grad.addColorStop(1, "rgba(255,255,255,0)")
        ctx.globalAlpha = 1
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.moveTo(comet.x, comet.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        comet.x += comet.vx
        comet.y += comet.vy
        comet.life -= 0.012
        if (comet.life <= 0 || comet.x > w + 100 || comet.y > h + 100) comet = null
      }
      raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (still) requestAnimationFrame(draw)
    }

    wake.current = () => {
      if (!raf && !still) raf = requestAnimationFrame(draw)
    }
    resize()
    wake.current()
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    activeRef.current = active
    if (active) wake.current()
  }, [active])

  return <canvas ref={ref} className="stars" aria-hidden="true" />
}
