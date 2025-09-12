
      // Initialize App
      document.addEventListener("DOMContentLoaded", function () {
        showAlert("Loan history loaded", "success");
      });

      // Table Sorting
      function sortTable(column) {
        const table = document.getElementById("loan-table");
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        const isNumeric = [2].includes(column); // Amount is numeric
        const isDate = [4].includes(column); // Date Applied is date

        rows.sort((a, b) => {
          let aValue = a.cells[column].textContent;
          let bValue = b.cells[column].textContent;

          if (isNumeric) {
            aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
            bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));
            return aValue - bValue;
          } else if (isDate) {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
            return aValue - bValue;
          } else {
            return aValue.localeCompare(bValue);
          }
        });

        tbody.innerHTML = "";
        rows.forEach((row) => tbody.appendChild(row));
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
  