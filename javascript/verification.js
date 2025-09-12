 
      // Initialize App
      document.addEventListener("DOMContentLoaded", function () {
        setupFormHandlers();
      });

      // Form Handlers
      function setupFormHandlers() {
        document
          .getElementById("verification-form")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            handleVerification();
          });

        document
          .getElementById("id-upload")
          .addEventListener("change", validateFile);
        document
          .getElementById("selfie-upload")
          .addEventListener("change", validateFile);
      }

      // UI Functions
      function handleVerification() {
        const idUpload = document.getElementById("id-upload").files[0];
        const selfieUpload = document.getElementById("selfie-upload").files[0];

        if (!idUpload) {
          showAlert("Please upload a government-issued ID", "danger");
          return;
        }

        if (!selfieUpload) {
          showAlert("Please upload a selfie", "danger");
          return;
        }

        showAlert("Verification submitted successfully!", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 2000);
      }

      function validateFile(e) {
        const file = e.target.files[0];
        if (file) {
          const maxSize = 10 * 1024 * 1024; // 10MB
          if (file.size > maxSize) {
            showAlert("File size must be less than 10MB", "danger");
            e.target.value = "";
            return;
          }

          const allowedTypes = {
            "id-upload": ["image/jpeg", "image/png", "application/pdf"],
            "selfie-upload": ["image/jpeg", "image/png"],
          };

          const allowed = allowedTypes[e.target.id];
          if (!allowed.includes(file.type)) {
            showAlert(
              "Invalid file type. Please check the allowed formats.",
              "danger"
            );
            e.target.value = "";
            return;
          }

          const uploadArea = e.target.closest(".file-upload");
          const p = uploadArea.querySelector("p");
          if (p) {
            p.textContent = `Selected: ${file.name}`;
            p.style.color = "var(--success-green)";
          }
        }
      }

      // Utility Functions
      function showAlert(message, type) {
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `<i class="fas fa-${
          type === "success" ? "check" : type === "danger" ? "times" : "info"
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
  