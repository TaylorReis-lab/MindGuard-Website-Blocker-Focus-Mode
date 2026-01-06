// blockedConfig.js - Functionality for MindGuard Config Page

document.addEventListener("DOMContentLoaded", function () {
  console.log("MindGuard Config loaded successfully!");

  // Initialize settings from localStorage or defaults
  const settings = {
    blockerEnabled: true,
    strictMode: true,
    socialBlock: false,
    scheduleEnabled: false,
    pinEnabled: false,
    antiUninstall: false,
    blockedSites: [
      "www.site-exemplo.com",
      "social-media-app.com",
      "anuncios-chatos.net",
    ],
    allowedSites: [],
  };

  // Load settings from localStorage
  loadSettings();

  // Toggle Buttons
  setupToggles();

  // Site Management
  setupSiteManagement();

  // Tabs
  setupTabs();

  function loadSettings() {
    const saved = localStorage.getItem("mindguard-settings");
    if (saved) {
      Object.assign(settings, JSON.parse(saved));
    }
    updateUI();
  }

  function saveSettings() {
    localStorage.setItem("mindguard-settings", JSON.stringify(settings));
    console.log("Settings saved:", settings);
  }

  function updateUI() {
    // Update toggles
    document.querySelectorAll(".toggle-slider").forEach((toggle) => {
      const key = toggle.dataset.setting;
      if (key && settings[key] !== undefined) {
        toggle.classList.toggle("active", settings[key]);
        const thumb = toggle.querySelector(".toggle-thumb");
        if (thumb) {
          thumb.style.transform = settings[key]
            ? "translateX(20px)"
            : "translateX(0)";
        }
      }
    });

    // Update site lists
    updateSiteList("blocked");
    updateSiteList("allowed");
  }

  function setupToggles() {
    document.querySelectorAll(".toggle-slider").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const key = this.dataset.setting;
        if (key) {
          settings[key] = !settings[key];
          this.classList.toggle("active", settings[key]);
          const thumb = this.querySelector(".toggle-thumb");
          if (thumb) {
            thumb.style.transform = settings[key]
              ? "translateX(20px)"
              : "translateX(0)";
          }
          console.log(`${key} toggled to: ${settings[key]}`);
          saveSettings();
        }
      });
    });
  }

  function setupSiteManagement() {
    // Add site button
    const addButton = document.querySelector(".bg-primary.hover\\:bg-blue-600");
    const input = document.querySelector('input[type="text"]');

    if (addButton && input) {
      addButton.addEventListener("click", function () {
        const site = input.value.trim();
        if (site) {
          settings.blockedSites.push(site);
          updateSiteList("blocked");
          input.value = "";
          console.log(`Site added: ${site}`);
          saveSettings();
        } else {
          alert("Digite um endereço de site válido.");
        }
      });

      // Enter key support
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          addButton.click();
        }
      });
    }

    // Remove buttons (delegated)
    document.addEventListener("click", function (e) {
      if (e.target.matches(".text-text-secondary.hover\\:text-red-500")) {
        const item = e.target.closest(".flex.items-center.justify-between");
        const siteName = item.querySelector(".text-sm.font-medium").textContent;
        const listType = item.closest(".divide-y").dataset.list;
        const list =
          listType === "blocked"
            ? settings.blockedSites
            : settings.allowedSites;
        const index = list.indexOf(siteName);
        if (index > -1) {
          list.splice(index, 1);
          updateSiteList(listType);
          console.log(`Site removed: ${siteName} from ${listType}`);
          saveSettings();
        }
      }
    });
  }

  function setupTabs() {
    const tabButtons = document.querySelectorAll(".px-4.py-1\\.5");
    const lists = document.querySelectorAll(".divide-y");

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active from all tabs
        tabButtons.forEach((btn) =>
          btn.classList.remove(
            "bg-white",
            "dark:bg-primary",
            "text-slate-900",
            "dark:text-white"
          )
        );
        tabButtons.forEach((btn) =>
          btn.classList.add(
            "text-text-secondary",
            "hover:text-slate-900",
            "dark:hover:text-white"
          )
        );

        // Add active to clicked
        this.classList.remove(
          "text-text-secondary",
          "hover:text-slate-900",
          "dark:hover:text-white"
        );
        this.classList.add(
          "bg-white",
          "dark:bg-primary",
          "text-slate-900",
          "dark:text-white"
        );

        // Show corresponding list
        const type = this.textContent.toLowerCase();
        lists.forEach((list) => {
          list.style.display = list.dataset.list === type ? "block" : "none";
        });
        console.log(`Switched to ${type} list`);
      });
    });
  }

  function updateSiteList(type) {
    const list = settings[type + "Sites"];
    const container = document.querySelector(`.divide-y[data-list="${type}"]`);
    if (!container) return;

    container.innerHTML = "";
    list.forEach((site) => {
      const item = document.createElement("div");
      item.className =
        "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group";
      item.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="size-8 rounded bg-red-500/10 flex items-center justify-center text-red-500">
                        <span class="material-symbols-outlined text-lg">block</span>
                    </div>
                    <div class="flex flex-col flex-1">
                        <span class="text-sm font-medium text-slate-900 dark:text-white">${site}</span>
                        <span class="text-xs text-text-secondary">Adicionado via Interface</span>
                    </div>
                </div>
                <button class="text-text-secondary hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer" title="Remover">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            `;
      container.appendChild(item);
    });
  }

  // Schedule slider (basic toggle for now)
  const scheduleToggle = document.querySelector(
    ".w-10.h-5.bg-slate-300.dark\\:bg-slate-700"
  );
  if (scheduleToggle) {
    scheduleToggle.addEventListener("click", function () {
      settings.scheduleEnabled = !settings.scheduleEnabled;
      this.classList.toggle("active", settings.scheduleEnabled);
      const thumb = this.querySelector(".toggle-thumb");
      if (thumb) {
        thumb.style.transform = settings.scheduleEnabled
          ? "translateX(20px)"
          : "translateX(0)";
      }
      console.log(`Schedule toggled to: ${settings.scheduleEnabled}`);
      saveSettings();
    });
  }

  // Security buttons
  document
    .querySelectorAll(".text-primary.text-sm.font-bold")
    .forEach((button) => {
      if (button.textContent === "Configurar") {
        button.addEventListener("click", function () {
          alert("Funcionalidade de PIN em desenvolvimento.");
          console.log("PIN configuration clicked");
        });
      }
    });

  // Anti-uninstall toggle
  const antiUninstallToggle = document.querySelector(".w-10.h-5.bg-primary");
  if (antiUninstallToggle) {
    antiUninstallToggle.addEventListener("click", function () {
      settings.antiUninstall = !settings.antiUninstall;
      this.classList.toggle("active", settings.antiUninstall);
      const thumb = this.querySelector(".toggle-thumb");
      if (thumb) {
        thumb.style.transform = settings.antiUninstall
          ? "translateX(20px)"
          : "translateX(0)";
      }
      console.log(`Anti-uninstall toggled to: ${settings.antiUninstall}`);
      saveSettings();
    });
  }

  console.log("All functionalities initialized. Settings:", settings);
});
