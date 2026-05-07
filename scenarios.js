// Scenarios — canned demos. Each scenario has triggers (keywords),
// a routing hint, an answer body, and an action card with steps.
window.SCENARIOS = [
  // ============ SVPN ============
  {
    id: "svpn",
    agent: "it",
    triggers: ["svpn", "vpn", "외부접속", "원격", "remote", "외부 접속"],
    confidence: 0.94,
    minutesSaved: 18,
    tools: ["wiki.search", "itHelpdesk.openTicket", "form.prefill"],
    promptKo: "SVPN 신청하고 싶어",
    promptEn: "I need to apply for SVPN",
    answerKo:
      "SVPN(Standard VPN)은 사외에서 사내 시스템에 접근할 때 쓰는 사내 표준 VPN입니다. 일반 공중 VPN과 달리 IT에서 직접 운영합니다.\n\n신청 절차를 정리해뒀어요. 아래 카드에서 한 번에 진행할 수 있습니다.",
    answerEn:
      "SVPN (Standard VPN) is the company-operated VPN for accessing internal systems from outside. Unlike public VPNs, IT runs it directly.\n\nI prepared the application flow — you can run it from the card below.",
    actionTitleKo: "SVPN 신청",
    actionTitleEn: "SVPN application",
    steps: [
      { ko: "사용 목적과 기간 입력", en: "Enter purpose and duration", type: "form" },
      { ko: "장비 / IP 정보 확인", en: "Confirm device / IP info", type: "form" },
      { ko: "팀장 승인 요청 발송", en: "Send to manager for approval", type: "approval" },
      { ko: "접속 가이드 메일 수신", en: "Receive access guide via email", type: "notify" },
    ],
    related: ["it", "wiki"],
  },
  // ============ MEETING ROOM ============
  {
    id: "meeting",
    agent: "meeting",
    triggers: ["회의실", "예약", "화상회의", "meeting room", "book", "회의 잡"],
    confidence: 0.96,
    minutesSaved: 7,
    tools: ["calendar.findSlots", "meetingRoom.search", "meetingRoom.book"],
    promptKo: "내일 오후 4시에 6명 회의실 예약해줘",
    promptEn: "Book a 6-person meeting room tomorrow at 4pm",
    answerKo:
      "내일(2026.04.30) 16:00–17:00, 6명 수용 가능한 회의실 3곳을 찾았습니다. 화상회의 장비 포함 여부를 표시했어요.",
    answerEn:
      "Found 3 rooms for tomorrow (Apr 30) 4–5pm, capacity 6, with video-conf availability marked.",
    actionTitleKo: "회의실 후보",
    actionTitleEn: "Room options",
    customCard: "meetingRooms",
    rooms: [
      { name: "본관 7F · 한라", capacity: 8, vc: true, distance: "내 자리에서 도보 1분" },
      { name: "본관 12F · 백두", capacity: 6, vc: true, distance: "엘리베이터 4분" },
      { name: "별관 3F · 설악", capacity: 6, vc: false, distance: "도보 6분" },
    ],
    roomsEn: [
      { name: "Main 7F · Halla", capacity: 8, vc: true, distance: "1 min walk" },
      { name: "Main 12F · Baekdu", capacity: 6, vc: true, distance: "4 min via elevator" },
      { name: "Annex 3F · Seorak", capacity: 6, vc: false, distance: "6 min walk" },
    ],
    related: ["meeting", "wiki"],
  },
  // ============ BENEFITS ============
  {
    id: "benefits",
    agent: "benefits",
    triggers: ["복지", "복지포인트", "포인트", "혜택", "benefits", "welfare", "복지몰"],
    confidence: 0.92,
    minutesSaved: 12,
    tools: ["benefits.balance", "benefits.history", "wiki.lookup"],
    promptKo: "내 복지포인트 잔액 알려줘",
    promptEn: "What's my welfare points balance?",
    answerKo:
      "올해 잔여 복지포인트는 **820,000P** 입니다. 사용 만료는 2026년 12월 31일이에요. 지금까지 사용 내역과 추천 카테고리를 정리했습니다.",
    answerEn:
      "Your remaining welfare points this year: **820,000 P**. Expires Dec 31, 2026. Here's your usage so far + suggested categories.",
    actionTitleKo: "복지포인트 현황",
    actionTitleEn: "Welfare points overview",
    customCard: "benefits",
    benefits: {
      balance: 820000,
      total: 1500000,
      used: 680000,
      breakdown: [
        { ko: "건강검진", en: "Health checkup", amount: 320000 },
        { ko: "도서 구입", en: "Books", amount: 180000 },
        { ko: "스포츠 / 헬스", en: "Sports / fitness", amount: 120000 },
        { ko: "문화 / 영화", en: "Culture / movies", amount: 60000 },
      ],
    },
    related: ["benefits", "wiki"],
  },
  // ============ SHUTTLE ============
  {
    id: "shuttle",
    agent: "shuttle",
    triggers: ["셔틀", "버스", "shuttle", "강남", "역", "통근", "퇴근"],
    confidence: 0.95,
    minutesSaved: 5,
    tools: ["shuttle.schedule", "location.detect", "shuttle.live"],
    promptKo: "강남역에서 본사 가는 셔틀 다음 시간 알려줘",
    promptEn: "Next shuttle from Gangnam Station to HQ?",
    answerKo:
      "강남역 → 본사 셔틀 다음 출발은 **08:25** (5분 후)이에요. 이번 차는 7번 출구 앞이고, 현재 4호선 정체로 약 2분 지연 예상됩니다.",
    answerEn:
      "Next Gangnam → HQ shuttle: **08:25** (in 5 min). Pickup at Exit 7. ~2 min delay due to traffic.",
    actionTitleKo: "셔틀 시간표",
    actionTitleEn: "Shuttle schedule",
    customCard: "shuttle",
    shuttle: {
      route: "강남역 → 본사",
      routeEn: "Gangnam Stn → HQ",
      pickup: "강남역 7번 출구",
      pickupEn: "Gangnam Stn Exit 7",
      times: [
        { time: "08:25", live: true, delay: 2, label: "다음", labelEn: "Next" },
        { time: "08:55", live: false, delay: 0 },
        { time: "09:25", live: false, delay: 0 },
      ],
    },
    related: ["shuttle"],
  },
  // ============ ID CARD ============
  {
    id: "idcard",
    agent: "idcard",
    triggers: ["사원증", "출입증", "재발급", "분실", "id card", "badge"],
    confidence: 0.93,
    minutesSaved: 22,
    tools: ["hr.lookup", "idcard.requestReissue", "form.prefill"],
    promptKo: "사원증을 어제 분실했어요. 재발급 받고 싶어요",
    promptEn: "I lost my ID card yesterday. Need to reissue.",
    answerKo:
      "분실 신고 + 재발급을 한 번에 진행할 수 있습니다. 분실 사유는 자동으로 '분실/도난'으로 잡았고, 임시 출입증은 1층 안내데스크에서 즉시 받을 수 있어요.",
    answerEn:
      "I'll handle the lost-card report and reissue together. Reason auto-set to 'lost/stolen'. You can pick up a temporary pass at the 1F front desk now.",
    actionTitleKo: "사원증 재발급",
    actionTitleEn: "ID card reissue",
    steps: [
      { ko: "분실 신고서 자동 작성", en: "Auto-fill loss report", type: "form" },
      { ko: "재발급 신청 제출", en: "Submit reissue request", type: "submit" },
      { ko: "임시 출입증 1층 수령", en: "Pick up temporary pass at 1F", type: "physical" },
      { ko: "신규 사원증 3일 내 도착", en: "New card arrives in 3 days", type: "notify" },
    ],
    related: ["idcard", "hr"],
  },
];

// Simple intent matcher — looks at trigger keywords.
window.matchScenario = function (text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const sc of window.SCENARIOS) {
    let score = 0;
    for (const tr of sc.triggers) {
      if (lower.includes(tr.toLowerCase())) score += tr.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = sc;
    }
  }
  return bestScore > 0 ? best : null;
};
