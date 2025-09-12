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

