import { Accessibility, BookOpen, BrickWall, CircleCheck, Feather, FlaskConical, Hand, House, LayoutGrid, MessageCircle, Palette, PanelBottom, Phone, Shapes, SunMoon, User, Users, Vibrate, WavesHorizontal } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type Config = {
  labels: boolean
  filled: boolean
  disableOthers: boolean
  fullWidth: boolean
  theme: "light" | "dark" | "system"
  semantics: "navigation" | "tabs"
  position: "bottom" | "top"
  accent: string
  holdDelay: number
  drift: boolean
  driftX: number
  driftY: number
  haptics: boolean
  tick: number
  arm: number
  unstyled: boolean
  radius: number
}
export type Repo = { name: string; description: string; language: string | null; stars: number; pushed: string; url: string }
export type PageId = "home" | "ground" | "others" | "docs"

export const npmUrl = "https://www.npmjs.com/package/yozora"
export const repoUrl = "https://github.com/theabmmohi/yozora"
export const version = "1.0.0"

export const defaults: Config = {
  labels: true,
  filled: true,
  disableOthers: false,
  fullWidth: true,
  theme: "system",
  semantics: "navigation",
  position: "bottom",
  accent: "",
  holdDelay: 250,
  drift: true,
  driftX: 3,
  driftY: 5,
  haptics: true,
  tick: 50,
  arm: 75,
  unstyled: false,
  radius: 999
}

export const pages: [PageId, string, LucideIcon][] = [
  ["home", "Home", House],
  ["ground", "Ground", FlaskConical],
  ["others", "Others", LayoutGrid],
  ["docs", "Docs", BookOpen]
]

export const swatches = ["", "#f43f5e", "#f59e0b", "#10b981", "#8b5cf6"]

export const languageColors: Record<string, string> = { TypeScript: "#3178c6", JavaScript: "#f1e05a", PHP: "#4f5d95", HTML: "#e34c26", Vue: "#41b883" }

export const repos: Repo[] = [
  { name: "theabmmohi", description: "A simple repo !", language: null, stars: 0, pushed: "2026-10-13", url: "https://github.com/theabmmohi/theabmmohi" },
  { name: "aoi", description: "", language: "TypeScript", stars: 0, pushed: "2026-10-11", url: "https://github.com/theabmmohi/aoi" },
  { name: "bohudur", description: "TypeScript SDK for the Bohudur payment automation software", language: "TypeScript", stars: 1, pushed: "2026-09-29", url: "https://github.com/theabmmohi/bohudur" },
  { name: "xanlok", description: "", language: "PHP", stars: 0, pushed: "2026-09-29", url: "https://github.com/theabmmohi/xanlok" },
  { name: "bohudur-proxy", description: "", language: "TypeScript", stars: 0, pushed: "2026-09-28", url: "https://github.com/theabmmohi/bohudur-proxy" },
  { name: "QLens", description: "", language: "JavaScript", stars: 0, pushed: "2026-08-31", url: "https://github.com/theabmmohi/QLens" },
  { name: "waqt", description: "", language: "JavaScript", stars: 0, pushed: "2026-08-13", url: "https://github.com/theabmmohi/waqt" },
  { name: "FetchIt", description: "", language: "TypeScript", stars: 0, pushed: "2026-08-10", url: "https://github.com/theabmmohi/FetchIt" },
  { name: "mcp32", description: "", language: "HTML", stars: 0, pushed: "2026-08-08", url: "https://github.com/theabmmohi/mcp32" },
  {
    name: "samsung-DeX-launcher",
    description: "A lightweight utility app that forces open the native Samsung DeX settings panel on devices where the option is missing or hidden by default",
    language: "HTML",
    stars: 0,
    pushed: "2026-07-06",
    url: "https://github.com/theabmmohi/samsung-DeX-launcher"
  },
  { name: "espxrfid", description: "I Think Its The Ultimate ESP8266 x MFRC522 🙂", language: "Vue", stars: 0, pushed: "2026-06-02", url: "https://github.com/theabmmohi/espxrfid" }
]

export const docFeatures: [LucideIcon, string, string][] = [
  [PanelBottom, "Floating glass bar", "Blur, a soft shadow and a safe-area-aware position."],
  [Hand, "Tap, or hold and slide", "Tap to select. Hold to move the highlight under your finger."],
  [BrickWall, "Springy, never leaves the bar", "The pill squashes against the bar's edge like a wall."],
  [Vibrate, "Haptics and drift", "Vibration ticks on Android and a subtle drift away from your finger."],
  [CircleCheck, "Commit on release", "onValueChange fires once, not for every tab you slide over."],
  [Shapes, "Outlined and filled icons", "Icons crossfade when a tab is selected."],
  [SunMoon, "Themes and accent", "Light, dark or system, plus one prop for your accent color."],
  [Accessibility, "Accessible", "Navigation or ARIA tabs semantics, keyboard support and RTL."],
  [Feather, "Zero dependencies", "React is the only peer. Easy to restyle."]
]

export const feelRows = [
  ["Tap a tab", "It is selected when you lift your finger."],
  ["Press the selected tab and drag", "Slide mode starts instantly. The pill follows your finger."],
  ["Hold another tab (about 250 ms, without moving)", "The pill moves under your finger and slide mode starts, with a haptic tick."],
  ["Swipe from an unselected tab without holding", "Nothing is selected. The touch is a swipe, not a tap."],
  ["Slide across tabs", "Highlight and icons preview each tab and tick as you cross it. Nothing is committed yet."],
  ["Lift your finger", "The tab under it is selected, onValueChange fires once, and the pill springs into place."],
  ["Drag past either end", "The pill squashes against the bar's edge and springs back. It never crosses it."],
  ["Cancel the touch (the system interrupts it)", "Nothing is committed."]
]

export const propRows = [
  ["tabs", "YozoraTab[]", "required", "The tabs. See the Tabs table below."],
  ["value", "string", "", "Selected tab id (controlled)."],
  ["defaultValue", "string", "first enabled tab", "Initial tab id when uncontrolled."],
  ["onValueChange", "(id: string) => void", "", "Called once when a selection is committed: tap, release after sliding, or keyboard."],
  ["semantics", '"navigation" | "tabs"', '"navigation"', "How the bar is announced to assistive tech."],
  ["theme", '"light" | "dark" | "system"', '"system"', "system follows prefers-color-scheme."],
  ["accent", "string", "#1d8cf0 / #6cb6ff", "Any CSS color. The pill and glow derive from it."],
  ["fullWidth", "boolean", "false", "Telegram style: fills its width, tabs share it equally. Off, the bar hugs its content like a compact gallery bar."],
  ["position", '"bottom" | "top" | "static"', '"bottom"', "static renders in normal flow instead of fixing to the screen."],
  ["offset", "number | string", "16", "Distance from the screen edge. Number = px, string = any CSS length. Safe-area insets are added."],
  ["holdDelay", "number", "250", "Ms to hold an unselected tab before slide mode starts."],
  ["drift", "boolean | { x?, y? }", "true (x 3, y 5)", "Max px the bar drifts away from your finger while sliding. false turns it off."],
  ["haptics", "boolean | { tick?, arm? }", "true (50, 75)", "Vibration ms. tick: crossing a tab or tapping. arm: slide mode starts. false turns it off."],
  ["classNames", "YozoraClassNames", "", "Extra classes per part."],
  ["unstyled", "boolean", "false", "Removes every visual style and keeps only behavior-critical CSS."],
  ["className, style, ref, id, aria-*", "", "", "Passed to the bar element."]
]

export const tabRows = [
  ["id", "string", "Unique. Used by value and onValueChange."],
  ["icon", "ReactNode", "Outlined icon, shown when unselected."],
  ["activeIcon", "ReactNode?", "Filled icon, shown when selected. Crossfades with icon. Falls back to icon."],
  ["label", "ReactNode?", "Visible text under the icon."],
  ["aria-label", "string?", "Accessible name. Required when there is no label."],
  ["disabled", "boolean?", "Can't be selected by touch or keyboard."],
  ["className", "string?", "Extra class for this one tab."],
  ["controls", "string?", 'Id of the panel this tab controls (semantics="tabs").']
]

export const cssVarRows = [
  ["--yozora-accent", "#1d8cf0 / #6cb6ff", "Selected color. Pill and glow derive from it."],
  ["--yozora-bg", "#fff / #20232a", "Solid background, used when blur isn't supported."],
  ["--yozora-bg-glass", "translucent", "Blurred background used when backdrop-filter is supported."],
  ["--yozora-fg", "#1c1f24 / #e8eaee", "Text and icon color of unselected tabs."],
  ["--yozora-shadow", "soft drop shadow", "Bar shadow."],
  ["--yozora-radius", "999px", "Corner radius of the bar, pill and tabs."],
  ["--yozora-padding", "5px", 'Space between bar edge and pill. This is the "wall" the pill squashes against.'],
  ["--yozora-width", "80vw", "Bar width when fullWidth."],
  ["--yozora-max-width", "480px", "Max width when fullWidth."],
  ["--yozora-tab-min", "64px (0px with fullWidth)", "Minimum width of a tab."],
  ["--yozora-tab-padding-x", "14px", "Horizontal padding of a tab."],
  ["--yozora-icon-size", "20px", "Icon size."],
  ["--yozora-font-size", "11px", "Label size."],
  ["--yozora-spring", "cubic-bezier(.34,1.56,.64,1)", "Easing for the bar's press scale and the icon swap. The pill uses real spring physics."],
  ["--yozora-offset", "from offset", "Distance from the screen edge."],
  ["--yozora-z", "999999999", "z-index of the bar."]
]

export const dataAttrRows = [
  ["Wrapper", "data-yozora-container", "data-position"],
  ["Bar", "data-yozora-root", "data-theme, data-full-width, data-styled, data-armed (slide mode), data-mounted"],
  ["Pill", "data-yozora-pill", "data-dragging, data-empty"],
  ["Tab", "data-yozora-tab", "data-active, data-disabled"],
  ["Icon", "data-yozora-icon", "data-swap (has an activeIcon)"],
  ["Outlined / filled icon", "data-yozora-icon-outline, data-yozora-icon-filled", ""],
  ["Label", "data-yozora-label", ""]
]

export const faq = [
  ["Can I tune the spring and the wall squash?", "The feel is tuned in one small file, src/physics.ts (stiffness 420, damping 0.75, squash up to 25%). They aren't props yet."],
  ["Why doesn't the pill overshoot the end tab?", "It does overshoot, like any spring. The bar's padding acts as a wall, so the overshoot becomes a squash instead of the pill crossing the edge."],
  ["Can I use several bars?", 'Yes. Each bar is independent. Use position="static" for bars that live inside your layout.'],
  ["Can I use my own router link components?", "The tabs are buttons, and onValueChange is where you navigate. Link components inside the bar aren't supported."]
]

export const code = {
  styles: `import "yozora/styles"`,
  mount: `"use client"

import { Yozora } from "yozora"
import { useState } from "react"

const tabs = [
  { id: "chats", label: "Chats", icon: <ChatOutline />, activeIcon: <ChatFilled /> },
  { id: "contacts", label: "Contacts", icon: <UsersOutline />, activeIcon: <UsersFilled /> },
  { id: "profile", label: "Profile", icon: <UserOutline />, activeIcon: <UserFilled /> }
]

export function Nav() {
  const [tab, setTab] = useState("chats")
  return <Yozora aria-label="Main" tabs={tabs} value={tab} onValueChange={setTab} fullWidth />
}`,
  layout: `// app/layout.tsx
import "yozora/styles"
import { Nav } from "./nav"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Nav />
      </body>
    </html>
  )
}`,
  nav: `// app/nav.tsx
"use client"
import { Yozora } from "yozora"
import { usePathname, useRouter } from "next/navigation"

export function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Yozora
      aria-label="Main"
      tabs={tabs}
      value={pathname.split("/")[1] || "chats"} // keeps the bar in sync with the route
      onValueChange={(id) => router.push(\`/\${id}\`)}
      fullWidth
    />
  )
}`,
  modes: `// Uncontrolled: Yozora keeps track
<Yozora tabs={tabs} defaultValue="chats" onValueChange={(id) => console.log(id)} />

// Controlled: you own the state. Good for routers
<Yozora tabs={tabs} value={tab} onValueChange={setTab} />`,
  examples: `// Telegram style: full width, your brand color
<Yozora tabs={tabs} fullWidth accent="#f43f5e" />

// Compact: the bar hugs its icons
<Yozora tabs={iconOnlyTabs} />

// Calmer: no drift, softer vibration, a longer hold
<Yozora tabs={tabs} drift={false} haptics={{ tick: 20, arm: 40 }} holdDelay={350} />

// Match your theme switcher (next-themes, etc.)
<Yozora tabs={tabs} theme={resolvedTheme === "dark" ? "dark" : "light"} />`,
  classNames: `<Yozora
  tabs={tabs}
  classNames={{ root: 'shadow-xl', pill: 'bg-rose-500/20', tab: 'text-xs', label: 'font-semibold' }}
/>`,
  css: `:root {
  --yozora-radius: 20px;
  --yozora-width: 92vw;
}

[data-yozora-root][data-armed="true"] [data-yozora-pill] {
  background: hotpink;
}`,
  unstyled: `<Yozora tabs={tabs} unstyled classNames={{ root: "my-bar", tab: "my-tab" }} />`
}

export const homeFeatures: [LucideIcon, string, string][] = [
  [Hand, "Tap, or hold and slide", "Tap to select. Hold to pick the pill up and glide it under your finger."],
  [WavesHorizontal, "Springs with a wall", "The pill overshoots like a real spring, then squashes against the bar's edge instead of crossing it."],
  [Vibrate, "Haptics and drift", "Tiny vibration ticks on Android, and a bar that gives a little under your thumb."],
  [Palette, "Light, dark, your color", "One accent prop re-themes the pill, the glow and the icons in both modes."],
  [Accessibility, "Accessible by default", "Navigation or ARIA tabs semantics, full keyboard support and RTL."],
  [Feather, "Zero dependencies", "React is the only peer. Restyle it with classNames, CSS variables or unstyled."]
]

export const stats: [number, string][] = [
  [15, "props"],
  [16, "CSS variables"],
  [36, "tests"],
  [0, "dependencies"]
]

export const words = ["tap", "hold", "slide", "squash", "spring", "tick", "glide", "settle"]

export const phoneTabs: [string, string, LucideIcon][] = [
  ["chats", "Chats", MessageCircle],
  ["people", "People", Users],
  ["calls", "Calls", Phone],
  ["me", "Me", User]
]
