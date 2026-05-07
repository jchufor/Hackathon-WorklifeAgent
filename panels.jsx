/* global React */
const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;

// ============== Community Board ==============
function CommunityBoard({ avatarStyle }) {
  const lang = window.WL_LANG;
  const [posts, setPosts] = useStateP(window.SEED_POSTS);
  const [title, setTitle] = useStateP("");
  const [body, setBody] = useStateP("");
  const [tags, setTags] = useStateP(new Set());

  const tagOptions = [
    { id: "shuttle", label: window.t("cat_shuttle") },
    { id: "meeting", label: window.t("cat_meeting") },
    { id: "benefits", label: window.t("cat_benefits") },
    { id: "it", label: window.t("cat_it") },
    { id: "training", label: window.t("cat_training") },
    { id: "idcard", label: window.t("cat_idcard") },
    { id: "hr", label: window.t("cat_hr") },
  ];

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    const newPost = {
      id: "p" + Date.now(),
      titleKo: title, titleEn: title,
      bodyKo: body, bodyEn: body,
      tags: [...tags],
      timeKo: window.t("now"), timeEn: window.t("now"),
      author: lang === "ko" ? "나" : "You",
      authorEn: "You",
      wikified: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setTitle(""); setBody(""); setTags(new Set());
    // simulate swarm reply rolling in
    setTimeout(() => {
      const respondingAgents = ["wiki", "hr", "general"];
      const newComments = respondingAgents.map((aid) => ({
        agent: aid,
        bodyKo: "분석 중입니다… 관련 위키 페이지를 참고해 답변드릴게요.",
        bodyEn: "Analyzing… I'll reference relevant wiki pages.",
      }));
      setPosts((prev) => prev.map((p) => p.id === newPost.id ? { ...p, comments: newComments } : p));
    }, 800);
  };

  const toggleTag = (id) => {
    const next = new Set(tags);
    next.has(id) ? next.delete(id) : next.add(id);
    setTags(next);
  };

  const wikify = (id) => {
    setPosts(posts.map((p) => p.id === id ? { ...p, wikified: true } : p));
  };

  return (
    <div className="panel-content community">
      <div className="composer">
        <input
          className="composer-title"
          placeholder={window.t("composer_title_ph")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="composer-body"
          placeholder={window.t("composer_body_ph")}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="composer-bottom">
          <div className="composer-tags">
            {tagOptions.map((t) => (
              <button
                key={t.id}
                className={"tag-chip" + (tags.has(t.id) ? " active" : "")}
                onClick={() => toggleTag(t.id)}
              >#{t.label}</button>
            ))}
          </div>
          <button className="btn-primary" onClick={submit}>{window.t("submit_post")}</button>
        </div>
      </div>

      <div className="posts">
        {posts.map((p) => (
          <article key={p.id} className="post">
            <header className="post-head">
              <div>
                <h3>{lang === "ko" ? p.titleKo : p.titleEn}</h3>
                <div className="post-meta">
                  <span>{lang === "ko" ? p.author : p.authorEn}</span>
                  <span>·</span>
                  <span>{lang === "ko" ? p.timeKo : p.timeEn}</span>
                </div>
              </div>
              {p.wikified && <span className="badge-wiki">✓ {window.t("wikified")}</span>}
            </header>
            <p className="post-body">{lang === "ko" ? p.bodyKo : p.bodyEn}</p>
            <div className="post-tags">
              {p.tags.map((tg) => {
                const a = window.AGENT_BY_ID[tg];
                return <span key={tg} className="post-tag">#{a ? window.agentName(a).replace(/ Agent| 에이전트/g, "") : tg}</span>;
              })}
            </div>
            {p.comments.length > 0 && (
              <div className="swarm">
                <div className="swarm-head">
                  <span>{window.t("swarm_replies")}</span>
                  <span className="swarm-count">{p.comments.length}</span>
                </div>
                {p.comments.map((c, i) => {
                  const a = window.AGENT_BY_ID[c.agent];
                  return (
                    <div key={i} className="swarm-reply">
                      <window.AgentAvatar agent={a} style={avatarStyle} size={28} />
                      <div className="swarm-body">
                        <div className="swarm-name" style={{ color: a.color }}>{window.agentName(a)}</div>
                        <p>{lang === "ko" ? c.bodyKo : c.bodyEn}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="post-actions">
              <button className="btn-ghost sm" onClick={() => wikify(p.id)} disabled={p.wikified}>📚 {window.t("wikify")}</button>
              <button className="btn-ghost sm">↻ {window.t("rebuild_swarm")}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ============== Wiki Panel ==============
function WikiPanel() {
  const lang = window.WL_LANG;
  const [search, setSearch] = useStateP("");
  const [queue, setQueue] = useStateP(window.SEED_QUEUE);

  const filtered = window.SEED_WIKI.filter((p) => {
    if (!search) return true;
    const t = lang === "ko" ? p.titleKo : p.titleEn;
    return t.toLowerCase().includes(search.toLowerCase());
  });

  const grouped = filtered.reduce((acc, p) => {
    (acc[p.kind] = acc[p.kind] || []).push(p);
    return acc;
  }, {});

  const resolveQ = (id) => setQueue(queue.filter((q) => q.id !== id));

  return (
    <div className="panel-content wiki">
      <input
        className="wiki-search"
        placeholder={window.t("wiki_search_ph")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <section className="wiki-section">
        <h3 className="wiki-section-title">
          {window.t("wiki_review_queue")}
          <span className="wiki-count">{queue.length}</span>
        </h3>
        {queue.length === 0 ? (
          <div className="wiki-empty">{window.t("wiki_no_queue")}</div>
        ) : (
          queue.map((q) => (
            <div key={q.id} className="queue-item">
              <div className="queue-kind">{q.kind === "create" ? "+ NEW" : "↻ UPDATE"}</div>
              <div className="queue-page">{lang === "ko" ? q.pageKo : q.pageEn}</div>
              <div className="queue-reason">{lang === "ko" ? q.reasonKo : q.reasonEn}</div>
              <div className="queue-meta">
                <span>{q.sourceCount} {lang === "ko" ? "건의 질문" : "questions"}</span>
                <span>·</span>
                <span>{lang === "ko" ? q.timeKo : q.timeEn}</span>
              </div>
              <div className="queue-actions">
                <button className="btn-primary sm" onClick={() => resolveQ(q.id)}>{window.t("wiki_approve")}</button>
                <button className="btn-ghost sm" onClick={() => resolveQ(q.id)}>{window.t("wiki_reject")}</button>
              </div>
            </div>
          ))
        )}
      </section>

      {["entity", "concept", "comparison"].map((kind) => (
        grouped[kind] && (
          <section key={kind} className="wiki-section">
            <h3 className="wiki-section-title">
              {window.t("wiki_kind_" + kind)}
              <span className="wiki-count">{grouped[kind].length}</span>
            </h3>
            <div className="wiki-grid">
              {grouped[kind].map((p) => (
                <div key={p.id} className="wiki-card">
                  <div className="wiki-card-cat">{window.t(p.catKey)}</div>
                  <div className="wiki-card-title">{lang === "ko" ? p.titleKo : p.titleEn}</div>
                  <div className="wiki-card-meta">
                    <span>v{p.version}</span>
                    <span>·</span>
                    <span>{lang === "ko" ? p.updatedKo : p.updatedEn}</span>
                    <span>·</span>
                    <span>{p.views.toLocaleString()} {lang === "ko" ? "조회" : "views"}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
}

// ============== Tasks Panel ==============
function TasksPanel({ avatarStyle }) {
  const lang = window.WL_LANG;
  const tasks = window.SEED_TASKS;
  const totalSaved = tasks.reduce((s, t) => s + (t.status === "done" ? t.minutes : 0), 0);

  return (
    <div className="panel-content tasks">
      <div className="tasks-stats">
        <div className="stat-card">
          <div className="stat-num">{totalSaved}<span>{window.t("minutes")}</span></div>
          <div className="stat-label">{window.t("tasks_minutes_saved")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{tasks.length}</div>
          <div className="stat-label">{window.t("requests_today")}</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{new Set(tasks.map((t) => t.agent)).size}</div>
          <div className="stat-label">{window.t("active_agents")}</div>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((t) => {
          const a = window.AGENT_BY_ID[t.agent];
          return (
            <div key={t.id} className={"task-item status-" + t.status}>
              <window.AgentAvatar agent={a} style={avatarStyle} size={32} />
              <div className="task-info">
                <div className="task-title">{lang === "ko" ? t.titleKo : t.titleEn}</div>
                <div className="task-meta">
                  <span style={{ color: a.color }}>{window.agentName(a)}</span>
                  <span>·</span>
                  <span>{lang === "ko" ? t.timeKo : t.timeEn}</span>
                </div>
              </div>
              <div className="task-saved">
                <span>{t.minutes}{window.t("minutes")}</span>
                <small>{window.t("tasks_minutes_saved")}</small>
              </div>
              <div className={"task-status status-" + t.status}>
                {window.t("tasks_status_" + t.status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============== Orchestrator Inspector (right panel, slides in) ==============
function OrchestratorInspector({ open, onClose, lastTrace, avatarStyle }) {
  const lang = window.WL_LANG;
  if (!open) return null;
  return (
    <aside className="inspector">
      <div className="inspector-head">
        <div>
          <div className="inspector-kicker">{window.t("nav_inspector")}</div>
          <h3>{lang === "ko" ? "내부 라우팅" : "Internal routing"}</h3>
        </div>
        <button className="btn-icon" onClick={onClose}>✕</button>
      </div>
      <p className="inspector-desc">{window.t("inspector_subtitle")}</p>

      {lastTrace ? (
        <div className="inspector-body">
          <div className="trace-block">
            <div className="trace-label">{window.t("inspector_route")}</div>
            <div className="trace-flow">
              <window.AgentAvatar agent={window.AGENT_BY_ID.orchestrator} style={avatarStyle} size={32} />
              <span className="trace-arrow">→</span>
              {lastTrace.candidates.map((id, i) => {
                const a = window.AGENT_BY_ID[id];
                const isFinal = id === lastTrace.finalAgent;
                return (
                  <span key={id} className={"trace-cand" + (isFinal ? " final" : "")} style={{ borderColor: a.color }}>
                    <window.AgentAvatar agent={a} style="dot" size={14} />
                    {window.agentName(a)}
                    {isFinal && <span className="trace-pick">✓</span>}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="trace-grid">
            <div className="trace-cell">
              <div className="trace-label">{window.t("inspector_subagent")}</div>
              <div className="trace-val">{window.agentName(window.AGENT_BY_ID[lastTrace.finalAgent])}</div>
            </div>
            <div className="trace-cell">
              <div className="trace-label">{window.t("inspector_confidence")}</div>
              <div className="trace-val">{Math.round(lastTrace.confidence * 100)}%</div>
            </div>
            <div className="trace-cell">
              <div className="trace-label">{window.t("inspector_latency")}</div>
              <div className="trace-val">{lastTrace.elapsed}ms</div>
            </div>
            <div className="trace-cell">
              <div className="trace-label">{lang === "ko" ? "절약 시간" : "Time saved"}</div>
              <div className="trace-val">{lastTrace.minutesSaved}{window.t("minutes")}</div>
            </div>
          </div>

          <div className="trace-block">
            <div className="trace-label">{window.t("inspector_tools")}</div>
            <div className="trace-tools">
              {lastTrace.tools.map((t) => (
                <code key={t} className="trace-tool">{t}</code>
              ))}
            </div>
          </div>

          <div className="trace-block">
            <div className="trace-label">{lang === "ko" ? "오케스트레이터 로그" : "Orchestrator log"}</div>
            <div className="trace-log">
              <div><span className="log-t">00ms</span> intent.classify("{lastTrace.query.slice(0, 40)}{lastTrace.query.length > 40 ? "…" : ""}")</div>
              <div><span className="log-t">12ms</span> route.score → {lastTrace.candidates.length} candidates</div>
              <div><span className="log-t">38ms</span> dispatch → <b>{lastTrace.finalAgent}</b></div>
              <div><span className="log-t">{Math.round(lastTrace.elapsed * 0.55)}ms</span> {lastTrace.finalAgent}.execute()</div>
              <div><span className="log-t">{Math.round(lastTrace.elapsed * 0.85)}ms</span> wiki.cite ← {Math.floor(Math.random() * 3) + 1} pages</div>
              <div><span className="log-t">{lastTrace.elapsed}ms</span> response.compose ✓</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="inspector-empty">
          {lang === "ko" ? "어시스턴트에 메시지를 보내면 라우팅 흐름이 여기 표시됩니다." : "Send a message and the routing trace appears here."}
        </div>
      )}

      <div className="inspector-roster">
        <div className="trace-label">{lang === "ko" ? "전문 에이전트 12종" : "12 specialist agents"}</div>
        <div className="roster-grid">
          {window.AGENTS.filter((a) => a.role === "specialist").map((a) => (
            <div key={a.id} className="roster-item">
              <window.AgentAvatar agent={a} style={avatarStyle} size={26} />
              <span>{window.agentName(a)}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

window.CommunityBoard = CommunityBoard;
window.WikiPanel = WikiPanel;
window.TasksPanel = TasksPanel;
window.OrchestratorInspector = OrchestratorInspector;
