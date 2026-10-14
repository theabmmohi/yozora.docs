import { useState } from "react"
import type { CSSProperties } from "react"
import { Bell, House, Search, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Yozora } from "yozora"
import type { YozoraProps, YozoraTab } from "yozora"
import { Code } from "../components/Docs"

type Recipe = {
  title: string
  text: string
  props?: Omit<Partial<YozoraProps>, "tabs">
  labels?: boolean
  panel?: boolean
  code: string
}

const items: [string, string, LucideIcon][] = [
  ["home", "Home", House],
  ["search", "Search", Search],
  ["alerts", "Alerts", Bell],
  ["me", "Me", User]
]

const tabsFor = (labels: boolean, controls?: string): YozoraTab[] =>
  items.map(([id, label, Icon]) => {
    const base = { id, controls, icon: <Icon strokeWidth={1.8} />, activeIcon: <Icon strokeWidth={1.8} fill="currentColor" /> }
    return labels ? { ...base, label } : { ...base, "aria-label": label }
  })

const recipes: Recipe[] = [
  {
    title: "Telegram style",
    text: "Full width, your brand color. The tabs share the bar equally.",
    props: { fullWidth: true, accent: "#f43f5e" },
    code: `<Yozora tabs={tabs} fullWidth accent="#f43f5e" />`
  },
  {
    title: "Compact gallery",
    text: "Icons only. The bar hugs its content, like a gallery app. Give each tab an aria-label so screen readers still get a name.",
    labels: false,
    code: `<Yozora tabs={iconOnlyTabs} />`
  },
  {
    title: "Calm and quiet",
    text: "No drift, a softer vibration and a longer hold before slide mode starts. Good for people who find motion distracting.",
    props: { drift: false, haptics: { tick: 20, arm: 40 }, holdDelay: 350 },
    code: `<Yozora tabs={tabs} drift={false} haptics={{ tick: 20, arm: 40 }} holdDelay={350} />`
  },
  {
    title: "Squarer corners",
    text: "One CSS variable changes the radius of the bar, the pill and the tabs together.",
    props: { fullWidth: true, style: { "--yozora-radius": "14px" } as CSSProperties },
    code: `<Yozora tabs={tabs} fullWidth style={{ "--yozora-radius": "14px" }} />`
  },
  {
    title: "Always dark",
    text: "Ignore the system theme and keep the bar dark on a bright page, with a violet accent.",
    props: { theme: "dark", accent: "#a78bfa" },
    code: `<Yozora tabs={tabs} theme="dark" accent="#a78bfa" />`
  },
  {
    title: "Panels on one page",
    text: "Use ARIA tabs semantics when the bar switches panels instead of routes. Point each tab at its panel with controls.",
    props: { semantics: "tabs", fullWidth: true },
    panel: true,
    code: [
      `const tabs = [`,
      `  { id: "home", label: "Home", icon: <House />, controls: "panel" },`,
      `  { id: "search", label: "Search", icon: <Search />, controls: "panel" }`,
      `]`,
      ``,
      `<Yozora semantics="tabs" tabs={tabs} value={tab} onValueChange={setTab} />`,
      `<section id="panel" role="tabpanel">{panels[tab]}</section>`
    ].join("\n")
  }
]

const router = [
  `import { Yozora } from "yozora"`,
  `import { useLocation, useNavigate } from "react-router"`,
  ``,
  `export function Nav() {`,
  `  const navigate = useNavigate()`,
  `  const { pathname } = useLocation()`,
  `  return (`,
  `    <Yozora`,
  `      aria-label="Main"`,
  `      tabs={tabs}`,
  `      value={pathname.split("/")[1] || "home"}`,
  "      onValueChange={(id) => navigate(`/${id}`)}",
  `      fullWidth`,
  `    />`,
  `  )`,
  `}`
].join("\n")

function Demo({ recipe }: { recipe: Recipe }) {
  const [tab, setTab] = useState("home")
  return (
    <div className="card">
      <h3>{recipe.title}</h3>
      <p className="hint">{recipe.text}</p>
      <div className="stage">
        <Yozora aria-label={recipe.title} tabs={tabsFor(recipe.labels ?? true, recipe.panel ? "panel" : undefined)} value={tab} onValueChange={setTab} position="static" {...recipe.props} />
      </div>
      {recipe.panel && (
        <section id="panel" role="tabpanel" className="stage-panel">
          Panel: <code>{tab}</code>
        </section>
      )}
      <Code text={recipe.code} />
    </div>
  )
}

export function Others() {
  return (
    <>
      <h2 className="page-title">Recipes</h2>
      <p className="hint">Small setups you can copy. Every bar below is live, so tap it or hold and slide across the tabs.</p>
      {recipes.map((recipe) => (
        <Demo key={recipe.title} recipe={recipe} />
      ))}
      <div className="card">
        <h3>With React Router</h3>
        <p className="hint">Pass the current route as value and navigate in onValueChange. This is how this site is wired.</p>
        <Code text={router} />
      </div>
    </>
  )
}
