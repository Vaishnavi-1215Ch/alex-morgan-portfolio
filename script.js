"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const serviceSelect = document.querySelector("#service-select");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});

document.querySelectorAll("[data-project], [data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const project = link.dataset.project;
    const inquiry = project || link.dataset.service;
    const matchingOption = [...serviceSelect.options].find((option) => option.textContent === inquiry);
    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    } else if (project) {
      serviceSelect.value = "Something else entirely";
      contactForm.elements.message.value = `I'm interested in discussing ${project}.`;
    }
    formStatus.textContent = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const name = contactForm.elements.name.value.trim();
  formStatus.textContent = `Thanks, ${name} — this fictional demo form isn't connected to a mailbox, so your inquiry hasn't been sent.`;
  contactForm.reset();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
