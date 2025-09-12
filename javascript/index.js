// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
});

// Form Handlers
function setupFormHandlers() {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleLogin();
    });

  document
    .getElementById("twofa-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handle2FA();
    });
}

// UI Functions
function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!validateEmail(email)) {
    document.getElementById("login-email").classList.add("invalid");
    showAlert("Please enter a valid email address", "danger");
    return;
  }

  if (!password) {
    document.getElementById("login-password").classList.add("invalid");
    showAlert("Please enter a password", "danger");
    return;
  }

  show2FAModal();
}

function show2FAModal() {
  document.getElementById("twofa-modal").classList.add("active");
}

function handle2FA() {
  const code = document.getElementById("twofa-code").value;

  if (code.length !== 6 || !/^\d+$/.test(code)) {
    showAlert("Please enter a valid 6-digit code", "danger");
    return;
  }

  closeModal("twofa-modal");
  document.getElementById("navbar").style.display = "block";
  window.location.href = "dashboard.html";
}

function resend2FA() {
  showAlert("Verification code resent", "info");
}

function showForgotPassword() {
  showAlert("Password reset link sent to your email", "info");
}

