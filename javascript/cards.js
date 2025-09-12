document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
});

function setupEventListeners() {
  document
    .getElementById("card-application-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      handleCardApplication();
    });
}

function updateCardInfo() {
  const cardType = document.getElementById("card-type").value;
  const cardInfo = document.getElementById("card-info");
  const shippingGroup = document.getElementById("shipping-address-group");
  const description = document.getElementById("card-description");

  const cardDescriptions = {
    "credit-classic":
      "Classic Credit Card with 1% cashback on all purchases. No annual fee.",
    "credit-premium":
      "Premium Credit Card with 2% cashback, travel insurance, and concierge service. $95 annual fee.",
    debit:
      "Debit Card linked to your checking account. No fees for ATM withdrawals.",
    virtual:
      "Virtual Card for online purchases. Instant approval and activation.",
  };

  if (cardType && cardDescriptions[cardType]) {
    description.textContent = cardDescriptions[cardType];
    cardInfo.style.display = "block";

    if (cardType === "virtual") {
      shippingGroup.style.display = "none";
      document.getElementById("shipping-address").required = false;
    } else {
      shippingGroup.style.display = "block";
      document.getElementById("shipping-address").required = true;
    }
  } else {
    cardInfo.style.display = "none";
    shippingGroup.style.display = "none";
  }
}

function handleCardApplication() {
  const cardType = document.getElementById("card-type").value;
  const cardDesign = document.getElementById("card-design").value;

  if (!cardType) {
    showAlert("Please select a card type", "danger");
    return;
  }

  // Simulate application processing
  const btn = document.querySelector(
    '#card-application-form button[type="submit"]'
  );
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

  setTimeout(() => {
    showAlert(
      "Card application submitted successfully! You will receive a decision within 2-3 business days.",
      "success"
    );
    closeModal("card-application-modal");
    document.getElementById("card-application-form").reset();
    btn.disabled = false;
    btn.innerHTML = originalText;
    updateCardInfo(); // Reset card info display
  }, 3000);
}

function showCardDetails(cardId) {
  const cardDetails = {
    1: {
      type: "Premium Credit Card",
      number: "**** **** **** 1234",
      balance: "$250.00",
      limit: "$5,000.00",
      available: "$4,750.00",
    },
    2: {
      type: "Debit Card",
      number: "**** **** **** 5678",
      balance: "$12,543.67",
      dailyLimit: "$500.00",
      purchaseLimit: "$2,500.00",
    },
  };

  const card = cardDetails[cardId];
  if (card) {
    alert(
      `${card.type}\nCard Number: ${card.number}\n\nNote: Full card details modal would be implemented here with transaction history, statements, and settings.`
    );
  }
}

function viewTransactions(cardId) {
  showAlert("Redirecting to card transactions...", "info");
  setTimeout(() => {
    window.location.href = "transactions.html?card=" + cardId;
  }, 1000);
}

function makePayment(cardId) {
  showAlert("Redirecting to payment portal...", "info");
  // In a real app, this would show a payment form or redirect
}

function setLimits(cardId) {
  const newLimit = prompt("Enter new daily ATM limit (current: $500):");
  if (newLimit && !isNaN(newLimit)) {
    showAlert(
      `ATM limit updated to ${parseFloat(newLimit).toFixed(2)}`,
      "success"
    );
  }
}

function cardSettings(cardId) {
  showAlert(
    "Card settings would include: Lock/Unlock card, Change PIN, Update contact info, Set alerts",
    "info"
  );
}

function showModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "login.html";
  }
}

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `<i class="fas fa-${getAlertIcon(
    type
  )}"></i> ${message}`;

  alertContainer.innerHTML = "";
  alertContainer.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

function getAlertIcon(type) {
  const icons = {
    success: "check-circle",
    danger: "exclamation-triangle",
    info: "info-circle",
  };
  return icons[type] || "info-circle";
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
  }
});
