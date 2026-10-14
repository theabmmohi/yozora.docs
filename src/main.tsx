// Build by Claude ...

import { BrowserRouter } from "react-router"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import { App } from "./App"
import "yozora/styles"
import "./styles.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
