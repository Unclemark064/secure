// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
  // Removed automatic toggleSidebar() on mobile
});

// Form Handlers
function setupFormHandlers() {
  document
    .getElementById("transfer-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleTransfer();
    });

  document
    .getElementById("to-account")
    .addEventListener("input", validateAccountNumber);
  document.getElementById("amount").addEventListener("input", validateAmount);
}

// UI Functions
function handleTransfer() {
  const fromAccount = document.getElementById("from-account").value;
  const toAccount = document.getElementById("to-account").value;
  const amount = document.getElementById("amount").value;
  const memo = document.getElementById("memo").value;

  if (!fromAccount) {
    showAlert("Please select a source account", "danger");
    document.getElementById("from-account").classList.add("invalid");
    return;
  }

  if (!validateAccountNumber(toAccount)) {
    showAlert("Please enter a valid account number (10 digits)", "danger");
    document.getElementById("to-account").classList.add("invalid");
    return;
  }

  if (!amount || amount <= 0) {
    showAlert("Please enter a valid transfer amount", "danger");
    document.getElementById("amount").classList.add("invalid");
    return;
  }

  showAlert(
    `Transfer of $${amount} to account ${toAccount} initiated${
      memo ? " with memo: " + memo : ""
    }!`,
    "success"
  );
  document.getElementById("transfer-form").reset();
}

function resetForm() {
  document.getElementById("transfer-form").reset();
  document
    .querySelectorAll(".form-control")
    .forEach((input) => input.classList.remove("invalid"));
  showAlert("Form reset", "success");
}

// Validation Functions
function validateAccountNumber(account) {
  const input = typeof account === "string" ? account : account.target.value;
  const re = /^\d{10}$/;
  const isValid = re.test(input);
  if (typeof account !== "string") {
    account.target.classList.toggle("invalid", input && !isValid);
  }
  return isValid;
}

function validateAmount(e) {
  const input = e.target;
  const value = parseFloat(input.value);
  input.classList.toggle(
    "invalid",
    input.value && (isNaN(value) || value <= 0)
  );
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
  if (window.innerWidth <= 768) {
    bankingMenu.classList.remove("active");
  } else {
    sidebar.classList.remove("active");
  }
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
  closeSidebar();
  if (
    window.innerWidth > 768 &&
    !document.getElementById("banking-menu").classList.contains("active")
  ) {
    toggleSidebar();
  }
});
