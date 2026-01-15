import { BLOCKED_SITES } from "./blockList.js";

const RULE_ID_BASE = 1000;
const BLOCK_PAGE = chrome.runtime.getURL("block/blocked.html");

// ============================
// INSTALL
// ============================
chrome.runtime.onInstalled.addListener(() => {
  console.log("MindGuard ativo");
  updateRules();
  resetDailyStatsIfNeeded();
});

// ============================
// DAILY RESET
// ============================
function resetDailyStatsIfNeeded() {
  const today = new Date().toDateString();

  chrome.storage.local.get(
    ["statsDate", "blocksToday", "threatsToday", "streakDays", "lastAccess"],
    (data) => {
      if (data.statsDate !== today) {
        chrome.storage.local.set({
          statsDate: today,
          blocksToday: 0,
          threatsToday: 0,
        });

        // Atualiza streak
        if (data.lastAccess) {
          const diff =
            (new Date(today) - new Date(data.lastAccess)) /
            (1000 * 60 * 60 * 24);

          const newStreak = diff === 1 ? (data.streakDays ?? 0) + 1 : 1;
          chrome.storage.local.set({ streakDays: newStreak });
        } else {
          chrome.storage.local.set({ streakDays: 1 });
        }

        chrome.storage.local.set({ lastAccess: today });
      }
    }
  );
}

// ============================
// PROFESSIONAL COUNTER
// ============================
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  // Apenas navegação principal do usuário
  if (details.frameId !== 0) return;
  if (!details.url.startsWith("http")) return;

  const isBlocked = BLOCKED_SITES.some((site) =>
    details.url.includes(site.replace("*", ""))
  );

  if (!isBlocked) return;

  resetDailyStatsIfNeeded();

  chrome.storage.local.get(["blocksToday", "threatsToday"], (data) => {
    chrome.storage.local.set({
      blocksToday: (data.blocksToday ?? 0) + 1,
      threatsToday: (data.threatsToday ?? 0) + 1,
    });
  });
});

// ============================
// SETTINGS FROM POPUP
// ============================
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateSettings") {
    if (message.settings.enableProtection === false) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: BLOCKED_SITES.map((_, index) => RULE_ID_BASE + index),
      });
    } else {
      updateRules();
    }
  }
});

// ============================
// UPDATE RULES
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
