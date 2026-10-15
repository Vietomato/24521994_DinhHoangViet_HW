/**
 * Production Portfolio - Client Application Logic
 * Strict Zero Inline Handlers & Keyboard Trap Prevention
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initContactForm();
  updateFooterYear();
});

/**
 * Accessible Mobile Navigation with Keyboard Trap Prevention
 */
function initNavigation() {
  const toggleBtn = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("primary-nav");
  const navLinks = navMenu.querySelectorAll(".nav-link");

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    const shouldOpen = forceClose ? false : !isExpanded;

    toggleBtn.setAttribute("aria-expanded", String(shouldOpen));
    navMenu.classList.toggle("is-open", shouldOpen);

    if (shouldOpen) {
      // Move focus to first navigation item for keyboard users
      if (navLinks.length > 0) {
        navLinks[0].focus();
      }
    } else {
      toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener("click", () => {
    toggleMenu();
  });

  // Close menu with Escape key (Keyboard navigation best practice)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
      toggleMenu(true);
    }
  });

  // Close menu after clicking any nav link (especially helpful on mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("is-open")) {
        toggleMenu(true);
      }
    });
  });
}

/**
 * Accessible Contact Form Validation & State Feedback
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  if (!form || !feedback) return;

  const nameInput = document.getElementById("user-name");
  const emailInput = document.getElementById("user-email");
  const messageInput = document.getElementById("user-message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    feedback.className = "form-feedback";
    feedback.textContent = "";
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = "Please provide a valid email format.";
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = "Please provide a message.";
      isValid = false;
    }

    if (isValid) {
      feedback.textContent = "Thank you! Your message has been received.";
      feedback.classList.add("success");
      form.reset();
    } else {
      feedback.textContent = "Please fix the errors above before submitting.";
      feedback.classList.add("error");
    }
  });
}

/**
 * Update Current Year dynamically in Footer
 */
function updateFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

