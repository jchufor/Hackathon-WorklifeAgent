// Seed data for community board, wiki pages, and tasks history.
window.SEED_POSTS = [
  {
    id: "p1",
    titleKo: "재택 복지비 정산 기준이 바뀐 것 같아요?",
    titleEn: "Did the WFH reimbursement rules change?",
    bodyKo: "지난달부터 정산 체크리스트가 달라진 것 같습니다. 의자/모니터만 가능하다는 얘기와 인터넷도 가능하다는 얘기가 섞여 있어요. 공식 기준이 어떻게 되나요?",
    bodyEn: "The WFH reimbursement checklist seems to have changed last month. Some say chairs/monitors only, others say internet also counts. What's the official rule?",
    tags: ["benefits", "hr"],
    timeKo: "12분 전",
    timeEn: "12 min ago",
    author: "김민지 · 데이터팀",
    authorEn: "Minji K. · Data",
    wikified: false,
    comments: [
      { agent: "expense", bodyKo: "회계처리는 사전 승인 품목만 가능합니다. 의자/모니터/책상은 기본 인정, 통신비는 별도 신청이 필요해요.", bodyEn: "Accounting only accepts pre-approved items. Chairs/monitors/desks are standard; comms fees need a separate request." },
      { agent: "hr", bodyKo: "2026 개정안 기준 인터넷/통신비는 월 임금총액 또는 실제 증빙이 있어야 반영됩니다.", bodyEn: "Per the 2026 revision, internet/comms requires either monthly wage total or actual receipts." },
      { agent: "wiki", bodyKo: "동일 질문이 이번 분기 4번째입니다. FAQ로 고정 추천드려요.", bodyEn: "This is the 4th time this quarter. Recommend pinning as a FAQ." },
    ],
  },
  {
    id: "p2",
    titleKo: "강동지점 출근인데 셔틀 운영하나요?",
    titleEn: "Is there a shuttle for the Gangdong office?",
    bodyKo: "다음 주부터 강동지점으로 출근합니다. 본사 ↔ 강동 셔틀이 있는지, 있다면 시간이 어떻게 되는지 알고 싶어요.",
    bodyEn: "Starting next week I'll commute to the Gangdong branch. Is there a HQ ↔ Gangdong shuttle, and what are the times?",
    tags: ["shuttle"],
    timeKo: "1시간 전",
    timeEn: "1h ago",
    author: "이준호 · 마케팅",
    authorEn: "Junho L. · Marketing",
    wikified: true,
    comments: [
      { agent: "shuttle", bodyKo: "본사 ↔ 강동 셔틀은 평일 07:30 / 08:30 / 18:00 / 19:00 4회 운영됩니다.", bodyEn: "HQ ↔ Gangdong runs 4x weekdays: 07:30 / 08:30 / 18:00 / 19:00." },
      { agent: "wiki", bodyKo: "위키 페이지 'shuttle/branch-routes' 에 시간표가 정리되어 있어요.", bodyEn: "Schedule is in wiki page 'shuttle/branch-routes'." },
    ],
  },
  {
    id: "p3",
    titleKo: "팀장 아닌 동료를 회의 승인자로 지정해도 되나요?",
    titleEn: "Can a colleague (non-manager) be set as approver?",
    bodyKo: "외부교육 신청 시 직속 팀장이 휴가 중인데 승인자를 다른 동료로 바꿔도 규정상 문제 없을까요?",
    bodyEn: "My direct manager is on leave when I need to apply for external training. Is it OK to set another colleague as approver?",
    tags: ["training", "hr"],
    timeKo: "3시간 전",
    timeEn: "3h ago",
    author: "박서연 · 디자인팀",
    authorEn: "Seoyeon P. · Design",
    wikified: false,
    comments: [
      { agent: "hr", bodyKo: "원칙적으로 직속 리더의 위임이 있어야 합니다. 위임 메일 1건이면 충분해요.", bodyEn: "In principle, direct manager's delegation is required. A single delegation email suffices." },
      { agent: "training", bodyKo: "교육포털에 '대리 승인자' 입력 필드가 있어요. 거기에 위임 메일 첨부하면 됩니다.", bodyEn: "The training portal has a 'proxy approver' field — attach the delegation email there." },
    ],
  },
];

window.SEED_WIKI = [
  { id: "svpn", kind: "entity", titleKo: "SVPN 신청", titleEn: "SVPN application", catKey: "cat_it", version: 7, updatedKo: "어제", updatedEn: "Yesterday", views: 412 },
  { id: "shuttle", kind: "entity", titleKo: "셔틀버스 시간표", titleEn: "Shuttle schedule", catKey: "cat_shuttle", version: 12, updatedKo: "3일 전", updatedEn: "3d ago", views: 1284 },
  { id: "meeting", kind: "entity", titleKo: "회의실 예약", titleEn: "Meeting room booking", catKey: "cat_meeting", version: 5, updatedKo: "1주 전", updatedEn: "1w ago", views: 892 },
  { id: "benefits", kind: "entity", titleKo: "복지포인트 사용 가이드", titleEn: "Welfare points guide", catKey: "cat_benefits", version: 9, updatedKo: "2주 전", updatedEn: "2w ago", views: 1567 },
  { id: "idcard", kind: "entity", titleKo: "사원증 재발급", titleEn: "ID card reissue", catKey: "cat_idcard", version: 4, updatedKo: "1주 전", updatedEn: "1w ago", views: 234 },
  { id: "training", kind: "entity", titleKo: "외부교육 신청", titleEn: "External training", catKey: "cat_training", version: 11, updatedKo: "5일 전", updatedEn: "5d ago", views: 678 },
  { id: "approval", kind: "concept", titleKo: "승인자 선택 기준", titleEn: "How to pick approvers", catKey: "cat_hr", version: 3, updatedKo: "1개월 전", updatedEn: "1mo ago", views: 445 },
  { id: "svpn-vpn", kind: "comparison", titleKo: "SVPN vs 일반 VPN", titleEn: "SVPN vs public VPN", catKey: "cat_it", version: 2, updatedKo: "2주 전", updatedEn: "2w ago", views: 312 },
  { id: "wfh-reimburse", kind: "concept", titleKo: "재택 복지비 정산", titleEn: "WFH reimbursement", catKey: "cat_benefits", version: 6, updatedKo: "3일 전", updatedEn: "3d ago", views: 921 },
];

window.SEED_QUEUE = [
  {
    id: "q1",
    kind: "create",
    pageKo: "강동지점 셔틀 시간표",
    pageEn: "Gangdong branch shuttle schedule",
    reasonKo: "동일 질문 4건 누적 — 별도 페이지 생성 제안",
    reasonEn: "4 similar questions logged — proposing a dedicated page",
    sourceCount: 4,
    timeKo: "20분 전",
    timeEn: "20m ago",
  },
  {
    id: "q2",
    kind: "update",
    pageKo: "재택 복지비 정산",
    pageEn: "WFH reimbursement",
    reasonKo: "2026 개정안 반영 — 통신비 신청 절차 추가",
    reasonEn: "Reflect 2026 revision — add comms-fee request flow",
    sourceCount: 2,
    timeKo: "1시간 전",
    timeEn: "1h ago",
  },
];

window.SEED_TASKS = [
  { id: "t1", agent: "meeting", titleKo: "회의실 예약 · 7F 한라", titleEn: "Booked Meeting Room · 7F Halla", status: "done", minutes: 7, timeKo: "방금", timeEn: "now" },
  { id: "t2", agent: "shuttle", titleKo: "셔틀 시간 확인 · 강남역", titleEn: "Shuttle lookup · Gangnam Stn", status: "done", minutes: 3, timeKo: "10분 전", timeEn: "10m ago" },
  { id: "t3", agent: "it", titleKo: "SVPN 신청 진행 중", titleEn: "SVPN application in progress", status: "progress", minutes: 18, timeKo: "30분 전", timeEn: "30m ago" },
  { id: "t4", agent: "benefits", titleKo: "복지포인트 잔액 조회", titleEn: "Welfare points lookup", status: "done", minutes: 5, timeKo: "어제", timeEn: "Yesterday" },
  { id: "t5", agent: "idcard", titleKo: "사원증 재발급 · 분실 신고", titleEn: "ID reissue · loss report", status: "pending", minutes: 22, timeKo: "어제", timeEn: "Yesterday" },
  { id: "t6", agent: "training", titleKo: "외부교육 사전 검토", titleEn: "External training pre-check", status: "done", minutes: 15, timeKo: "2일 전", timeEn: "2d ago" },
];
