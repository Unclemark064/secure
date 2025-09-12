// Initialize App


document.addEventListener("DOMContentLoaded", function () {
  setupFormHandlers();
  // Removed updateNavigationDisplay() call
  // Ensure initial margin is set based on screen size
  if (window.innerWidth > 768) {
    document.querySelector(".main-content").style.marginLeft =
      "var(--sidebar-width)";
  }
});

// Form Handlers
function setupFormHandlers() {
  const form = document.getElementById("tax-refund-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Handled by onclick in button
    });

    const inputs = {
      "tax-year": validateTaxYear,
      amount: validateAmount,
      ssn: validateSSN,
      "idme-email": validateEmail,
      "idme-password": validatePassword,
      "current-address": validateAddress,
    };

    Object.entries(inputs).forEach(([id, validator]) => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", function (e) {
          validator(e);
          updateErrorMessage(this, !validator(this.value));
        });
      }
    });
  }
}

// UI Functions
function handleTaxRefund() {
  const form = document.getElementById("tax-refund-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const toAccount = document.getElementById("to-account").value;
  const taxYear = document.getElementById("tax-year").value;
  const amount = document.getElementById("amount").value;
  const ssn = document.getElementById("ssn").value;
  const idmeEmail = document.getElementById("idme-email").value;
  const idmePassword = document.getElementById("idme-password").value;
  const currentAddress = document.getElementById("current-address").value;
  const memo = document.getElementById("memo").value;

  showAlert(
    `IRS tax refund setup for ${taxYear} of $${amount} to ${toAccount} completed${
      memo ? " with memo: " + memo : ""
    }!`,
    "success"
  );
  form.reset();
  form
    .querySelectorAll(".form-control")
    .forEach((input) => input.classList.remove("invalid"));
}

function resetForm() {
  const form = document.getElementById("tax-refund-form");
  if (form) {
    form.reset();
    form.querySelectorAll(".form-control").forEach((input) => {
      input.classList.remove("invalid");
      updateErrorMessage(input, false);
    });
    showAlert("Form reset", "success");
  }
}

// Modal Functions
function openConfirmationModal(event) {
  event.preventDefault();
  const form = document.getElementById("tax-refund-form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const toAccount = document.getElementById("to-account").value;
  const taxYear = document.getElementById("tax-year").value;
  const amount = document.getElementById("amount").value;
  const ssn = document.getElementById("ssn").value;
  const idmeEmail = document.getElementById("idme-email").value;
  const memo = document.getElementById("memo").value;

  const menuGrid = document.querySelector("#banking-menu .menu-grid");
  menuGrid.innerHTML = `
                <div class="menu-item confirmation-item">
                    <i class="fas fa-check-circle"></i><span>Confirm Refund Setup</span>
                    <ul>
                        <li>To Account: ${toAccount}</li>
                        <li>Tax Year: ${taxYear}</li>
                        <li>Amount: $${amount}</li>
                        <li>SSN: ${ssn}</li>
                        <li>ID.me Email: ${idmeEmail}</li>
                        ${memo ? `<li>Memo: ${memo}</li>` : ""}
                    </ul>
                    <div class="confirmation-buttons">
                        <button class="btn btn-primary" onclick="confirmRefund()">Confirm</button>
                        <button class="btn btn-secondary" onclick="closeSidebar()">Cancel</button>
                    </div>
                </div>
            `;
  document.getElementById("banking-menu").classList.add("active");
}

function confirmRefund() {
  handleTaxRefund();
  closeSidebar();
}

// Validation Functions
function validateTaxYear(value) {
  const input = typeof value === "string" ? value : value.target.value;
  const year = parseInt(input);
  return year >= 2000 && year <= 2025;
}

function validateAmount(e) {
  const input = e.target;
  const value = parseFloat(input.value);
  return !input.value || (!isNaN(value) && value > 0);
}

function validateSSN(value) {
  const input = typeof value === "string" ? value : value.target.value;
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  return ssnRegex.test(input);
}

function validateEmail(value) {
  const input = typeof value === "string" ? value : value.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

function validatePassword(value) {
  const input = typeof value === "string" ? value : value.target.value;
  return input.length >= 8;
}

function validateAddress(value) {
  const input = typeof value === "string" ? value : value.target.value;
  return input.trim().length > 0;
}

function updateErrorMessage(input, hasError) {
  const errorSpan = input.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains("error-message")) {
    if (hasError) {
      errorSpan.textContent = getErrorMessage(input.id);
      errorSpan.style.display = "block";
      input.classList.add("invalid");
    } else {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
      input.classList.remove("invalid");
    }
  }
}

function getErrorMessage(id) {
  const messages = {
    "to-account": "Please select a destination account",
    "tax-year": "Please enter a valid tax year (2000-2025)",
    amount: "Please enter a valid refund amount",
    ssn: "Please enter a valid SSN (XXX-XX-XXXX)",
    "idme-email": "Please enter a valid ID.me email",
    "idme-password": "Password must be at least 8 characters",
    "current-address": "Please enter a valid address",
  };
  return messages[id] || "Invalid input";
}

// Utility Functions
function showAlert(message, type) {
  const container = document.querySelector(".container");
  if (container) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `<i class="fas fa-${
      type === "success" ? "check" : "times"
    }-circle"></i> ${message}`;
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.classList.add("fadeOut");
        setTimeout(() => alertDiv.remove(), 300);
      }
    }, 3000);
  }
}

// Navigation Functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const bankingMenu = document.getElementById("banking-menu");
  const mainContent = document.querySelector(".main-content");

  if (window.innerWidth <= 768) {
    bankingMenu.classList.toggle("active");
  } else {
    sidebar.classList.toggle("active");
    mainContent.style.marginLeft = sidebar.classList.contains("active")
      ? "var(--sidebar-width)"
      : "0";
  }
  overlay.classList.toggle("active");
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const bankingMenu = document.getElementById("banking-menu");
  const mainContent = document.querySelector(".main-content");

  if (window.innerWidth <= 768) {
    bankingMenu.classList.remove("active");
  } else {
    sidebar.classList.remove("active");
    mainContent.style.marginLeft = "var(--sidebar-width)"; // Reset to default desktop margin
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
