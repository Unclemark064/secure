// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
});

// Form Handlers
function setupFormHandlers() {
  document.getElementById("loan-form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleLoanApplication();
  });

  document.getElementById("amount").addEventListener("input", validateAmount);
}

// UI Functions
function handleLoanApplication() {
  const loanType = document.getElementById("loan-type").value;
  const amount = document.getElementById("amount").value;
  const term = document.getElementById("term").value;
  const purpose = document.getElementById("purpose").value;

  if (!loanType) {
    showAlert("Please select a loan type", "danger");
    document.getElementById("loan-type").classList.add("invalid");
    return;
  }

  if (!amount || amount < 1000) {
    showAlert("Please enter a loan amount of at least $1000", "danger");
    document.getElementById("amount").classList.add("invalid");
    return;
  }

  if (!term) {
    showAlert("Please select a loan term", "danger");
    document.getElementById("term").classList.add("invalid");
    return;
  }

  if (!purpose) {
    showAlert("Please enter the purpose of the loan", "danger");
    document.getElementById("purpose").classList.add("invalid");
    return;
  }

  showAlert(
    `Loan application for $${amount} ${loanType} over ${term} years submitted!`,
    "success"
  );
  document.getElementById("loan-form").reset();
}

function resetForm() {
  document.getElementById("loan-form").reset();
  document
    .querySelectorAll(".form-control")
    .forEach((input) => input.classList.remove("invalid"));
  showAlert("Form reset", "success");
}

// Validation Functions
function validateAmount(e) {
  const input = e.target;
  const value = parseFloat(input.value);
  input.classList.toggle(
    "invalid",
    input.value && (isNaN(value) || value < 1000)
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
