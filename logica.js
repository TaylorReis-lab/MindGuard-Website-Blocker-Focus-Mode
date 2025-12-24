import { BLOCKED_SITES } from "./blockedSites.js";

const RULE_ID_BASE = 1000;
const BLOCK_PAGE = chrome.runtime.getURL("block/blocked.html");

chrome.runtime.onInstalled.addListener(() => {
  console.log("MindGuard ativo");
  updateRules();
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
