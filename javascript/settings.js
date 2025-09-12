// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
});

// Form Handlers
function setupFormHandlers() {
  document
    .getElementById("settings-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleSettingsUpdate();
    });

  document.getElementById("email").addEventListener("input", validateEmail);
  document
    .getElementById("password")
    .addEventListener("input", validatePassword);
  document
    .getElementById("confirm-password")
    .addEventListener("input", validateConfirmPassword);
}

// UI Functions
function handleSettingsUpdate() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const emailNotifications = document.getElementById(
    "email-notifications"
  ).checked;
  const smsNotifications = document.getElementById("sms-notifications").checked;
  const pushNotifications =
    document.getElementById("push-notifications").checked;

  if (!validateEmail(email)) {
    showAlert("Please enter a valid email address", "danger");
    document.getElementById("email").classList.add("invalid");
    return;
  }

  if (password && !validatePassword(password)) {
    showAlert("Password must be at least 8 characters long", "danger");
    document.getElementById("password").classList.add("invalid");
    return;
  }

  if (password && password !== confirmPassword) {
    showAlert("Passwords do not match", "danger");
    document.getElementById("confirm-password").classList.add("invalid");
    return;
  }

  const updates = [];
  if (email) updates.push("email");
  if (password) updates.push("password");
  if (emailNotifications || smsNotifications || pushNotifications) {
    updates.push("notification preferences");
  }

  showAlert(`Settings updated: ${updates.join(", ")}`, "success");
  document.getElementById("settings-form").reset();
}

function resetForm() {
  document.getElementById("settings-form").reset();
  document
    .querySelectorAll(".form-control")
    .forEach((input) => input.classList.remove("invalid"));
  showAlert("Form reset", "success");
}

// Validation Functions
function validateEmail(email) {
  const input = typeof email === "string" ? email : email.target.value;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = re.test(input);
  if (typeof email !== "string") {
    email.target.classList.toggle("invalid", input && !isValid);
  }
  return isValid;
}

function validatePassword(password) {
  const input = typeof password === "string" ? password : password.target.value;
  const isValid = input.length >= 8;
  if (typeof password !== "string") {
    password.target.classList.toggle("invalid", input && !isValid);
  }
  return isValid;
}

function validateConfirmPassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const isValid = password === confirmPassword;
  document
    .getElementById("confirm-password")
    .classList.toggle("invalid", confirmPassword && !isValid);
  return isValid;
}

// Utility Functions
function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `<i class="fas fa-${
    type === "success" ? "check" : "times"
  }-circle"></i> ${message}`;

  const container = document.querySelector(".container");
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 3000);
  }
}

// Navigation Functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const bankingMenu = document.getElementById("banking-menu");
  if (window.innerWidth <= 768) {
    bankingMenu.classList.toggle("active");
  } else {
    sidebar.classList.toggle("active");
  }
  overlay.classList.toggle("active");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const bankingMenu = document.getElementById("banking-menu");
  bankingMenu.classList.remove("active");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

function navigateAndClose(url) {
  closeSidebar();
  window.location.href = url;
}

function logoutAndClose() {
  closeSidebar();
  logout();
}

function verifyAccount() {
  alert("Please complete the verification process.");
}

function logout() {
  window.location.href = "index.html";
}

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSidebar();
  }
});

// Responsive Handling
window.addEventListener("resize", function () {
  // No automatic navigation update, rely on toggle
});
