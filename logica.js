import { BLOCKED_SITES } from "./blockList.js";

const RULE_ID_BASE = 1000;
const BLOCK_PAGE = chrome.runtime.getURL("block/blocked.html");

// ============================
// INSTALL
// ============================
chrome.runtime.onInstalled.addListener(async () => {
  console.log("MindGuard instalado");
  await ensureDefaults();
  await applyProtectionState();
});

// ============================
// DEFAULT STATE
// ============================
async function ensureDefaults() {
  const data = await chrome.storage.local.get([
    "enableProtection",
    "statsDate",
  ]);

  if (data.enableProtection === undefined) {
    await chrome.storage.local.set({ enableProtection: true });
  }

  if (!data.statsDate) {
    await resetStats(true);
  }
}

// ============================
// DAILY RESET (GLOBAL)
// ============================
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;
  if (!details.url.startsWith("http")) return;

  resetDailyStatsIfNeeded();
});

// ============================
// RESET LOGIC
// ============================
async function resetDailyStatsIfNeeded() {
  const today = new Date().toDateString();
  const data = await chrome.storage.local.get([
    "statsDate",
    "streakDays",
    "lastAccess",
  ]);

  if (data.statsDate !== today) {
    let streak = 1;

    if (data.lastAccess) {
      const diff =
        (new Date(today) - new Date(data.lastAccess)) / (1000 * 60 * 60 * 24);

      streak = diff === 1 ? (data.streakDays ?? 0) + 1 : 1;
    }

    await chrome.storage.local.set({
      statsDate: today,
      blocksToday: 0,
      threatsToday: 0,
      streakDays: streak,
      lastAccess: today,
    });
  }
}

async function resetStats(force = false) {
  const today = new Date().toDateString();

  await chrome.storage.local.set({
    statsDate: today,
    blocksToday: 0,
    threatsToday: 0,
    streakDays: force ? 1 : 0,
    lastAccess: today,
  });
}

// ============================
// PROTECTION STATE
// ============================
async function applyProtectionState() {
  const { enableProtection } = await chrome.storage.local.get([
    "enableProtection",
  ]);

  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();

  if (enableProtection === false) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRules.map((r) => r.id),
    });

    console.log("MindGuard: proteção DESATIVADA");
  } else {
    await updateRules();
    console.log("MindGuard: proteção ATIVADA");
  }
}

// ============================
// COUNTER (ONLY IF ENABLED)
// ============================
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  if (!details.url.startsWith("http")) return;

  const isTargetSite = BLOCKED_SITES.some((site) =>
    details.url.includes(site.replace("*", ""))
  );

  if (!isTargetSite) return;

  // 👉 SEMPRE registra tentativa de acesso
  resetDailyStatsIfNeeded();

  chrome.storage.local.get(
    ["blocksToday", "threatsToday", "enableProtection"],
    (data) => {
      const enabled = data.enableProtection !== false;

      // Atualiza lastAccess SEMPRE
      chrome.storage.local.set({
        lastAccess: new Date().toDateString(),
      });

      // Só conta bloqueio se proteção estiver ativa
      if (enabled) {
        chrome.storage.local.set({
          blocksToday: (data.blocksToday ?? 0) + 1,
          threatsToday: (data.threatsToday ?? 0) + 1,
        });
      }
    }
  );
});

// ============================
// POPUP SETTINGS
// ============================
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateSettings") {
    applyProtectionState();
  }
});

// ============================
// RULES
// ============================
async function updateRules() {
  const rules = BLOCKED_SITES.map((site, index) => ({
    id: RULE_ID_BASE + index,
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: BLOCK_PAGE },
    },
    condition: {
      urlFilter: site,
      resourceTypes: ["main_frame"],
    },
  }));

  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRules.map((r) => r.id),
    addRules: rules,
  });
}
