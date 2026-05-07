/* global React, ReactDOM */
const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

function App() {
  const [lang, setLang] = useS(window.WL_LANG);
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks({
    avatarStyle: "icon",
    persona: "vet",
  }) : [{ avatarStyle: "icon", persona: "vet" }, () => {}];

  const [tab, setTab] = useS("chat"); // chat | community | wiki | tasks
  const [messages, setMessages] = useS([]);
  const [input, setInput] = useS("");
  const [sending, setSending] = useS(false);
  const [routing, setRouting] = useS(null); // { candidates, finalAgent }
  const [inspectorOpen, setInspectorOpen] = useS(false);
  const [lastTrace, setLastTrace] = useS(null);
  const chatScrollRef = useR(null);

  // i18n re-render
  useE(() => {
    const onChange = (e) => setLang(e.detail);
    window.addEventListener("wl-lang-change", onChange);
    return () => window.removeEventListener("wl-lang-change", onChange);
  }, []);

  // greeting on load
  useE(() => {
    setMessages([{ id: "g0", role: "bot", html: window.t("chat_greeting") }]);
  }, [lang]);

  // auto-scroll
  useE(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, routing]);

  const toggleLang = () => {
    const next = lang === "ko" ? "en" : "ko";
    window.WL_setLang(next);
  };

  const personaPrompts = {
    new: window.WL_LANG === "ko"
      ? ["사원증을 어제 분실했어요. 재발급 받고 싶어요", "강남역에서 본사 가는 셔틀 다음 시간 알려줘", "회사 식당 운영시간 알려줘"]
      : ["I lost my ID card yesterday. Need to reissue.", "Next shuttle from Gangnam Station to HQ?", "What are the cafeteria hours?"],
    vet: window.WL_LANG === "ko"
      ? ["내일 오후 4시에 6명 회의실 예약해줘", "내 복지포인트 잔액 알려줘", "SVPN 신청하고 싶어"]
      : ["Book a 6-person meeting room tomorrow at 4pm", "What's my welfare points balance?", "I need to apply for SVPN"],
    mgr: window.WL_LANG === "ko"
      ? ["팀원 외부교육 승인 절차 알려줘", "다음 주 전체 회의실 30명 예약 가능한 곳", "복지포인트 일괄 사용 가이드"]
      : ["External training approval process for my team", "Find a 30-person room next week", "Bulk welfare-point usage guide"],
  };

  const send = (textArg) => {
    const text = (textArg ?? input).trim();
    if (!text || sending) return;
    setInput("");
    const userMsg = { id: "u" + Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setSending(true);

    // Simulate orchestrator routing
    const matched = window.matchScenario(text);
    const finalAgent = matched ? matched.agent : "general";
    // Build candidate list — 2-3 plausible agents including the final
    const allSpec = window.AGENTS.filter((a) => a.role === "specialist").map((a) => a.id);
    let candidates = matched && matched.related ? [...matched.related] : ["wiki", "general"];
    if (!candidates.includes(finalAgent)) candidates.unshift(finalAgent);
    if (candidates.length < 3) {
      const extra = allSpec.filter((id) => !candidates.includes(id))[0];
      if (extra) candidates.push(extra);
    }
    candidates = candidates.slice(0, 3);
    // sort so final is last (the "winner")
    candidates = candidates.filter((c) => c !== finalAgent).concat([finalAgent]);

    setRouting({ candidates, finalAgent });

    const elapsed = 480 + Math.floor(Math.random() * 220);
    setTimeout(() => {
      setRouting(null);
      const trace = {
        query: text,
        candidates,
        finalAgent,
        confidence: matched ? matched.confidence : 0.55,
        elapsed,
        minutesSaved: matched ? matched.minutesSaved : 3,
        tools: matched ? matched.tools : ["wiki.search"],
      };
      setLastTrace(trace);
      const answer = matched
        ? (window.WL_LANG === "ko" ? matched.answerKo : matched.answerEn)
        : (window.WL_LANG === "ko"
          ? "조금 더 자세히 알려주세요. 셔틀, 회의실, 복지, 사원증, IT 도움이 필요하신가요?"
          : "Could you say a bit more? Need help with shuttle, meeting rooms, benefits, ID card, or IT?");

      const html = answer.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");

      const botMsg = {
        id: "b" + Date.now(),
        role: "bot",
        html,
        agentId: finalAgent,
        routedTo: finalAgent,
        elapsed,
        scenario: matched,
        actionCard: matched ? { title: matched.actionTitleKo, steps: matched.steps } : null,
      };
      setMessages((m) => [...m, botMsg]);
      setSending(false);
    }, elapsed);
  };

  const examples = personaPrompts[tweaks.persona] || personaPrompts.vet;

  // Header stats
  const stats = useM(() => ({
    saved: window.SEED_TASKS.reduce((s, t) => s + (t.status === "done" ? t.minutes : 0), 0),
    requests: window.SEED_TASKS.length,
    agents: window.AGENTS.filter((a) => a.role === "specialist").length,
  }), []);

  return (
    <div className="app">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="7" fill="#0d9488"/>
              <path d="M8 14 L12 18 L20 10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="brand-name">{window.t("brand_name")}</div>
            <div className="brand-sub">{window.t("header_subtitle")}</div>
          </div>
        </div>

        <div className="header-stats">
          <div className="hstat"><b>{stats.saved}</b><span>{window.t("minutes_saved_today")}</span></div>
          <div className="hstat"><b>{stats.requests}</b><span>{window.t("requests_today")}</span></div>
          <div className="hstat"><b>{stats.agents}</b><span>{window.t("active_agents")}</span></div>
        </div>

        <div className="header-actions">
          <button
            className={"btn-ghost" + (inspectorOpen ? " active" : "")}
            onClick={() => setInspectorOpen(!inspectorOpen)}
          >◆ {window.t("nav_inspector")}</button>
          <button className="lang-toggle" onClick={toggleLang}>
            <span className={lang === "ko" ? "active" : ""}>한</span>
            <span className="divider">|</span>
            <span className={lang === "en" ? "active" : ""}>EN</span>
          </button>
        </div>
      </header>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="app-body">
        {/* Left rail */}
        <nav className="rail">
          <div className="rail-section">
            <div className="rail-label">{window.t("persona_label")}</div>
            <div className="persona-pills">
              {[
                { id: "new", label: window.t("persona_new") },
                { id: "vet", label: window.t("persona_vet") },
                { id: "mgr", label: window.t("persona_mgr") },
              ].map((p) => (
                <button
                  key={p.id}
                  className={"persona-pill" + (tweaks.persona === p.id ? " active" : "")}
                  onClick={() => setTweak("persona", p.id)}
                >{p.label}</button>
              ))}
            </div>
          </div>

          <div className="rail-section">
            <button
              className={"rail-tab" + (tab === "chat" ? " active" : "")}
              onClick={() => setTab("chat")}
            >
              <span className="rail-glyph">💬</span>
              <span>{window.t("nav_chat")}</span>
            </button>
            <button
              className={"rail-tab" + (tab === "community" ? " active" : "")}
              onClick={() => setTab("community")}
            >
              <span className="rail-glyph">👥</span>
              <span>{window.t("nav_community")}</span>
            </button>
            <button
              className={"rail-tab" + (tab === "wiki" ? " active" : "")}
              onClick={() => setTab("wiki")}
            >
              <span className="rail-glyph">📚</span>
              <span>{window.t("nav_wiki")}</span>
            </button>
            <button
              className={"rail-tab" + (tab === "tasks" ? " active" : "")}
              onClick={() => setTab("tasks")}
            >
              <span className="rail-glyph">✓</span>
              <span>{window.t("nav_tasks")}</span>
            </button>
          </div>

          <div className="rail-section rail-bottom">
            <div className="rail-label">{lang === "ko" ? "전문 에이전트" : "Specialists"}</div>
            <div className="rail-agents">
              {window.AGENTS.filter((a) => a.role === "specialist").slice(0, 8).map((a) => (
                <div key={a.id} className="rail-agent" title={window.agentName(a)}>
                  <window.AgentAvatar agent={a} style={tweaks.avatarStyle} size={22} />
                  <span>{window.agentName(a).replace(/ Agent| 에이전트/g, "")}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Center workspace */}
        <main className="workspace">
          {tab === "chat" && (
            <div className="chat-panel">
              <div className="chat-scroll" ref={chatScrollRef}>
                <div className="chat-inner">
                  {messages.map((m) =>
                    m.role === "user"
                      ? <window.ChatMessage key={m.id} msg={m} avatarStyle={tweaks.avatarStyle} />
                      : <window.ChatMessage key={m.id} msg={m} avatarStyle={tweaks.avatarStyle}
                          onShowInspector={() => setInspectorOpen(true)} />
                  )}
                  {routing && (
                    <window.RoutingPulse
                      candidates={routing.candidates}
                      finalAgent={routing.finalAgent}
                      avatarStyle={tweaks.avatarStyle}
                    />
                  )}
                  {messages.length <= 1 && (
                    <div className="examples">
                      <div className="examples-title">{window.t("examples_title")}</div>
                      <div className="examples-grid">
                        {examples.map((q, i) => (
                          <button key={i} className="example-chip" onClick={() => send(q)}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="chat-input-bar">
                <div className="chat-input-wrap">
                  <input
                    className="chat-input"
                    placeholder={window.t("chat_placeholder")}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                  />
                  <button className="btn-primary send-btn" onClick={() => send()} disabled={sending}>
                    {window.t("send")} ↵
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "community" && <window.CommunityBoard avatarStyle={tweaks.avatarStyle} />}
          {tab === "wiki" && <window.WikiPanel />}
          {tab === "tasks" && <window.TasksPanel avatarStyle={tweaks.avatarStyle} />}
        </main>

        {/* Right inspector */}
        <window.OrchestratorInspector
          open={inspectorOpen}
          onClose={() => setInspectorOpen(false)}
          lastTrace={lastTrace}
          avatarStyle={tweaks.avatarStyle}
        />
      </div>

      {/* ===== Tweaks Panel ===== */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title={lang === "ko" ? "에이전트 아바타" : "Agent avatars"}>
            <window.TweakRadio
              value={tweaks.avatarStyle}
              onChange={(v) => setTweak("avatarStyle", v)}
              options={[
                { value: "dot", label: lang === "ko" ? "점" : "Dot" },
                { value: "icon", label: lang === "ko" ? "아이콘" : "Icon" },
                { value: "illustration", label: lang === "ko" ? "일러스트" : "Illust." },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection title={lang === "ko" ? "데모 페르소나" : "Demo persona"}>
            <window.TweakRadio
              value={tweaks.persona}
              onChange={(v) => setTweak("persona", v)}
              options={[
                { value: "new", label: lang === "ko" ? "신입" : "New" },
                { value: "vet", label: lang === "ko" ? "경력" : "Senior" },
                { value: "mgr", label: lang === "ko" ? "팀장" : "Mgr" },
              ]}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
