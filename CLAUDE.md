# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Prototype

No build step. No server. No package manager.

Open `WorkLife Agent.html` by double-clicking it. All dependencies are local files in the same folder — `react.min.js`, `react-dom.min.js`, `babel.min.js`, `worklife.css`. The page works offline on `file://`.

To test changes: save the file, reload the browser tab.

## Architecture

### Single-file delivery vs. split source files

The **canonical deliverable** is `WorkLife Agent.html`. All application code lives inside it as inline `<script>` blocks. The separate `.jsx` / `.js` files (`app.jsx`, `agents.js`, `chat-components.jsx`, `panels.jsx`, `scenarios.js`, `seed-data.js`, `i18n.js`, `tweaks-panel.jsx`) are **not loaded by the HTML** — they are a partially extracted modular version in progress. When editing the prototype, edit `WorkLife Agent.html`.

### Script block layout (inside WorkLife Agent.html)

The `<script>` blocks appear in dependency order:

1. **i18n block** — `window.I18N` (all UI strings in ko/en), `window.WL_LANG`, `window.t(key)`, `window.WL_setLang(lang)`. Language persists via `localStorage`. A `wl-lang-change` CustomEvent propagates changes to React.

2. **Agents block** — `window.AGENTS` array (12 specialist agents + orchestrator), each with `id`, `nameKo`, `nameEn`, `color`, `glyph`, `catKey`, `role`. `window.AGENT_BY_ID` is the lookup map. `window.agentName(agent)` returns the localized name.

3. **Scenarios block** — `window.SCENARIOS` array. Each scenario defines `triggers` (keyword list), `agent` (which specialist handles it), `confidence`, `minutesSaved`, `tools`, bilingual answer strings, action card steps, and optional `customCard` type (`"meetingRooms"`, `"shuttle"`, `"benefits"`). `window.matchScenario(text)` does keyword matching — no LLM call.

4. **Seed data block** — `window.SEED_POSTS`, `window.SEED_WIKI`, `window.SEED_QUEUE`, `window.SEED_TASKS`. These are the demo's static starting state.

5. **Babel/JSX block** (`<script type="text/babel">`) — all React components. Babel standalone transpiles this in the browser.

### Routing (client-side only)

`matchScenario()` scores each scenario by summing trigger keyword lengths. The highest-scoring scenario wins. If nothing matches, the `general` agent is used with a fallback response. The Orchestrator Inspector panel visualizes this routing trace — it is purely cosmetic/demo UI built from the same trace data.

### Action cards

`ActionCard` renders differently based on `scenario.customCard`:
- `"meetingRooms"` → room grid with book buttons
- `"shuttle"` → time list with live/delay indicators
- `"benefits"` → balance bar + breakdown table
- `undefined` → generic step list (used for SVPN, ID card, etc.)

### State management

All state is local React `useState`. No external store. Seed data is read from `window.*` globals at component mount and copied into state where mutation is needed (posts, wiki queue). `window.SEED_WIKI` and `window.SEED_TASKS` are read-only in the current implementation.

### i18n pattern

Components read `window.WL_LANG` directly (not via props). The `App` component holds a `lang` state that re-renders on `wl-lang-change`, which cascades re-renders to children. Bilingual strings are either looked up via `window.t(key)` (for UI labels) or read from `Ko`/`En` field pairs on data objects (for scenario content).

## Key Constraints

- **No CDN, no network calls** — the prototype must work on restricted corporate networks. Never add `<script src="https://...">` or `fetch()` calls.
- **No build tooling** — JSX is transpiled by Babel standalone at runtime. Keep all code inside the existing `<script type="text/babel">` block.
- **Scope discipline** — the demo covers 5 primary scenarios (SVPN, meeting room, welfare points, shuttle, ID card). Expanding menus or adding unscoped features risks demo stability.
- **`docs/` and `uploads/` are gitignored** — source documents (BRD, meeting transcripts) live there but are not committed.
