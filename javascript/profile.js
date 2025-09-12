let accountVisible = false;

document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
});

function setupEventListeners() {
  // Avatar upload
  document
    .getElementById("avatar-upload")
    .addEventListener("change", handleAvatarUpload);

  // Password form
  document
    .getElementById("password-form")
    .addEventListener("submit", handlePasswordChange);
}

function toggleEditMode(section) {
  const viewMode = document.getElementById(section + "-view");
  const editMode = document.getElementById(section + "-edit");

  viewMode.classList.add("editing");
  editMode.classList.add("active");
}

function cancelEdit(section) {
  const viewMode = document.getElementById(section + "-view");
  const editMode = document.getElementById(section + "-edit");

  viewMode.classList.remove("editing");
  editMode.classList.remove("active");
}

function savePersonalInfo() {
  const name = document.getElementById("edit-name").value;
  const email = document.getElementById("edit-email").value;
  const phone = document.getElementById("edit-phone").value;
  const address = document.getElementById("edit-address").value;

  // Update view mode with new values
  const infoRows = document.querySelectorAll("#personal-view .info-value");
  infoRows[0].textContent = name;
  infoRows[1].textContent = email;
  infoRows[2].textContent = phone;
  infoRows[3].textContent = address;

  // Update header name
  document.getElementById("profile-name").textContent = name;

  cancelEdit("personal");
  showAlert("Personal information updated successfully!", "success");
}

function toggleAccountNumber() {
  const display = document.getElementById("account-display");
  const toggle = document.getElementById("account-toggle");

  if (accountVisible) {
    display.textContent = "****1234";
    toggle.className = "fas fa-eye";
    accountVisible = false;
  } else {
    display.textContent = "1234567890";
    toggle.className = "fas fa-eye-slash";
    accountVisible = true;
  }
}

function toggle2FA() {
  const toggle = document.getElementById("2fa-toggle");

  if (toggle.checked) {
    showAlert(
      "Two-factor authentication setup would be initiated here",
      "success"
    );
  } else {
    if (
      confirm("Are you sure you want to disable two-factor authentication?")
    ) {
      showAlert("Two-factor authentication disabled", "warning");
    } else {
      toggle.checked = true;
    }
  }
}

function showPasswordModal() {
  document.getElementById("password-modal").style.display = "flex";
}

function showPinModal() {
  showAlert("PIN update functionality would be implemented here", "info");
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function handlePasswordChange(e) {
  e.preventDefault();

  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (newPassword !== confirmPassword) {
    showAlert("New passwords do not match", "danger");
    return;
  }

  if (newPassword.length < 8) {
    showAlert("Password must be at least 8 characters long", "danger");
    return;
  }

  // Simulate password change
  setTimeout(() => {
    showAlert("Password updated successfully!", "success");
    closeModal("password-modal");
    document.getElementById("password-form").reset();
  }, 1000);
}

function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      showAlert("File size must be less than 5MB", "danger");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const avatar = document.querySelector(".profile-avatar");
      avatar.innerHTML = `
                        <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                        <div class="avatar-upload">
                            <i class="fas fa-camera" style="font-size: 14px;"></i>
                        </div>
                    `;
      showAlert("Profile picture updated successfully!", "success");
    };
    reader.readAsDataURL(file);
  }
}

function startVerification() {
  showAlert("Redirecting to identity verification process...", "info");
  setTimeout(() => {
    window.location.href = "verification.html";
  }, 1500);
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
    warning: "exclamation-triangle",
    info: "info-circle",
  };
  return icons[type] || "info-circle";
}

// Phone number formatting
document.getElementById("edit-phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else if (value.length >= 3) {
    value = value.replace(/(\d{3})(\d{0,3})/, "($1) $2");
  }
  e.target.value = value;
});

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  if (e.target.style && e.target.style.position === "fixed") {
    closeModal(e.target.id);
  }
});

