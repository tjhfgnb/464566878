const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const tabs = document.querySelectorAll("[data-tab]");
const panel = document.querySelector("[data-panel]");

const content = {
  focus: {
    tag: "FOCUS",
    title: "讓桌面只留下會推動你的東西",
    text: "從螢幕高度、通知節奏到水杯位置，細節會悄悄決定一個上午的品質。",
    items: ["25 分鐘深度工作", "兩個固定收件時間", "睡前清空桌面"],
  },
  move: {
    tag: "MOVE",
    title: "把城市變成不用預約的健身房",
    text: "短程步行、樓梯、共享單車和一雙好鞋，讓活動量自然回到每天。",
    items: ["一站路先下車", "午餐後 900 步", "週末無目的路線"],
  },
  reset: {
    tag: "RESET",
    title: "恢復不是獎勵，是基本配備",
    text: "把休息排進行程裡，晚上才不會被白天的殘響追著跑。",
    items: ["固定離線時段", "低亮度夜間模式", "睡前 20 分鐘收尾"],
  },
};

function syncHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function renderPanel(key) {
  const item = content[key];
  panel.innerHTML = `
    <div>
      <span class="tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </div>
    <ul class="mini-list">
      ${item.items.map((entry) => `<li>${entry}</li>`).join("")}
    </ul>
  `;
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

menu.addEventListener("click", () => {
  header.classList.toggle("open");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
    renderPanel(tab.dataset.tab);
  });
});

async function loadDailyContent() {
  try {
    const response = await fetch("/api/daily", {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return;

    const daily = await response.json();
    document.querySelector("[data-daily-time]").textContent = daily.time;
    document.querySelector("[data-daily-focus]").textContent = daily.focus;

    daily.brief.forEach((item, index) => {
      document.querySelector(`[data-brief-tag="${index}"]`).textContent = item.tag;
      document.querySelector(`[data-brief-title="${index}"]`).textContent = item.title;
      document.querySelector(`[data-brief-text="${index}"]`).textContent = item.text;
    });
  } catch {
    /* Local file previews keep the built-in fallback content. */
  }
}

loadDailyContent();
