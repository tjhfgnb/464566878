const dailySets = [
  {
    time: "08:20",
    focus: "出門前的五分鐘桌面整理",
    brief: [
      {
        tag: "WORK",
        title: "把今天的第一件事寫成動詞",
        text: "不要寫企劃案，改成列出三個標題。開始變小，完成率就會變高。",
      },
      {
        tag: "CITY",
        title: "午餐換一條路走",
        text: "固定路線會讓時間變平，換一個街角能讓腦袋重新醒過來。",
      },
      {
        tag: "RESET",
        title: "睡前先關掉一個輸入源",
        text: "不是所有安靜都要很隆重，少一個螢幕就已經足夠。",
      },
    ],
  },
  {
    time: "09:10",
    focus: "先做一件不需要回訊息的事",
    brief: [
      {
        tag: "FOCUS",
        title: "把通知留到整點處理",
        text: "訊息不一定要即時回，節奏被你拿回來，工作才會像工作。",
      },
      {
        tag: "STYLE",
        title: "今天選一個乾淨的主色",
        text: "深灰、白、綠或珊瑚色都可以，少一點混亂，多一點精神。",
      },
      {
        tag: "HEALTH",
        title: "下午三點補一杯水",
        text: "很多疲憊不是意志力問題，只是身體已經在低電量運轉。",
      },
    ],
  },
  {
    time: "07:45",
    focus: "更新測試成功：Cloudflare Pages 已讀到新版內容",
    brief: [
      {
        tag: "MIND",
        title: "今天的內容已經換新",
        text: "如果你在線上網站看到這句話，就代表 GitHub 到 Cloudflare Pages 的更新流程正常。",
      },
      {
        tag: "WORK",
        title: "會議前先決定要帶走什麼",
        text: "每場會議只要有一個明確產物，就不會只是時間被切走。",
      },
      {
        tag: "CITY",
        title: "找一家不用排隊的小店",
        text: "穩定、近、安靜，有時比熱門更像生活的答案。",
      },
    ],
  },
  {
    time: "10:00",
    focus: "把一個長任務切成 30 分鐘",
    brief: [
      {
        tag: "WORK",
        title: "先交草稿，不先交完美",
        text: "現代工作最缺的不是靈感，而是能被討論的第一版。",
      },
      {
        tag: "MOVE",
        title: "用樓梯重啟下午",
        text: "三層樓就好，讓身體先醒，腦袋通常會跟上。",
      },
      {
        tag: "RESET",
        title: "晚餐後留一段無目的時間",
        text: "沒有產出的時間，也可能是在替明天整理空間。",
      },
    ],
  },
];

function taipeiDayIndex() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [year, month, day] = formatter.format(new Date()).split("-").map(Number);
  const utc = Date.UTC(year, month - 1, day);
  return Math.floor(utc / 86400000);
}

export function onRequest() {
  const item = dailySets[taipeiDayIndex() % dailySets.length];
  return Response.json(item, {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}
