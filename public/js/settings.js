// DOM elements
const companyNameInput = document.getElementById("companyName");
const currencyInput = document.getElementById("currency");
const themeSelect = document.getElementById("themeSelect");
const notificationsSelect = document.getElementById("notifications");
const changePasswordInput = document.getElementById("changePassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const body = document.body;

// Load settings from localStorage (or defaults)
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("mwfSettings")) || {};

  companyNameInput.value = settings.companyName || "";
  currencyInput.value = settings.currency || "UGX";
  themeSelect.value = settings.theme || "light";
  notificationsSelect.value = settings.notifications || "all";

  // Apply saved theme
  applyTheme(settings.theme || "light");
}

// Apply theme to dashboard
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
}

// Save settings to localStorage
function saveSettings() {
  if (changePasswordInput.value !== confirmPasswordInput.value) {
    alert("Passwords do not match!");
    return;
  }

  const settings = {
    companyName: companyNameInput.value,
    currency: currencyInput.value,
    theme: themeSelect.value,
    notifications: notificationsSelect.value,
    password: changePasswordInput.value || null
  };

  localStorage.setItem("mwfSettings", JSON.stringify(settings));

  // Apply theme immediately
  applyTheme(settings.theme);

  alert("Settings saved successfully!");
  changePasswordInput.value = "";
  confirmPasswordInput.value = "";
}

// Event listeners
saveSettingsBtn.addEventListener("click", saveSettings);

// Live theme change when selecting
themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

// Initialize on page load
window.addEventListener("DOMContentLoaded", loadSettings);
