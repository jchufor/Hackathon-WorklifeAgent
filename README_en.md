# 퇴뽓

**AI agent that reduces menial tasks and recovers thinking time for all employees.**

**[→ Open demo](https://jchufor.github.io/Hackathon-WorklifeAgent/)**

---

## What It Is

퇴뽓 is an internal operations assistant that sits in front of a company's scattered internal systems and handles the repetitive administrative work employees do every day — meeting room booking, SVPN applications, ID card reissues, IT helpdesk requests, shuttle lookups, and more.

The insight from the team's planning sessions:

> *"The problem is not that employees don't know how to work. Time leaks out because they have to re-locate, re-check, and re-submit through fragmented internal systems every single time."*

The agent doesn't just answer questions. It opens the right screen, pre-fills forms, and reduces the task to a single confirmation click. Alongside execution, a participatory wiki continuously accumulates institutional knowledge — turning every user question into a potential wiki article, and every failure into an automatic correction suggestion.

---

## Core Value Chain

```
Menial Task Execution → Knowledge Accumulation → Manual Freshness Loop → Thinking Time Recovery
```

The goal is not "reduce 8 hours of menial tasks to 1 hour." It is to recover the thinking time — shifting hours currently lost to administrative friction back toward main work, learning, and innovation.

---

## Key Features (Prototype Scope)

### 1. Orchestrator + Multi-Agent Chat
A single chat interface routes requests to the right specialist agent behind the scenes. The user talks to one assistant; internally 12 specialist agents collaborate.

| Agent | Handles |
|---|---|
| Shuttle | Schedule lookups, live delay info |
| Meeting Room | Room search, capacity, video-conf booking |
| Benefits | Welfare point balance, usage history |
| IT Helpdesk | SVPN application, PC export, website exceptions |
| External Training | Application flow, proxy approval handling |
| ID Card | Loss report + reissue in a single flow |
| HR / Policy | Approval chains, delegation rules |
| Knowledge (Wiki) | Wiki retrieval and article surfacing |
| + 4 more | Cafeteria, Expense, General, Orchestrator |

The **Orchestrator Inspector** (visible in the UI) shows the internal routing trace — which agents were considered, which was selected, confidence score, latency, and tools called. This is the demo's transparency layer.

### 2. Action Cards (Execution, Not Just Search)
For supported tasks, the agent presents a step-by-step execution card rather than just an answer. Each step is runnable directly from the card (form pre-fill → submit → notify). Legacy backend systems are untouched; the agent adds a simplified front-end layer on top.

### 3. Participatory Wiki
A Wikipedia-style internal knowledge base where any employee can contribute, edit, or correct procedure articles. All content is explicitly marked non-official, removing the pressure for a single owner to maintain accuracy.

- The **Review Queue** surfaces AI-proposed wiki updates based on repeated questions or logged failures
- Approve or reject suggested updates directly from the wiki panel
- Every question that comes in multiple times becomes a wiki page candidate

### 4. Community ASK Board
Employees post questions; a swarm of relevant agents replies from multiple angles simultaneously. Posts that generate good answers can be promoted to wiki pages with one click ("Wikify").

### 5. Tasks Panel
A log of everything the agent has handled — with time-saved estimates per task, status tracking, and active agent counts.

---

## Architecture

### Multi-Agent Design (Planned for Production)

```
User Request
    ↓
Orchestrator Agent  ←→  intent classification, routing
    ↓
Specialist Sub-Agent (e.g. IT, Shuttle, Meeting Room)
    ↓
Wiki Retrieval Sub-Agent  ←→  relevant procedure articles
    ↓
Response + Action Card
    ↓
Knowledge Update Sub-Agent  ←→  logs failures, drafts corrections
```

Each sub-agent is defined by its own `agent.md` specification file. The orchestrator reads these to decide routing. This design targets FabriX/internal API deployment — though the hackathon prototype runs the full intent-matching and routing logic client-side for demo reliability.

> **05/06 session note:** FabriX-internal LLM integration was found to be unreliable (works externally via API, not reliably inside corporate network). The prototype intentionally keeps routing logic self-contained so it works offline with no network dependency.

### Prototype Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| UI | Single HTML file (`WorkLife Agent.html`) | Runs by double-click, no server, no network needed |
| Framework | React 18 + Babel standalone (local) | Local copies — `react.min.js`, `react-dom.min.js`, `babel.min.js` |
| Styling | `worklife.css` (external, same folder) | System fonts only — no CDN, works on restricted networks |
| i18n | Korean/English auto-detect + toggle | `localStorage` persistence, `wl-lang-change` event |
| Data | Inline JS seed data | Scenarios, agents, posts, wiki pages, tasks |
| LLM (production target) | Gemini API (current) / local Ollama | Team is on Gemini API keys; Ollama + quantized model explored for air-gapped use |

---

## Running the Prototype

1. Keep `WorkLife Agent.html`, `worklife.css`, `react.min.js`, `react-dom.min.js`, and `babel.min.js` **in the same folder**.
2. Double-click `WorkLife Agent.html` — opens directly in a browser with no server required.
3. No internet connection needed. All assets are local.

**What to demo:**
- Type a request or click an example prompt (try "SVPN", "meeting room", "welfare points", "shuttle", "ID card")
- Watch the routing pulse animate agent selection
- Click "Handled by · [Agent]" tag to open the Orchestrator Inspector panel
- Switch to Community, Wiki, and Tasks tabs
- Toggle Korean / English with the language button top-right
- Switch persona pills (New hire / Senior / Manager) to see different example prompts

---

## Team

| Role | Name |
|---|---|
| Product / Backend / Integration | Hyun-woo Kim |
| Frontend / Demo | Jin-hyeon Ahn |
| Agent Architecture | Joshua |
| Use Cases / UX | So-yeon Kim |

---

## BRD Reference: Problem Statement

> *Employees know how to do their work but consistently lose time to locating the right system, finding the current procedure path, and submitting requests through fragmented, unintuitive internal tools.*

**Key pain points:**
- Basic requests (SVPN, attendance app, ID card) are scattered with no central guide
- IT Helpdesk requests (PC export, website exceptions, etc.) are split across different admins with no clear single point of contact
- Meeting room booking — especially cross-site or video-conf rooms — requires multiple unintuitive steps
- External training approval chains are opaque; proxy approval procedures are undocumented
- Official manuals are rarely updated, so even experienced employees hit the same friction whenever a system changes or they attempt an infrequent task

This is not a new-hire problem. Every employee faces the same repeated friction whenever systems change or tasks come up infrequently.

---

## Data Strategy

| Source | Approach |
|---|---|
| Participatory wiki | Primary — crowd-sourced, employee-editable, explicitly non-official |
| Question logs | Agent-collected, anonymized, surfaces high-friction topics |
| Failure logs | Auto-generated when users report incorrect procedure paths |
| Official HR/org systems | **Minimized intentionally** — permission and confidentiality risks; not integrated in prototype |

The non-official disclaimer on all wiki content is a deliberate design choice, not a limitation. It removes the burden of accuracy from any single system owner and allows the knowledge base to grow freely.
