/* Demo simulation data — add new simulations by appending objects to this array.
   No other files need to change when adding simulation #3, #4, etc. */
window.DEMO_SIMULATIONS = [
  {
    id: "shuttle_after_work",
    emoji: "🚌",
    titleKo: "퇴근 셔틀 경로 추천",
    titleEn: "Best shuttle home after work",
    descKo: "홍대 방향 퇴근 시 셔틀 옵션 비교",
    descEn: "Compare shuttle options toward Hongdae",
    steps: [
      {
        userKo: "오늘 퇴근하고 홍대 쪽으로 가고 싶은데, 셔틀 어떻게 돼?",
        userEn: "I want to head to Hongdae after work today — what shuttle options do I have?",
        delayMs: 1400,
        agentId: "shuttle",
        minutesSaved: 8,
        tools: ["shuttle.schedule", "transit.search"],
        elapsed: 590,
        botHtmlKo: "홍대 방향으로 퇴근하는 셔틀 옵션 두 가지를 찾았어요.<br><br><b>옵션 1 — 빠른 경로:</b> 잠실역행 셔틀 (17:10 첫차 / 17:20 막차) → 잠실역 2호선 내선 환승 → 홍대입구역. 총 약 45분.<br><b>옵션 2 — 편한 경로:</b> 합정역행 직행 셔틀 (17:27 첫차 / 17:30 막차) → 합정역 하차 후 홍대입구까지 도보 7분. 총 약 50분이지만 거의 전 구간 착석 가능.",
        botHtmlEn: "Found two shuttle options toward Hongdae after work.<br><br><b>Option 1 — Faster:</b> Shuttle to Jamsil Stn (first: 17:10 / last: 17:20) → transfer to Line 2 (inbound) → Hongdae Stn. ~45 min total.<br><b>Option 2 — More comfortable:</b> Direct shuttle to Hapjeong (first: 17:27 / last: 17:30) → 7-min walk to Hongdae. ~50 min but seated most of the way.",
        actionCard: {
          title: "퇴근 셔틀 옵션 (홍대 방향)",
          titleEn: "Shuttle options — toward Hongdae",
          steps: [
            { ko: "잠실역행 셔틀 17:10 / 17:20 → 2호선 내선 환승 → 홍대입구역", en: "Shuttle to Jamsil 17:10 / 17:20 → Line 2 inbound → Hongdae Stn", type: "route" },
            { ko: "합정역행 직행 셔틀 17:27 / 17:30 → 합정역 하차 → 홍대입구 도보 7분", en: "Direct shuttle to Hapjeong 17:27 / 17:30 → walk 7 min to Hongdae", type: "route" }
          ]
        }
      },
      {
        userKo: "제일 빠른 방법이 뭐야?",
        userEn: "What's the fastest option?",
        delayMs: 2000,
        agentId: "shuttle",
        minutesSaved: 0,
        tools: ["shuttle.live", "transit.eta"],
        elapsed: 480,
        botHtmlKo: "<b>잠실역행 17:20 셔틀</b>이 가장 빠릅니다.<br><br>셔틀로 잠실역까지 약 15분, 2호선 내선을 타면 홍대입구까지 약 30분. 총 <b>약 45분</b>. 잠실역에서 탈 때 이 시간대는 자리가 날 확률 약 70%예요. 첫차(17:10)를 타면 여유석이 더 많습니다.",
        botHtmlEn: "The <b>17:20 shuttle to Jamsil</b> is fastest.<br><br>~15 min to Jamsil Station, then ~30 min on Line 2 inbound to Hongdae. <b>Total ~45 min.</b> Seat availability at Jamsil this time of day is around 70%. Taking the first bus (17:10) gives you a better shot at a seat.",
        actionCard: null
      },
      {
        userKo: "좀 더 편하게 가는 방법은?",
        userEn: "What about the more comfortable option?",
        delayMs: 2200,
        agentId: "shuttle",
        minutesSaved: 0,
        tools: ["shuttle.schedule", "shuttle.occupancy"],
        elapsed: 510,
        botHtmlKo: "<b>합정역행 17:30 셔틀</b>이 편한 선택이에요.<br><br>첫차는 17:27에 출발하니 조금 더 일찍 탈 수도 있어요. 본사 앞에서 승차해 합정역까지 거의 전 구간 착석 가능하고, 내려서 홍대입구까지 도보 약 7분. 총 <b>약 50분</b>으로 잠실 경로보다 5~7분 더 걸리지만, 지하철 환승 없이 편하게 갈 수 있어요.",
        botHtmlEn: "The <b>17:30 shuttle to Hapjeong</b> is the comfortable option.<br><br>There's also a first bus at 17:27 if you're ready a bit earlier. You stay seated for almost the entire ride, then it's a 7-min walk from Hapjeong Station to Hongdae. <b>Total ~50 min</b> — about 5–7 minutes more than the Jamsil route, but no subway transfer.",
        actionCard: null
      }
    ]
  },
  {
    id: "pc_export",
    emoji: "💻",
    titleKo: "PC 반출 신청",
    titleEn: "How to take your PC out of the office",
    descKo: "온라인 신청 vs 종이 서류 방법 안내",
    descEn: "Online application vs. paper form walkthrough",
    steps: [
      {
        userKo: "회사 PC를 밖으로 들고 나가고 싶어요. 어떻게 해야 해요?",
        userEn: "I need to take my work PC out of the office. How do I do that?",
        delayMs: 1200,
        agentId: "it",
        minutesSaved: 15,
        tools: ["wiki.search", "policy.lookup"],
        elapsed: 640,
        botHtmlKo: "PC를 외부로 반출할 때는 <b>온라인 신청</b> 또는 <b>종이 서류</b> 두 가지 방법이 있어요.<br><br><b>온라인 신청</b>: Knox Portal 또는 NASCA 아이콘으로 신청 — 즉시 승인.<br><b>종이 서류</b>: 양식을 출력해 작성 후 보안실에 제출.<br><br>두 방법 모두 퇴근 시 보안 게이트에서 사원증 태그 후 경비에게 노트북을 보여주면 기기 번호 확인 후 통과할 수 있어요.",
        botHtmlEn: "There are two ways to carry your PC out of the office: <b>online application</b> or a <b>paper form</b>.<br><br><b>Online</b>: Apply via Knox Portal or the NASCA icon — approval is immediate.<br><b>Paper</b>: Print and fill out the form, then hand it to security.<br><br>Either way, at the security gate on your way out: tap your ID card, then show the laptop to the guard — they'll verify the serial number against the registered application.",
        actionCard: null
      },
      {
        userKo: "온라인 신청은 어떻게 해요?",
        userEn: "How does the online application work?",
        delayMs: 2000,
        agentId: "it",
        minutesSaved: 0,
        tools: ["portal.navigate", "form.prefill"],
        elapsed: 580,
        botHtmlKo: "온라인 신청은 두 가지 경로로 진행할 수 있어요 — 방법 A 또는 B 중 편한 걸로 하시면 되고, 이후 입력 단계는 동일합니다.<br><br>신청 완료 시 즉시 승인되며, 퇴근 시 보안 게이트에서 사원증 태그 후 경비에게 노트북을 보여주시면 돼요. 아래 카드를 참고하세요.",
        botHtmlEn: "Online application works via either path — Method A or B, your choice. The form fields after clicking 'PC 반출 신청' are identical either way.<br><br>Approval is immediate on submission. On the way out, tap your ID at the security gate and show the laptop to the guard for serial number verification. See the card below.",
        actionCard: {
          title: "PC 반출 온라인 신청",
          titleEn: "PC carry-out — online application",
          steps: [
            { ko: "[방법 A] Knox Portal → 퀵링크 → IT Helpdesk → 'PC 반출 신청' 클릭", en: "[Method A] Knox Portal → Quick Link → IT Helpdesk → click 'PC 반출 신청'", type: "form" },
            { ko: "[방법 B] 또는: 작업표시줄 숨겨진 아이콘 ^ → NASCA 아이콘 우클릭 → 'PC 반출 신청' 선택", en: "[Method B] Or: taskbar hidden icons ^ → right-click NASCA icon → select 'PC 반출 신청'", type: "form" },
            { ko: "사용 목적 입력 예시: '고객사 미팅'", en: "Purpose (example): 'Client meeting'", type: "form" },
            { ko: "반출 기간 입력 예시: '1일 (당일 복귀)'", en: "Duration (example): '1 day (same-day return)'", type: "form" },
            { ko: "기기 시리얼 번호: 노트북 하단 스티커에서 확인", en: "Serial number: check sticker on the bottom of the laptop", type: "form" },
            { ko: "신청 완료 → 즉시 승인", en: "Submit → instant approval", type: "submit" },
            { ko: "퇴근 시 보안 게이트: 사원증 태그 + 경비에게 노트북 제시 (시리얼 번호 확인)", en: "At security gate: tap ID card + show laptop to guard (serial number check)", type: "physical" }
          ]
        }
      },
      {
        userKo: "종이 서류로 하면 어떻게 해?",
        userEn: "What if I want to use the paper form instead?",
        delayMs: 2000,
        agentId: "it",
        minutesSaved: 0,
        tools: ["form.download", "wiki.lookup"],
        elapsed: 520,
        botHtmlKo: "종이 서류 방법도 간단해요. Knox Portal에서 양식을 다운로드해 출력하거나, 1층 안내데스크에서 직접 받을 수도 있어요.<br><br>작성 내용은 온라인 신청과 동일합니다 (목적, 기간, 시리얼 번호). 퇴근 전 보안실에 제출하고 스탬프를 받은 후, 게이트에서 서류와 노트북을 함께 보여주시면 돼요.",
        botHtmlEn: "The paper route is straightforward too. Download the form from Knox Portal or pick one up at the 1F front desk.<br><br>Fill in the same fields as the online form (purpose, duration, serial number). Submit to the security office before leaving — they'll stamp it. At the gate, show the stamped form along with the laptop.",
        actionCard: {
          title: "PC 반출 종이 서류",
          titleEn: "PC carry-out — paper form",
          steps: [
            { ko: "Knox Portal → IT Helpdesk → 양식 다운로드 클릭", en: "Knox Portal → IT Helpdesk → click form download", type: "form" },
            { ko: "출력 후 수기 작성: 목적 / 반출 기간 / 시리얼 번호 (온라인과 동일 내용)", en: "Print and fill in: purpose / duration / serial number (same as online form)", type: "form" },
            { ko: "퇴근 전 1층 보안실 담당자에게 서류 제출 → 스탬프 수령", en: "Before leaving: submit form to security officer at 1F → receive stamp", type: "physical" },
            { ko: "보안 게이트: 스탬프 서류 + 노트북 제시 → 통과", en: "Security gate: show stamped form + laptop → cleared to exit", type: "physical" }
          ]
        }
      }
    ]
  },
  {
    id: "visitor_pass",
    emoji: "🪪",
    titleKo: "외부손님 출입증 + 주차 + 회의실",
    titleEn: "Visitor pass + parking + meeting room",
    descKo: "사원증 → 주차권 → 회의실/식당 다중 에이전트 처리",
    descEn: "Idcard → Parking → Meeting/Cafeteria multi-agent flow",
    steps: [
      {
        userKo: "이번주 금요일에 외부손님이 우리 부서에 오는데, 외부인 출입증 신청은 어떻게 해?",
        userEn: "We have an external visitor coming to our team this Friday — how do I request a guest access pass?",
        delayMs: 1300,
        agentId: "idcard",
        minutesSaved: 25,
        tools: ["idcard.policy", "visitor.lookup", "wiki.search"],
        elapsed: 580,
        botHtmlKo: "일회성 외부인 출입은 <b>'임시 사원증' 발급</b>으로 처리할 수 있어요.<br><br><b>방법</b>: 방문객 예약사이트에 내방객 정보와 일시를 입력 → 당일 1층 안내데스크에서 신분증 확인 후 임시 사원증 발급.<br><br>아래 정보를 알려주시면 제가 대신 신청해드릴 수도 있어요. <b>신청 페이지로 연결</b>해드릴까요, 아니면 <b>대리 신청</b>을 도와드릴까요?<br>· 내방객 성명<br>· 내방객 핸드폰 번호<br>· 방문 일시",
        botHtmlEn: "One-off visitor access is handled via <b>temporary ID issuance</b>.<br><br><b>How</b>: enter visitor info + date on the Visitor Reservation site → on the day, the 1F front desk verifies ID and issues a temporary pass.<br><br>If you share the info below, I can also file it for you. Want me to <b>open the application page</b>, or <b>file it on your behalf</b>?<br>· Visitor name<br>· Visitor mobile<br>· Visit date/time",
        actionCard: null
      },
      {
        userKo: "대리로 신청해줘. 한국종합기술 소속 김한국씨, 010-XXXX-XXXX, 5/25 12:00–17:00이야.",
        userEn: "Please file it on my behalf — Mr. Kim Hanguk from Hankook General Tech, 010-XXXX-XXXX, 5/25 12:00–17:00.",
        delayMs: 1800,
        agentId: "idcard",
        minutesSaved: 0,
        tools: ["visitor.book", "idcard.issueTemp", "calendar.write"],
        elapsed: 620,
        botHtmlKo: "<b>요청하신 시간대에 방문객 예약을 완료했어요.</b><br><br>· 내방객: 한국종합기술 김한국<br>· 일시: 5/25 (금) 12:00–17:00<br>· 임시 사원증은 당일 1층 안내데스크에서 본인 신분증 확인 후 수령<br><br>참고로 약 5시간 정도 사옥에 머무르시는데, <b>내방객 주차 지원이 필요하신가요?</b> 필요하시면 주차권 에이전트로 연결해드릴게요.",
        botHtmlEn: "<b>Visitor reservation booked for the requested window.</b><br><br>· Visitor: Hankook General Tech, Mr. Kim Hanguk<br>· When: Fri 5/25, 12:00–17:00<br>· Temporary ID will be issued at the 1F front desk on arrival after photo-ID verification<br><br>Since the visit is around 5 hours, <b>do you also need visitor parking?</b> If yes, I'll hand off to the Parking Agent.",
        actionCard: {
          title: "방문객 예약 완료",
          titleEn: "Visitor reservation confirmed",
          steps: [
            { ko: "방문객 예약사이트에 정보 입력 (한국종합기술 · 김한국 · 5/25 12:00–17:00)", en: "Visitor portal entry (Hankook General Tech · Kim Hanguk · 5/25 12:00–17:00)", type: "form" },
            { ko: "예약 등록 완료 — 당일 1층 안내데스크에서 임시 사원증 수령", en: "Reservation submitted — pick up temporary ID at 1F front desk on arrival", type: "submit" },
            { ko: "내방객에게 안내 메시지 발송 (위치 · 도착 절차)", en: "Send guidance message to visitor (location, arrival steps)", type: "notify" }
          ]
        }
      },
      {
        userKo: "응, 주차도 도와줘. 차량번호 12가 3456, 방문 목적은 협력사 미팅이야.",
        userEn: "Yes, help with parking. Plate 12가 3456, purpose: partner meeting.",
        delayMs: 1900,
        agentId: "parking",
        minutesSaved: 0,
        tools: ["parking.register", "approval.submit", "hr.lookup"],
        elapsed: 600,
        botHtmlKo: "안녕하세요, <b>주차권 에이전트</b>입니다. 5/25 한국종합기술 김한국씨가 업무 목적으로 GEC에 내방하시는군요. 주차권 등록을 진행할게요.<br><br>참고로 내방객 주차권은 '업무 목적'으로 사옥에 <b>2시간 이상</b> 체류하는 내방객에게 제공되는 메뉴이고, <b>부서장 승인</b>이 필요해요. 사원증 에이전트로부터 받은 정보 + 알려주신 차량번호/방문 목적으로 결재를 대신 상신해드릴게요.",
        botHtmlEn: "Hi, this is the <b>Parking Agent</b>. Mr. Kim Hanguk (Hankook General Tech) visiting GEC on 5/25 for business — registering the parking pass now.<br><br>Note: visitor parking is available for business-purpose visits of <b>2+ hours</b>, and requires <b>department head approval</b>. I'll combine the info from the ID Card Agent with your plate/purpose and file the approval on your behalf.",
        actionCard: {
          title: "주차권 결재 상신",
          titleEn: "Parking approval submission",
          steps: [
            { ko: "주차권 신청서 자동 작성 (차량 12가 3456 · 협력사 미팅 · 5/25 12:00–17:00)", en: "Pre-fill parking request (plate 12가 3456 · partner meeting · 5/25 12:00–17:00)", type: "form" },
            { ko: "부서장 결재 라인 자동 설정", en: "Auto-set approval chain to department head", type: "approval" },
            { ko: "결재 상신 완료 — 부서장 승인 대기", en: "Submitted — pending department head approval", type: "submit" },
            { ko: "승인 완료 시 방문객에게 주차 안내 메시지 자동 발송", en: "On approval, auto-send parking guidance to the visitor", type: "notify" }
          ]
        }
      },
      {
        userKo: "회의실이랑 점심 식사도 같이 잡아줘.",
        userEn: "Can you also book a meeting room and lunch?",
        delayMs: 2100,
        agentId: "meeting",
        minutesSaved: 0,
        tools: ["meeting.book", "meals.reserve", "notify.guest"],
        elapsed: 540,
        botHtmlKo: "회의실과 점심 모두 잡았어요.<br><br>· <b>회의실</b>: 본관 7F · 한라 (정원 8 · 화상회의 ✓) — 5/25 13:00–15:00<br>· <b>점심</b>: 사내식당 12:00–12:50 (2인) 예약<br><br>내방객 김한국씨에게 안내 메시지(위치 · 시간 · 임시 사원증 수령 절차 · 주차 정보)를 한 번에 전송했습니다. 추가로 필요하신 게 있으면 말씀해주세요!",
        botHtmlEn: "Booked both.<br><br>· <b>Meeting room</b>: Main 7F · Halla (cap 8 · video conf ✓) — 5/25 13:00–15:00<br>· <b>Lunch</b>: in-house cafeteria 12:00–12:50 (party of 2)<br><br>Sent a single guidance message to Mr. Kim Hanguk covering location, times, temporary ID pickup steps, and parking. Let me know if anything else is needed!",
        actionCard: {
          title: "회의실 + 점심 예약 완료",
          titleEn: "Meeting room + lunch booked",
          steps: [
            { ko: "본관 7F 한라 회의실 13:00–15:00 예약 (화상회의 셋업 포함)", en: "Main 7F Halla room booked 13:00–15:00 (video conf set up)", type: "submit" },
            { ko: "사내식당 점심 12:00–12:50 (2인) 예약", en: "Cafeteria lunch booked 12:00–12:50 (party of 2)", type: "submit" },
            { ko: "내방객 김한국씨에게 통합 안내 메시지 발송", en: "Send unified guidance message to visitor Kim Hanguk", type: "notify" }
          ]
        }
      }
    ]
  },
  {
    id: "external_training",
    emoji: "🎓",
    titleKo: "사외교육 신청",
    titleEn: "External training application",
    descKo: "사전보고 → CIC 플랫폼 연결 → 사후 결과보고 안내",
    descEn: "Pre-report → CIC portal handoff → post-report reminder",
    steps: [
      {
        userKo: "내가 최근에 OO업무를 하면서 관심이 있는 분야가 생겼는데, 사외교육을 가고 싶은데 어떻게 해야 할까?",
        userEn: "I've gotten interested in a topic through my recent work — how do I go about taking an external training course?",
        delayMs: 1300,
        agentId: "training",
        minutesSaved: 20,
        tools: ["training.policy", "hr.contact", "wiki.search"],
        elapsed: 600,
        botHtmlKo: "안녕하세요, <b>사외교육 에이전트</b>입니다. 사외교육을 가시려면 두 가지를 먼저 검토해야 해요.<br><br><b>1) 입과 적정성</b> — 업무 유관도<br><b>2) 비용 구비 여부</b> — 부서 경영계획 비용 활용 가능 여부<br><br>두 가지 모두 <b>소속 사업부 교육담당자(예: 00부서 000프로)</b>에게 문의하면 현황을 확인하실 수 있어요. 작년 경영계획 수립 시점에 사외교육 비용을 제출하셨다면 이미 반영되어 있을 확률이 높아요. 담당자 확인 후 다음 단계를 안내해드릴게요!",
        botHtmlEn: "Hi, this is the <b>External Training Agent</b>. Two things need to be checked first:<br><br><b>1) Eligibility</b> — relevance to your work<br><b>2) Budget availability</b> — whether your department's plan covers the cost<br><br>Both can be confirmed with your <b>division's training coordinator</b> (e.g., Pro 000 in Dept 00). If you submitted external-training costs during last year's planning cycle, it's likely already budgeted. Let me know once you've checked and I'll walk you through the next step.",
        actionCard: null
      },
      {
        userKo: "교육담당자랑 이미 얘기 끝냈어. 다음 단계 알려줘.",
        userEn: "I already spoke with the training coordinator. What's next?",
        delayMs: 1700,
        agentId: "training",
        minutesSaved: 0,
        tools: ["cic.platform", "training.preReport", "manual.open"],
        elapsed: 510,
        botHtmlKo: "그러면 <b>CIC 플랫폼</b>을 통해 사외교육 사전보고를 진행하시면 돼요.<br><br>사전보고는 입력 항목이 많아서 제가 대리로 입력해드리는 것보다는 직접 입력하시는 편이 효율적이에요. 대신 <b>해당 페이지로 바로 연결</b>해드리고, <b>사외교육 입과 매뉴얼 최신본</b>을 별도 페이지로 함께 띄워드릴게요.",
        botHtmlEn: "Next step: file the pre-report via the <b>CIC platform</b>.<br><br>The pre-report has a lot of fields, so it's faster for you to fill it in directly than for me to file by proxy. I'll <b>open the page directly</b> and pop up the <b>latest external-training enrollment manual</b> in a side panel for reference.",
        actionCard: {
          title: "사외교육 사전보고 — CIC 연결",
          titleEn: "Pre-report — open in CIC",
          steps: [
            { ko: "CIC 플랫폼 접속", en: "Open CIC platform", type: "form" },
            { ko: "My Learning → 학습실적 → 사외교육 메뉴로 이동", en: "My Learning → Records → External Training", type: "form" },
            { ko: "사외교육 사전보고 입력 화면 자동 열기", en: "Auto-open pre-report entry screen", type: "form" },
            { ko: "사외교육 입과 매뉴얼 최신본 사이드 패널 자동 오픈", en: "Auto-open latest enrollment manual in side panel", type: "open" },
            { ko: "사용자가 직접 입력 → 제출", en: "User fills in fields → submit", type: "submit" }
          ]
        }
      },
      {
        userKo: "교육 끝나면 결과보고도 해야 해?",
        userEn: "Do I need to file a post-training report too?",
        delayMs: 1900,
        agentId: "training",
        minutesSaved: 0,
        tools: ["training.postReport", "policy.lookup", "alert.schedule"],
        elapsed: 480,
        botHtmlKo: "네, <b>교육 종료일 D+3 이내</b>에 사외교육 결과보고를 올리셔야 해요.<br><br>제가 <b>D+3 시점에 자동 알람</b>을 걸어두고, 미제출 상태이면 챗으로 먼저 말 걸어 사후 보고 진행을 도와드릴게요. 영수증/이수증은 미리 사진으로 준비해두시면 결과보고 시 첨부가 편해요.",
        botHtmlEn: "Yes — the post-training report is due <b>within D+3 of the course end date</b>.<br><br>I'll <b>schedule an alert at D+3</b>; if it's still unsubmitted, I'll ping you in chat and walk you through filing it. Tip: snap photos of the receipt and certificate of completion ahead of time so you can attach them quickly.",
        actionCard: {
          title: "사후 결과보고 가이드",
          titleEn: "Post-training report guide",
          steps: [
            { ko: "교육 종료일 D+3 시점 자동 알람 설정", en: "Schedule auto-alert at D+3 from course end", type: "notify" },
            { ko: "결과보고 작성 (학습 내용 요약 · 업무 적용 계획)", en: "Draft report (summary of learnings · application plan)", type: "form" },
            { ko: "영수증 / 이수증 첨부 후 제출", en: "Attach receipt / certificate → submit", type: "submit" }
          ]
        }
      }
    ]
  },
  {
    id: "firewall_extension",
    emoji: "🛡️",
    titleKo: "방화벽 1년 연장 신청",
    titleEn: "Firewall 1-year extension",
    descKo: "만료 메일 → 일괄 연장 → 일부 제외 처리 → 결재 상신",
    descEn: "Expiry email → batch extend → exclude one → submit approval",
    steps: [
      {
        userKo: "방화벽 만료예정 메일을 받았는데, 어디서 어떻게 연장 신청할 수 있지? 1년 만에 신청하려니 기억이 안 나.",
        userEn: "I got a firewall expiry notice — where and how do I file the extension? It's been a year, I don't remember.",
        delayMs: 1300,
        agentId: "it",
        minutesSaved: 12,
        tools: ["firewall.lookup", "wiki.search", "mail.inbox"],
        elapsed: 560,
        botHtmlKo: "방화벽 연장은 제가 도와드릴게요!<br><br><b>만료예정 메일</b>을 저에게 그대로 전송해주시면, 메일 안의 대상 사이트/계정 목록을 기반으로 연장 절차를 그대로 진행해드릴 수 있어요.<br><br>(아래 안내 이메일로 만료예정 메일을 포워딩해주세요 → assistant@worklife.local)",
        botHtmlEn: "I'll handle the firewall extension!<br><br><b>Forward me the expiry email</b> as-is. I'll parse the list of target sites/accounts from it and walk the extension through.<br><br>(Forward the expiry email to assistant@worklife.local)",
        actionCard: null
      },
      {
        userKo: "메일 전송했어.",
        userEn: "Sent you the email.",
        delayMs: 1900,
        agentId: "it",
        minutesSaved: 0,
        tools: ["mail.parse", "firewall.extend", "policy.lookup"],
        elapsed: 590,
        botHtmlKo: "메일 확인했어요! 만료 대상은 <b>프로님 · 김삼성 · 김물산 3명</b>이고, 모두 동일 사이트에 대한 권한이네요.<br><br>해당 내용을 <b>기존과 동일하게 유지하되 기간만 1년 연장</b>해드리면 될까요?<br>참고로 방화벽 연장 프로세스에는 <b>부서장 결재 + 인사팀 정보보안 그룹 담당자 합의</b>가 포함됩니다.<br><br>· <b>모든 정보 유지한 채 기간만 유지</b><br>· <b>일부 정보 변경 필요</b>",
        botHtmlEn: "Got the email. The expiring entries are <b>you, Kim Samsung, and Kim Mulsan — 3 people total</b>, all on the same site permission.<br><br>Should I <b>keep everything the same and just extend by 1 year</b>?<br>FYI: the firewall extension flow requires <b>department head approval + sign-off from the HR Information Security group</b>.<br><br>· <b>Keep all info, extend only</b><br>· <b>Some info needs to change</b>",
        actionCard: null
      },
      {
        userKo: "일괄로 신청된 3명 중, 김물산은 제외해줘. 업무 파트가 바뀌어서 해당 사이트 접속이 불필요해.",
        userEn: "Of the 3 in the batch, drop Kim Mulsan — his role changed and he no longer needs that site.",
        delayMs: 2100,
        agentId: "it",
        minutesSaved: 0,
        tools: ["firewall.extend", "approval.submit", "hr.lookup"],
        elapsed: 620,
        botHtmlKo: "네, 그러면 <b>프로님과 김삼성 프로 두 분의 건만 1년 연장 신청</b>을 진행하고, 김물산 프로는 이번 일괄 신청에서 제외할게요.<br><br>아래와 같이 결재를 상신할게요.",
        botHtmlEn: "Got it — I'll <b>file the 1-year extension for you and Kim Samsung only</b>, and drop Kim Mulsan from this batch.<br><br>Submitting approval as below.",
        actionCard: {
          title: "방화벽 연장 결재 상신",
          titleEn: "Firewall extension — approval",
          steps: [
            { ko: "프로님 — 기존 권한 동일, 기간 1년 연장", en: "You — same permissions, 1-year extension", type: "form" },
            { ko: "김삼성 프로 — 기존 권한 동일, 기간 1년 연장", en: "Kim Samsung — same permissions, 1-year extension", type: "form" },
            { ko: "김물산 프로 — 이번 일괄 신청에서 제외 (사유: 업무 파트 변경)", en: "Kim Mulsan — excluded from batch (reason: role change)", type: "notify" },
            { ko: "결재 라인: 부서장 → 인사팀 정보보안 그룹 담당자 → 상신 완료", en: "Approval chain: dept head → HR InfoSec contact → submitted", type: "submit" }
          ]
        }
      }
    ]
  }
];
