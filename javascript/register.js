// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
});

// Form Handlers
function setupFormHandlers() {
  document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleRegister();
    });

  document
    .getElementById("reg-email")
    .addEventListener("input", validateEmailInput);
  document.getElementById("reg-phone").addEventListener("input", formatPhone);
  document.getElementById("reg-ssn").addEventListener("input", formatSSN);
  document
    .getElementById("reg-password")
    .addEventListener("input", validatePassword);
  document
    .getElementById("reg-confirm-password")
    .addEventListener("input", validateConfirmPassword);
}

// UI Functions
function handleRegister() {
  const firstName = document.getElementById("reg-firstname").value;
  const lastName = document.getElementById("reg-lastname").value;
  const email = document.getElementById("reg-email").value;
  const phone = document.getElementById("reg-phone").value;
  const address = document.getElementById("reg-address").value;
  const ssn = document.getElementById("reg-ssn").value;
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;

  if (!firstName || !lastName) {
    showAlert("Please enter your full name", "danger");
    document.getElementById("reg-firstname").classList.add("invalid");
    document.getElementById("reg-lastname").classList.add("invalid");
    return;
  }

  if (!validateEmail(email)) {
    showAlert("Please enter a valid email address", "danger");
    document.getElementById("reg-email").classList.add("invalid");
    return;
  }

  if (!validatePhone(phone)) {
    showAlert(
      "Please enter a valid phone number (e.g., (123) 456-7890)",
      "danger"
    );
    document.getElementById("reg-phone").classList.add("invalid");
    return;
  }

  if (!address) {
    showAlert("Please enter your address", "danger");
    document.getElementById("reg-address").classList.add("invalid");
    return;
  }

  if (!validateSSN(ssn)) {
    showAlert("Please enter the last 4 digits of your SSN", "danger");
    document.getElementById("reg-ssn").classList.add("invalid");
    return;
  }

  if (password !== confirmPassword) {
    showAlert("Passwords do not match", "danger");
    document.getElementById("reg-password").classList.add("invalid");
    document.getElementById("reg-confirm-password").classList.add("invalid");
    return;
  }

  if (password.length < 6) {
    showAlert("Password must be at least 6 characters", "danger");
    document.getElementById("reg-password").classList.add("invalid");
    return;
  }

  showAlert("Registration successful! Please verify your account.", "success");
  window.location.href = "verification.html";
}

// Validation Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^\(\d{3}\) \d{3}-\d{4}$/;
  return re.test(phone);
}

function validateSSN(ssn) {
  return /^\d{4}$/.test(ssn);
}

function validateEmailInput() {
  const email = document.getElementById("reg-email").value;
  document
    .getElementById("reg-email")
    .classList.toggle("invalid", email && !validateEmail(email));
}

function formatPhone(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, "");
  if (value.length >= 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else if (value.length >= 3) {
    value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
  } else if (value.length > 0) {
    value = value.replace(/(\d{0,3})/, "($1");
  }
  input.value = value;
  input.classList.toggle("invalid", value && !validatePhone(value));
}

function formatSSN(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, "");
  input.value = value;
  input.classList.toggle("invalid", value && !validateSSN(value));
}

function validatePassword() {
  const password = document.getElementById("reg-password").value;
  document
    .getElementById("reg-password")
    .classList.toggle("invalid", password && password.length < 6);
}

function validateConfirmPassword() {
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;
  document
    .getElementById("reg-confirm-password")
    .classList.toggle(
      "invalid",
      confirmPassword && confirmPassword !== password
    );
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

// Input Validation
document.addEventListener("input", function (e) {
  if (
    e.target.classList.contains("form-control") &&
    e.target.id !== "reg-phone" &&
    e.target.id !== "reg-ssn"
  ) {
    e.target.classList.remove("invalid");
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});
