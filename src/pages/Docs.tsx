import { code, cssVarRows, dataAttrRows, docFeatures, faq, feelRows, npmUrl, propRows, repoUrl, tabRows } from "../data"
import { Code, Install, Section, Shield, Table } from "../components/Docs"

export function Docs() {
  return (
    <>
      <div className="hero">
        <h1>yozora</h1>
        <div className="kana">夜空 · NIGHT SKY</div>
        <p>A fluid, draggable floating tab bar for React. Tap to switch. Hold and slide to glide. Feel the haptics.</p>
        <div className="shields">
          <div>
            <Shield alt="npm version" href={npmUrl} src="https://img.shields.io/npm/v/yozora" />
            <Shield alt="GitHub stars" href={repoUrl} src="https://img.shields.io/github/stars/theabmmohi/yozora" />
          </div>
          <div>
            <Shield alt="license" href={`${repoUrl}/blob/main/LICENSE`} src="https://img.shields.io/npm/l/yozora" />
            <Shield alt="types" href={npmUrl} src="https://img.shields.io/npm/types/yozora" />
          </div>
        </div>
        <Install />
      </div>
      <div className="grid">
        {docFeatures.map(([Icon, title, text]) => (
          <div className="feature" key={title}>
            <div className="ico">
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <b>{title}</b>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <Section id="start" title="Quick start">
        <p>Works with React 18 and 19 and ships with TypeScript types.</p>
        <h3>1. Import the stylesheet once</h3>
        <Code text={code.styles} />
        <h3>2. Mount the bar once</h3>
        <p>It fixes itself to the bottom of the screen.</p>
        <Code text={code.mount} />
        <h3>3. Do whatever you like in onValueChange</h3>
        <p>Yozora never touches your router. It tells you which tab was picked, and you decide what happens.</p>
        <h3>Next.js (App Router)</h3>
        <Code text={code.layout} />
        <Code text={code.nav} />
        <p>React Router, TanStack Router and others work the same way: pass the current route as value and navigate in onValueChange.</p>
        <div className="note">
          <b>Why a separate stylesheet?</b> The bar usually lives in a root layout, so it is rendered on the server. Styles injected by JavaScript would leave it unstyled until hydration, and strict CSP setups can block them. A normal CSS import
          avoids both.
        </div>
      </Section>
      <Section id="feel" title="How it feels">
        <Table head={["You do", "What happens"]} rows={feelRows} codeColumns={[]} />
        <p>While you slide, the bar also scales up a hair and drifts slightly away from your finger, the way a physical button gives under pressure.</p>
      </Section>
      <Section id="options" title="Options">
        <p>
          Everything is a flat prop with a sensible default, so <code>{"<Yozora tabs={tabs} />"}</code> already works. Yozora handles <code>onKeyDown</code> and the pointer events itself, so those props are not accepted.
        </p>
        <Table head={["Prop", "Type", "Default", "Description"]} rows={propRows} codeColumns={[0, 1]} />
        <h3>Tabs</h3>
        <Table head={["Field", "Type", "Description"]} rows={tabRows} codeColumns={[0, 1]} />
        <ul className="plain">
          <li>Every tab needs a name: a label, an aria-label, or both. TypeScript enforces it, and plain JavaScript gets a dev warning.</li>
          <li>
            Any icon library works. With lucide-react, a filled look is one prop: <code>{'activeIcon: <Home fill="currentColor" />'}</code>
          </li>
        </ul>
        <h3>Controlled or uncontrolled</h3>
        <Code text={code.modes} />
        <p>In controlled mode the bar only moves when value changes. If value matches no tab, nothing is highlighted. Tabs that load later work fine, and an uncontrolled bar falls back to the first enabled tab.</p>
        <h3>Examples</h3>
        <Code text={code.examples} />
      </Section>
      <Section id="styling" title="Styling">
        <p>Pick the level of control you need: one color, CSS variables, classNames, data attributes, or unstyled.</p>
        <h3>1. One color</h3>
        <p>
          The pill fill, the glow and the selected icon color all follow <code>accent</code>, in light and dark.
        </p>
        <h3>2. CSS variables</h3>
        <Table head={["Variable", "Default", "What it does"]} rows={cssVarRows} codeColumns={[0]} />
        <h3>3. classNames</h3>
        <Code text={code.classNames} />
        <p>Slots: container (the fixed wrapper), root (the bar), pill, tab, icon, label.</p>
        <h3>4. data attributes</h3>
        <Table head={["Part", "Attribute", "State attributes"]} rows={dataAttrRows} codeColumns={[1]} />
        <Code text={code.css} />
        <h3>5. unstyled</h3>
        <Code text={code.unstyled} />
        <p>Removes colors, padding, shadows and the blur. It keeps only what the behavior needs: positioning, the pill's movement and the icon swap.</p>
      </Section>
      <Section id="a11y" title="Accessibility">
        <h3>semantics="navigation" (default)</h3>
        <ul className="plain">
          <li>For tabs that take you to different pages. The bar is a navigation landmark of buttons, and the active one has aria-current="page".</li>
          <li>Give the bar a name with aria-label. Each button is a normal Tab stop. Arrow keys, Home and End move focus. Enter or Space activates.</li>
        </ul>
        <h3>semantics="tabs"</h3>
        <ul className="plain">
          <li>For tabs that switch panels on the same page. It follows the ARIA tabs pattern: tablist, tab, aria-selected and a roving tabindex.</li>
          <li>Arrow keys select as focus moves. Pass controls on each tab with its panel id.</li>
        </ul>
        <h3>Both modes</h3>
        <ul className="plain">
          <li>Arrow keys flip in right-to-left layouts, and the pill's limits work in RTL too.</li>
          <li>Disabled tabs are skipped. Icons are hidden from screen readers, so each tab's name comes from its label or aria-label.</li>
          <li>prefers-reduced-motion turns the pill's spring into an instant move.</li>
        </ul>
      </Section>
      <Section id="notes" title="Notes">
        <ul className="plain">
          <li>
            <b>Haptics</b> use navigator.vibrate: Chrome and Firefox on Android. iOS Safari doesn't support it, so there the bar works without vibration.
          </li>
          <li>
            <b>Glass effect</b> uses backdrop-filter. Browsers without it get the solid --yozora-bg.
          </li>
          <li>
            <b>Accent colors</b> use color-mix(). Browsers without it get a neutral pill.
          </li>
          <li>
            <b>Server rendering</b> works with SSR and RSC frameworks. The component has "use client", and functions such as onValueChange can't be passed from a server component, so use a small client wrapper.
          </li>
        </ul>
        <h3>FAQ</h3>
        {faq.map(([question, answer]) => (
          <p key={question}>
            <b>{question}</b>
            <br />
            {answer}
          </p>
        ))}
      </Section>
      <Section id="credits" title="Inspired by">
        <ul className="plain">
          <li>
            <b>Telegram</b> for the floating, draggable tab bar with a highlight that follows your finger.
          </li>
          <li>
            <b>Samsung One UI</b> for the compact, gallery-style bar that hugs its icons.
          </li>
          <li>
            <b>Emil Kowalski</b> for his writing and work on interaction craft: interruptible, spring-based motion and honest haptics.
          </li>
          <li>
            <b>Sonner</b> (and Vaul) for the way a library should feel to use: zero setup, data attributes, CSS variables, classNames and unstyled.
          </li>
        </ul>
        <p className="hint">Yozora is an independent project and isn't affiliated with or endorsed by Telegram, Samsung or Emil Kowalski. Telegram and One UI are trademarks of their respective owners.</p>
      </Section>
      <footer>MIT © theabmmohi</footer>
    </>
  )
}
