document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
      hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");

          // Animate hamburger to X
          const spans = hamburger.querySelectorAll("span");
          spans.forEach((span) => span.classList.toggle("active"));

          if (navLinks.classList.contains("active")) {
              spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
              spans[1].style.opacity = "0";
              spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
          } else {
              spans[0].style.transform = "none";
              spans[1].style.opacity = "1";
              spans[2].style.transform = "none";
          }
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();

          // Close mobile menu if open
          if (navLinks.classList.contains("active")) {
              navLinks.classList.remove("active");
              const spans = hamburger.querySelectorAll("span");
              spans.forEach((span) => span.classList.remove("active"));
              spans[0].style.transform = "none";
              spans[1].style.opacity = "1";
              spans[2].style.transform = "none";
          }

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: "smooth",
              });
          }
      });
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;

          if (pageYOffset >= sectionTop - 200) {
              current = section.getAttribute("id");
          }
      });

      navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${current}`) {
              item.classList.add("active");
          }
      });
  });

  // Animation on scroll
  const animateOnScroll = () => {
      const elements = document.querySelectorAll(".feature-card, .step, .note-card");

      elements.forEach((element) => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;

          if (elementPosition < windowHeight - 100) {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
          }
      });
  };

  // Set initial state for animation
  const elementsToAnimate = document.querySelectorAll(".feature-card, .step, .note-card");
  elementsToAnimate.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.5s ease";
  });

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});
