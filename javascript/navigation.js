const Navigation = {
  // Configuration
  config: {
    mobileBreakpoint: 768,
    alertDuration: 5000,
    keyboardEnabled: true,
  },

  // Initialize navigation system
  init() {
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupResponsiveHandling();
    console.log("Navigation system initialized");
  },

  // Setup all event listeners
  setupEventListeners() {
    // Multiple possible toggle button selectors
    const toggleButtons = document.querySelectorAll(
      '.hamburger, .menu-toggle, .sidebar-toggle, [data-toggle="sidebar"]'
    );
    toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleSidebar();
      });
    });

    // Modal toggle buttons
    const modalToggleButtons = document.querySelectorAll(
      '[data-toggle="modal"]'
    );
    modalToggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetModal = button.getAttribute("data-target");
        if (targetModal) {
          this.showModal(targetModal.replace("#", ""));
        }
      });
    });

    // Overlay click to close
    const overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.closeSidebar());
    }

    // Close sidebar/menu when clicking outside (but not modal areas)
    document.addEventListener("click", (e) => {
      const sidebar = document.getElementById("sidebar");
      const bankingMenu = document.getElementById("banking-menu");
      const toggleButtons = document.querySelectorAll(
        '.hamburger, .menu-toggle, .sidebar-toggle, [data-toggle="sidebar"]'
      );
      const isToggleButton = Array.from(toggleButtons).some((btn) =>
        btn.contains(e.target)
      );
      const activeModal = document.querySelector(".modal.active");

      if (activeModal && activeModal.contains(e.target)) {
        return;
      }

      if (
        !isToggleButton &&
        sidebar &&
        !sidebar.contains(e.target) &&
        bankingMenu &&
        !bankingMenu.contains(e.target)
      ) {
        this.closeSidebar();
      }
    });

    // Modal handling - close when clicking modal backdrop
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.classList.remove("active");
      }
    });

    // Modal close buttons
    document.addEventListener("click", (e) => {
      if (e.target.matches('.modal-close, [data-dismiss="modal"]')) {
        const modal = e.target.closest(".modal");
        if (modal) {
          modal.classList.remove("active");
        }
      }
    });
  },

  // Setup keyboard navigation
  setupKeyboardNavigation() {
    if (!this.config.keyboardEnabled) return;

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Escape":
          this.closeSidebar();
          this.closeAllModals();
          break;
        case "Tab":
          this.handleTabNavigation(e);
          break;
      }
    });
  },

  // Setup responsive handling
  setupResponsiveHandling() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250); // Debounce resize events
    });
  },

  // Handle window resize
  handleResize() {
    if (window.innerWidth > this.config.mobileBreakpoint) {
      const bankingMenu = document.getElementById("banking-menu");
      const overlay = document.getElementById("overlay");

      if (bankingMenu) bankingMenu.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    }
  },

  // Toggle sidebar functionality
  toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const bankingMenu = document.getElementById("banking-menu");

    if (!overlay) {
      console.warn("Overlay element not found");
      return;
    }

    if (window.innerWidth <= this.config.mobileBreakpoint) {
      // Mobile: toggle banking menu
      if (bankingMenu) {
        const isActive = bankingMenu.classList.contains("active");

        if (isActive) {
          bankingMenu.classList.remove("active");
          overlay.classList.remove("active");
          bankingMenu.style.display = "none";
        } else {
          bankingMenu.classList.add("active");
          overlay.classList.add("active");
          bankingMenu.style.display = "flex";
          bankingMenu.style.zIndex = "1000";
        }

        console.log("Mobile menu toggled:", !isActive);
      } else {
        console.warn("Banking menu element not found");
      }
    } else {
      // Desktop: toggle sidebar
      if (sidebar) {
        const isActive = sidebar.classList.contains("active");

        if (isActive) {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
        } else {
          sidebar.classList.add("active");
          overlay.classList.add("active");
        }

        console.log("Desktop sidebar toggled:", !isActive);
      } else {
        console.warn("Sidebar element not found");
      }
    }
  },

  // Close sidebar
  closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const bankingMenu = document.getElementById("banking-menu");

    if (sidebar) sidebar.classList.remove("active");
    if (bankingMenu) bankingMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  },

  // Navigate and close sidebar
  navigateAndClose(url) {
    if (!url) {
      console.warn("Navigation URL not provided");
      return;
    }

    this.closeSidebar();

    setTimeout(() => {
      window.location.href = url;
    }, 100);
  },

  // Logout functionality
  logout() {
    if (confirm("Are you sure you want to logout?")) {
      this.clearSessionData();

      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.style.display = "none";
      }

      window.location.href = "index.html";
    }
  },

  // Logout and close sidebar
  logoutAndClose() {
    this.closeSidebar();
    setTimeout(() => this.logout(), 100);
  },

  // Account verification
  verifyAccount() {
    this.showAlert("Please complete the verification process.", "info");
  },

  // Clear session data
  clearSessionData() {
    console.log("Session data cleared");
  },

  // Modal management
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
    }
  },

  closeAllModals() {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
    });
  },

  // Alert system
  showAlert(message, type = "info") {
    const alertContainer = this.getOrCreateAlertContainer();
    const alertDiv = document.createElement("div");

    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <i class="fas fa-${this.getAlertIcon(type)}"></i> 
      ${message}
      <button class="alert-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;

    alertContainer.innerHTML = "";
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, this.config.alertDuration);

    return alertDiv;
  },

  // Get or create alert container
  getOrCreateAlertContainer() {
    let container = document.getElementById("alert-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "alert-container";
      container.className = "alert-container";

      const mainContainer =
        document.querySelector(".container") ||
        document.querySelector("main") ||
        document.body;

      mainContainer.insertBefore(container, mainContainer.firstChild);
    }

    return container;
  },

  // Get alert icon based on type
  getAlertIcon(type) {
    const icons = {
      success: "check-circle",
      danger: "exclamation-triangle",
      warning: "exclamation-triangle",
      info: "info-circle",
      error: "times-circle",
    };
    return icons[type] || "info-circle";
  },

  // Handle tab navigation for accessibility
  handleTabNavigation(e) {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      const focusableElements = activeModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  },

  // Utility method to check if mobile
  isMobile() {
    return window.innerWidth <= this.config.mobileBreakpoint;
  },

  // Utility method to get current page
  getCurrentPage() {
    return window.location.pathname.split("/").pop() || "index.html";
  },

  // Update active navigation item
  updateActiveNavigation() {
    const currentPage = this.getCurrentPage();
    const navLinks = document.querySelectorAll("[data-nav-page]");

    navLinks.forEach((link) => {
      const targetPage = link.getAttribute("data-nav-page");
      link.classList.toggle("active", targetPage === currentPage);
    });
  },

  // Enhanced navigation with loading state
  navigateWithLoading(url, showLoader = true) {
    if (showLoader) {
      this.showAlert("Loading...", "info");
    }

    this.closeSidebar();

    setTimeout(() => {
      window.location.href = url;
    }, 100);
  },
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => Navigation.init());
} else {
  Navigation.init();
}

// Global functions for backward compatibility and ease of use
function toggleSidebar() {
  Navigation.toggleSidebar();
}

function closeSidebar() {
  Navigation.closeSidebar();
}

function navigateAndClose(url) {
  Navigation.navigateAndClose(url);
}

function logoutAndClose() {
  Navigation.logoutAndClose();
}

function logout() {
  Navigation.logout();
}

function verifyAccount() {
  Navigation.verifyAccount();
}

function showModal(modalId) {
  Navigation.showModal(modalId);
}

function closeModal(modalId) {
  Navigation.closeModal(modalId);
}

function showAlert(message, type) {
  Navigation.showAlert(message, type);
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = Navigation;
}

// Make available globally
window.Navigation = Navigation;
