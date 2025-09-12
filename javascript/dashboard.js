// Initialize App
document.addEventListener("DOMContentLoaded", function () {
  updateGreeting();
  setInterval(updateGreeting, 60000);
});

// UI Functions
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  document.getElementById("greeting-text").textContent = `${greeting}, User!`;
  document.getElementById("current-datetime").textContent =
    now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
}

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

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeSidebar();
  }
});
