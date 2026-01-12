document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("btnBack");
  const settingsBtn = document.getElementById("btnSettings");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "https://www.google.com";
      }
    });
  }

  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      // Futuro dashboard da extensão
      alert("Em breve: configurações do MindGuard (em desenvolvimento)");
    });
  }
});
