
      // Initialize App
      document.addEventListener("DOMContentLoaded", function () {
        setupFilters();
        showAlert("Transactions loaded", "success");
      });

      // Filter and Sort Handlers
      function setupFilters() {
        document
          .getElementById("filter-type")
          .addEventListener("change", filterTransactions);
        document
          .getElementById("filter-date")
          .addEventListener("change", filterTransactions);
      }

      function filterTransactions() {
        const typeFilter = document.getElementById("filter-type").value;
        const dateSort = document.getElementById("filter-date").value;
        const tbody = document
          .getElementById("transaction-table")
          .querySelector("tbody");
        const rows = Array.from(tbody.getElementsByTagName("tr"));

        // Filter by type
        rows.forEach((row) => {
          const type = row.cells[1].textContent.toLowerCase();
          row.style.display =
            typeFilter === "all" || type === typeFilter ? "" : "none";
        });

        // Sort by date
        const sortedRows = rows.sort((a, b) => {
          const dateA = new Date(a.cells[0].textContent);
          const dateB = new Date(b.cells[0].textContent);
          return dateSort === "asc" ? dateA - dateB : dateB - dateA;
        });

        // Clear and repopulate table
        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }
        sortedRows.forEach((row) => tbody.appendChild(row));
      }

      function sortTable(column) {
        const dateSort = document.getElementById("filter-date").value;
        const tbody = document
          .getElementById("transaction-table")
          .querySelector("tbody");
        const rows = Array.from(tbody.getElementsByTagName("tr"));

        const index = { date: 0, type: 1, amount: 2, status: 3 }[column];
        const sortedRows = rows.sort((a, b) => {
          let valA = a.cells[index].textContent;
          let valB = b.cells[index].textContent;
          if (column === "date") {
            valA = new Date(valA);
            valB = new Date(valB);
          } else if (column === "amount") {
            valA = parseFloat(valA.replace("$", "").replace(",", ""));
            valB = parseFloat(valB.replace("$", "").replace(",", ""));
          }
          return dateSort === "asc"
            ? valA > valB
              ? 1
              : -1
            : valA < valB
            ? 1
            : -1;
        });

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }
        sortedRows.forEach((row) => tbody.appendChild(row));
      }

      function viewTransaction(id) {
        showAlert(`Viewing transaction #${id} details`, "success");
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
      });
   