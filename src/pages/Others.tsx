import { Star } from "lucide-react"
import { languageColors, repos } from "../data"

export function Others() {
  return (
    <>
      <h2 className="page-title">More from theabmmohi</h2>
      <p className="hint">A snapshot of my other public repos on GitHub.</p>
      <div className="repos">
        {repos.map((repo) => (
          <a className="repo-card" key={repo.name} href={repo.url} target="_blank" rel="noreferrer">
            <b>{repo.name}</b>
            <span className="desc">{repo.description || "No description yet."}</span>
            <span className="meta">
              {repo.language && (
                <span className="lang">
                  <i style={{ background: languageColors[repo.language] ?? "var(--muted)" }} />
                  {repo.language}
                </span>
              )}
              <span className="stars">
                <Star size={13} /> {repo.stars}
              </span>
              <span>Updated {repo.pushed}</span>
            </span>
          </a>
        ))}
      </div>
    </>
  )
}
