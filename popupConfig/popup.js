const enableProtection = document.getElementById("enableProtection");
const openSettingsBtn = document.getElementById("openSettingsBtn");
const openAllowlist = document.getElementById("openAllowlist");
const openStats = document.getElementById("openStats");
const openSettings = document.getElementById("openSettings");

// Load settings and stats
chrome.storage.local.get(
  ["enableProtection", "blocksToday", "threatsToday", "lastAccess"],
  (data) => {
    enableProtection.checked = data.enableProtection ?? true;

    // Update stats
    document.getElementById("blocksToday").textContent = data.blocksToday ?? 0;
    document.getElementById("threats").textContent = data.threatsToday ?? 0;

    // Calculate streak
    const lastAccess = data.lastAccess;
    let streak = 0;
    if (lastAccess) {
      const now = new Date();
      const last = new Date(lastAccess);
      const diffTime = now - last;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      streak = diffDays;
    }
    document.getElementById("streakDays").textContent = streak;
  }
);

// Toggle protection
enableProtection.addEventListener("change", () => {
  chrome.storage.local.set({
    enableProtection: enableProtection.checked,
  });
  // Notify background
  chrome.runtime.sendMessage({
    action: "updateSettings",
    settings: { enableProtection: enableProtection.checked },
  });
});

// Open settings
openSettingsBtn.addEventListener("click", () => {
//   chrome.tabs.create({ url: chrome.runtime.getURL("blockedConfig.html") });
    alert("Em breve: configurações do MindGuard (em desenvolvimento)");
});

// Open allowlist
openAllowlist.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({
    url: chrome.runtime.getURL("blockedConfig.html#allowlist"),
  });
});

// Open stats
openStats.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({
    url: chrome.runtime.getURL("blockedConfig.html#stats"),
  });
});

// Open settings
openSettings.addEventListener("click", (e) => {
  e.preventDefault();
  //   chrome.tabs.create({ url: chrome.runtime.getURL("blockedConfig.html") });
  alert("Em breve: configurações do MindGuard (em desenvolvimento)");
});
