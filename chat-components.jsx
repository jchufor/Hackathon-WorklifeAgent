/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ============== Avatar (3 styles: dot / icon / illustration) ==============
function AgentAvatar({ agent, style = "icon", size = 32 }) {
  if (!agent) return null;
  const s = size;
  if (style === "dot") {
    return (
      <span style={{
        display: "inline-block", width: s * 0.42, height: s * 0.42,
        borderRadius: "50%", background: agent.color,
        boxShadow: `0 0 0 ${s * 0.12}px ${agent.color}22`,
        flexShrink: 0,
      }} />
    );
  }
  if (style === "illustration") {
    // Layered ring + glyph + soft halo
    return (
      <span style={{
        display: "inline-grid", placeItems: "center",
        width: s, height: s, flexShrink: 0,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 25%, ${agent.color}33, ${agent.color}11 60%, transparent)`,
        border: `1.5px solid ${agent.color}66`,
        position: "relative",
      }}>
        <span style={{
          position: "absolute", inset: 3,
          borderRadius: "50%",
          background: `linear-gradient(140deg, #fff, ${agent.color}18)`,
          border: `1px solid ${agent.color}33`,
        }} />
        <span style={{ position: "relative", fontSize: s * 0.5 }}>{agent.glyph}</span>
      </span>
    );
  }
  // icon (default) — clean pill with glyph
  return (
    <span style={{
      display: "inline-grid", placeItems: "center",
      width: s, height: s, flexShrink: 0,
      borderRadius: s * 0.32,
      background: `${agent.color}14`,
      color: agent.color,
      fontSize: s * 0.5,
      border: `1px solid ${agent.color}28`,
    }}>{agent.glyph}</span>
  );
}

// ============== Chat Message ==============
function ChatMessage({ msg, avatarStyle, onShowInspector }) {
  const lang = window.WL_LANG;
  const agent = window.AGENT_BY_ID[msg.agentId];
  if (msg.role === "user") {
    return (
      <div className="msg-row user">
        <div className="msg-bubble user">{msg.text}</div>
      </div>
    );
  }
  return (
    <div className="msg-row bot">
      <AgentAvatar agent={window.AGENT_BY_ID.orchestrator} style={avatarStyle} size={36} />
      <div className="msg-content">
        <div className="msg-meta">
          <span className="msg-name">{window.t("brand_name")}</span>
          {msg.routedTo && agent && (
            <button className="msg-route" onClick={() => onShowInspector && onShowInspector(msg)}>
              <span className="route-dot" style={{ background: agent.color }} />
              {window.t("handled_by")} · {window.agentName(agent)}
            </button>
          )}
          {msg.elapsed && <span className="msg-time">{msg.elapsed}ms</span>}
        </div>
        <div className="msg-bubble bot" dangerouslySetInnerHTML={{ __html: msg.html }} />
        {msg.actionCard && <ActionCard card={msg.actionCard} scenario={msg.scenario} />}
      </div>
    </div>
  );
}

// ============== Routing Pulse (animated) ==============
function RoutingPulse({ candidates, finalAgent, avatarStyle }) {
  const lang = window.WL_LANG;
  return (
    <div className="routing-pulse">
      <div className="routing-line">
        <AgentAvatar agent={window.AGENT_BY_ID.orchestrator} style={avatarStyle} size={28} />
        <span className="routing-label">{window.t("routing")}</span>
        <span className="routing-dots"><span /><span /><span /></span>
      </div>
      <div className="routing-candidates">
        {candidates.map((id, i) => {
          const a = window.AGENT_BY_ID[id];
          const isFinal = id === finalAgent;
          return (
            <span
              key={id}
              className={"route-chip" + (isFinal ? " final" : "")}
              style={{
                "--c": a.color,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <AgentAvatar agent={a} style="dot" size={14} />
              {window.agentName(a)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ============== Action Card ==============
function ActionCard({ card, scenario }) {
  const lang = window.WL_LANG;
  const [doneSteps, setDoneSteps] = useState(new Set());

  if (scenario && scenario.customCard === "meetingRooms") {
    const rooms = lang === "ko" ? scenario.rooms : scenario.roomsEn;
    return (
      <div className="action-card">
        <div className="action-head">
          <span className="action-kicker">{window.t("action_title")}</span>
          <span className="action-title">{lang === "ko" ? scenario.actionTitleKo : scenario.actionTitleEn}</span>
        </div>
        <div className="room-grid">
          {rooms.map((r, i) => (
            <div key={i} className="room-card">
              <div className="room-name">{r.name}</div>
              <div className="room-meta">
                <span>{lang === "ko" ? `${r.capacity}명` : `${r.capacity} ppl`}</span>
                <span className={r.vc ? "vc-yes" : "vc-no"}>{r.vc ? (lang === "ko" ? "화상회의 ✓" : "VC ✓") : (lang === "ko" ? "화상회의 ✗" : "VC ✗")}</span>
                <span>{r.distance}</span>
              </div>
              <button className="btn-primary sm">{window.t("action_book")}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (scenario && scenario.customCard === "shuttle") {
    const sh = scenario.shuttle;
    return (
      <div className="action-card">
        <div className="action-head">
          <span className="action-kicker">{window.t("action_title")}</span>
          <span className="action-title">{lang === "ko" ? scenario.actionTitleKo : scenario.actionTitleEn}</span>
        </div>
        <div className="shuttle-route">{lang === "ko" ? sh.route : sh.routeEn} · {lang === "ko" ? sh.pickup : sh.pickupEn}</div>
        <div className="shuttle-times">
          {sh.times.map((t, i) => (
            <div key={i} className={"shuttle-time" + (t.live ? " live" : "")}>
              <div className="st-time">{t.time}</div>
              {t.live && <div className="st-live">● {lang === "ko" ? "실시간" : "live"}</div>}
              {t.delay > 0 && <div className="st-delay">+{t.delay}{window.t("minutes_unit") || (lang === "ko" ? "분" : "m")}</div>}
              {i === 0 && <div className="st-label">{lang === "ko" ? "다음" : "Next"}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (scenario && scenario.customCard === "benefits") {
    const b = scenario.benefits;
    const pct = (b.balance / b.total) * 100;
    return (
      <div className="action-card">
        <div className="action-head">
          <span className="action-kicker">{window.t("action_title")}</span>
          <span className="action-title">{lang === "ko" ? scenario.actionTitleKo : scenario.actionTitleEn}</span>
        </div>
        <div className="benefits-balance">
          <div className="bb-num">{b.balance.toLocaleString()}<span>P</span></div>
          <div className="bb-bar"><span style={{ width: `${pct}%` }} /></div>
          <div className="bb-meta">{lang === "ko" ? `총 ${b.total.toLocaleString()}P 중 ${b.used.toLocaleString()}P 사용` : `Used ${b.used.toLocaleString()} of ${b.total.toLocaleString()} P`}</div>
        </div>
        <div className="benefits-breakdown">
          {b.breakdown.map((row, i) => (
            <div key={i} className="bb-row">
              <span>{lang === "ko" ? row.ko : row.en}</span>
              <span className="bb-amount">{row.amount.toLocaleString()}P</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: stepped wizard
  const steps = scenario ? scenario.steps : (card.steps || []);
  return (
    <div className="action-card">
      <div className="action-head">
        <span className="action-kicker">{window.t("action_title")}</span>
        <span className="action-title">{scenario ? (lang === "ko" ? scenario.actionTitleKo : scenario.actionTitleEn) : card.title}</span>
      </div>
      <ol className="action-steps">
        {steps.map((s, i) => {
          const label = lang === "ko" ? s.ko : s.en;
          const done = doneSteps.has(i);
          return (
            <li key={i} className={"action-step" + (done ? " done" : "")}>
              <span className="step-num">{done ? "✓" : i + 1}</span>
              <span className="step-label">{label}</span>
              <span className="step-type">{s.type}</span>
              <button className="step-btn" onClick={() => {
                const next = new Set(doneSteps); next.add(i); setDoneSteps(next);
              }}>{done ? window.t("action_done") : window.t("action_run")}</button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

window.ChatMessage = ChatMessage;
window.RoutingPulse = RoutingPulse;
window.ActionCard = ActionCard;
window.AgentAvatar = AgentAvatar;
