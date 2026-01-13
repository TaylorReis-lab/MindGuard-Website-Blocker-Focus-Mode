import { BLOCKED_SITES } from "./blockList.js";

const RULE_ID_BASE = 1000;
const BLOCK_PAGE = chrome.runtime.getURL("block/blocked.html");

chrome.runtime.onInstalled.addListener(() => {
  console.log("MindGuard ativo");
  updateRules();
  initializeStats();
});

// Initialize stats if not exist
function initializeStats() {
  const today = new Date().toDateString();
  chrome.storage.local.get(
    ["statsDate", "blocksToday", "threatsToday"],
    (data) => {
      if (data.statsDate !== today) {
        chrome.storage.local.set({
          statsDate: today,
          blocksToday: 0,
          threatsToday: 0,
        });
      }
    }
  );
}

// Track blocked requests
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  if (info.request.initiator) {
    // Only count user-initiated requests
    chrome.storage.local.get(["blocksToday", "threatsToday"], (data) => {
      const blocks = (data.blocksToday || 0) + 1;
      const threats = (data.threatsToday || 0) + 1; // Assuming each block is a threat
      chrome.storage.local.set({
        blocksToday: blocks,
        threatsToday: threats,
        lastAccess: new Date().toISOString(),
      });
    });
  }
});

// Update settings
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateSettings") {
    console.log("Settings updated:", message.settings);
    // Apply settings, e.g., enable/disable rules
    if (message.settings.enableProtection === false) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: BLOCKED_SITES.map((_, index) => RULE_ID_BASE + index),
      });
    } else {
      updateRules();
    }
  }
});

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
