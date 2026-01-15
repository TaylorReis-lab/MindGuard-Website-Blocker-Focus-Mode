document.addEventListener("DOMContentLoaded", () => {
  const enableProtection = document.getElementById("enableProtection");
  const statusText = document.querySelector(".status");

  const blocksTodayEl = document.getElementById("blocksToday");
  const threatsEl = document.getElementById("threats");
  const streakEl = document.getElementById("streakDays");

  // Load data
  chrome.storage.local.get(
    ["enableProtection", "blocksToday", "threatsToday", "streakDays"],
    (data) => {
      enableProtection.checked = data.enableProtection ?? true;
      updateStatus(enableProtection.checked);

      blocksTodayEl.textContent = data.blocksToday ?? 0;
      threatsEl.textContent = data.threatsToday ?? 0;
      streakEl.textContent = data.streakDays ?? 0;
    }
  );

  // Toggle protection
  enableProtection.addEventListener("change", () => {
    const isEnabled = enableProtection.checked;

    chrome.storage.local.set({ enableProtection: isEnabled });

    chrome.runtime.sendMessage({
      action: "toggleProtection",
      enabled: isEnabled,
    });

    updateStatus(isEnabled);
  });

  function updateStatus(enabled) {
    statusText.textContent = enabled ? "Ativado" : "Desativado";
    statusText.style.color = enabled ? "#16a34a" : "#dc2626";
  }
});
