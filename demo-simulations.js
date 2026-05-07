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
  }
];
