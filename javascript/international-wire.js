// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
});

// Form Handlers
function setupFormHandlers() {
  document.getElementById("wire-form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleWireTransfer();
  });

  document
    .getElementById("recipient-account")
    .addEventListener("input", validateAccountNumber);
  document
    .getElementById("swift-code")
    .addEventListener("input", validateSwiftCode);
  document.getElementById("amount").addEventListener("input", validateAmount);
}

// UI Functions
function handleWireTransfer() {
  const fromAccount = document.getElementById("from-account").value;
  const recipientName = document.getElementById("recipient-name").value;
  const recipientAccount = document.getElementById("recipient-account").value;
  const swiftCode = document.getElementById("swift-code").value;
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("currency").value;
  const memo = document.getElementById("memo").value;

  if (!fromAccount) {
    showAlert("Please select a source account", "danger");
    document.getElementById("from-account").classList.add("invalid");
    return;
  }

  if (!recipientName) {
    showAlert("Please enter the recipient name", "danger");
    document.getElementById("recipient-name").classList.add("invalid");
    return;
  }

  if (!validateAccountNumber(recipientAccount)) {
    showAlert("Please enter a valid account number (10-20 digits)", "danger");
    document.getElementById("recipient-account").classList.add("invalid");
    return;
  }

  if (!validateSwiftCode(swiftCode)) {
    showAlert(
      "Please enter a valid SWIFT/BIC code (8 or 11 characters)",
      "danger"
    );
    document.getElementById("swift-code").classList.add("invalid");
    return;
  }

  if (!amount || amount <= 0) {
    showAlert("Please enter a valid transfer amount", "danger");
    document.getElementById("amount").classList.add("invalid");
    return;
  }

  if (!currency) {
    showAlert("Please select a currency", "danger");
    document.getElementById("currency").classList.add("invalid");
    return;
  }

  showAlert(
    `International wire transfer of ${amount} ${currency} to ${recipientName} initiated${
      memo ? " with memo: " + memo : ""
    }!`,
    "success"
  );
  document.getElementById("wire-form").reset();
}

function resetForm() {
  document.getElementById("wire-form").reset();
  document
    .querySelectorAll(".form-control")
    .forEach((input) => input.classList.remove("invalid"));
  showAlert("Form reset", "success");
}

// Validation Functions
function validateAccountNumber(account) {
  const input = typeof account === "string" ? account : account.target.value;
  const re = /^\d{10,20}$/;
  const isValid = re.test(input);
  if (typeof account !== "string") {
    account.target.classList.toggle("invalid", input && !isValid);
  }
  return isValid;
}

function validateSwiftCode(swift) {
  const input = typeof swift === "string" ? swift : swift.target.value;
  const re = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  const isValid = re.test(input);
  if (typeof swift !== "string") {
    swift.target.classList.toggle("invalid", input && !isValid);
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
