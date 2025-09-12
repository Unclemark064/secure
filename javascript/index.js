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

// Navigation Functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

function logout() {
  document.getElementById("navbar").style.display = "none";
  window.location.href = "index.html";
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Utility Functions
function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `<i class="fas fa-${
    type === "success" ? "check" : type === "danger" ? "times" : "info"
  }-circle"></i> ${message}`;

  const container = document.querySelector(".auth-container");
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 3000);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Input Validation
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("form-control")) {
    e.target.classList.remove("invalid");
  }
});

// Click outside modal to close
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
    });
    closeSidebar();
  }
});

// Responsive sidebar handling
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeSidebar();
  }
});
