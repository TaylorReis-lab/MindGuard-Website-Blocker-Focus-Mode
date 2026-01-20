const enableProtection = document.getElementById("enableProtection");
const statusText = document.querySelector(".status");
const configPageLink = document.getElementById("openSettings");

// ============================
// INIT
// ============================
chrome.storage.local.get(
  ["enableProtection", "blocksToday", "threatsToday", "streakDays"],
  (data) => {
    const enabled = data.enableProtection !== false;

    enableProtection.checked = enabled;
    updateStatusText(enabled);

    updateCounters(data);
  },
);

// ============================
// OPEN CONFIG PAGE
function openConfigPage() {
  chrome.tabs.create({ url: "../page/pageConfig/blockedConfig.html" });
}

// ============================
// TOGGLE
// ============================
enableProtection.addEventListener("change", () => {
  chrome.storage.local.set({
    enableProtection: enableProtection.checked,
  });

  chrome.runtime.sendMessage({
    action: "updateSettings",
  });
});

// ============================
// REALTIME STORAGE SYNC
// ============================
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;

  if (changes.enableProtection) {
    const enabled = changes.enableProtection.newValue !== false;
    enableProtection.checked = enabled;
    updateStatusText(enabled);
  }

  updateCountersFromChanges(changes);
});

// ============================
// UI HELPERS
// ============================
function updateStatusText(enabled) {
  statusText.textContent = enabled ? "Ativado" : "Desativado";
  statusText.classList.toggle("active", enabled);
  statusText.style.color = enabled ? "#16a34a" : "#dc2626";
}

function updateCounters(data) {
  if (data.blocksToday !== undefined) {
    document.getElementById("blocksToday").textContent = data.blocksToday;
  }

  if (data.threatsToday !== undefined) {
    document.getElementById("threats").textContent = data.threatsToday;
  }

  if (data.streakDays !== undefined) {
    document.getElementById("streakDays").textContent = data.streakDays;
  }
}

function updateCountersFromChanges(changes) {
  if (changes.blocksToday) {
    document.getElementById("blocksToday").textContent =
      changes.blocksToday.newValue;
  }

  if (changes.threatsToday) {
    document.getElementById("threats").textContent =
      changes.threatsToday.newValue;
  }

  if (changes.streakDays) {
    document.getElementById("streakDays").textContent =
      changes.streakDays.newValue;
  }
}

// ============================
// EVENT LISTENERS
// ============================
configPageLink.addEventListener("click", openConfigPage);
