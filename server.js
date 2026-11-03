

"use strict";

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initStarField();
  initScrollReveals();
  initSmoothAnchorScrolling();
  initMoonScrollAnimation();
  initHeroInteractions();
  initHeroTyping();

  setTimeout(() => {
    initDescriptionAnimation();
  }, 4500);

  initContactForm();
  setCurrentYear();
});



function initMobileNavigation() {
  const button = document.querySelector("#hamburger");
  const menu = document.querySelector("#nav-menu");

  if (!button || !menu) return;

  function closeMenu() {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
    menu.classList.remove("is-open");
  }

  button.addEventListener("click", () => {
    const isOpening =
      button.getAttribute("aria-expanded") !== "true";

    button.setAttribute("aria-expanded", String(isOpening));
    button.setAttribute(
      "aria-label",
      isOpening ? "Close navigation" : "Open navigation"
    );

    menu.classList.toggle("is-open", isOpening);
  });

  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !menu.contains(event.target) &&
      !button.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      button.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}



function initStarField() {
  const field = document.querySelector("#star-field");

  if (!field) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  if (field.children.length > 0) return;

  const count = window.innerWidth < 600 ? 45 : 110;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * -8}s`;
    star.style.animationDuration = `${4 + Math.random() * 6}s`;

    const size = Math.random() > 0.82 ? 3 : 1.5;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    if (Math.random() > 0.8) {
      star.classList.add("star-bright");
    }

    fragment.appendChild(star);
  }

  field.appendChild(fragment);
}


function initScrollReveals() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  items.forEach((item) => observer.observe(item));

  if (
    typeof window.gsap !== "undefined" &&
    typeof window.ScrollTrigger !== "undefined"
  ) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);

      window.gsap.utils.toArray(".section-kicker").forEach((item) => {
        window.gsap.fromTo(
          item,
          { opacity: 0.4, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true
            }
          }
        );
      });
    } catch (error) {
      console.warn("GSAP enhancement skipped:", error);
    }
  }
}



function initSmoothAnchorScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let animationFrame = null;

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let target;

      try {
        target = document.querySelector(href);
      } catch {
        return;
      }

      if (!target) return;

      event.preventDefault();

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      if (reducedMotion.matches) {
        target.scrollIntoView({ behavior: "auto" });
        history.replaceState(null, "", href);
        return;
      }

      const startY = window.scrollY;
      const header = document.querySelector(".site-header");

      const headerHeight = header
        ? header.getBoundingClientRect().height
        : 0;

      const targetY =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      const distance = targetY - startY;

      const duration = Math.min(
        2200,
        Math.max(850, Math.abs(distance) * 0.7)
      );

      let startTime = null;

      function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo({
          top: startY + distance * eased,
          behavior: "auto"
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateScroll);
        } else {
          animationFrame = null;
          history.replaceState(null, "", href);
        }
      }

      animationFrame = requestAnimationFrame(animateScroll);
    });
  });
}



function initMoonScrollAnimation() {
  const hero = document.querySelector(".hero");
  const moon = document.querySelector(".moon");

  if (!hero || !moon) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) return;

  let ticking = false;

  function updateMoon() {
    const heroHeight = hero.offsetHeight || window.innerHeight;

    const progress = Math.min(
      1,
      Math.max(0, window.scrollY / (heroHeight * 0.85))
    );

    const scale = 1 + progress * 1.2;
    const rotation = progress * 90;
    const opacity = 1 - progress * 0.25;

    moon.style.setProperty("--moon-scale", scale.toFixed(3));
    moon.style.setProperty("--moon-rotation", `${rotation}deg`);
    moon.style.setProperty("--moon-opacity", opacity.toFixed(3));
    moon.style.setProperty("--moon-progress", progress.toFixed(3));

    ticking = false;
  }

  function requestMoonUpdate() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateMoon);
  }

  window.addEventListener("scroll", requestMoonUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestMoonUpdate, {
    passive: true
  });

  updateMoon();
}



function initHeroInteractions() {
  const hero = document.querySelector(".hero");
  const moon = document.querySelector(".moon");

  if (!hero || !moon) return;

  const finePointer = window.matchMedia("(pointer: fine)");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (!finePointer.matches || reducedMotion.matches) return;

  let pointerFrame = null;
  let pointerX = 0;
  let pointerY = 0;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();

    pointerX =
      ((event.clientX - rect.left) / rect.width - 0.5) * 20;

    pointerY =
      ((event.clientY - rect.top) / rect.height - 0.5) * 20;

    if (pointerFrame !== null) return;

    pointerFrame = requestAnimationFrame(() => {
      moon.style.setProperty("--moon-x", `${pointerX}px`);
      moon.style.setProperty("--moon-y", `${pointerY}px`);

      pointerFrame = null;
    });
  });

  hero.addEventListener("pointerleave", () => {
    if (pointerFrame !== null) {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = null;
    }

    moon.style.setProperty("--moon-x", "0px");
    moon.style.setProperty("--moon-y", "0px");
  });
}



function initHeroTyping() {
  const elements = document.querySelectorAll(".typewriter");

  if (!elements.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    elements.forEach((element) => {
      element.textContent = element.dataset.text || "";
    });
    return;
  }

  elements.forEach((element) => {
    const text = element.dataset.text || "";
    const delay = Number(element.dataset.delay) || 0;

    if (!text) return;

    element.textContent = "";

    window.setTimeout(() => {
      element.classList.add("typewriter-cursor");

      let index = 0;

      function typeCharacter() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index += 1;

          window.setTimeout(typeCharacter, 45);
        } else {
          element.classList.remove("typewriter-cursor");
        }
      }

      typeCharacter();
    }, delay);
  });
}



function initContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  if (!form) return;

  const submit = form.querySelector('button[type="submit"]');
  const originalText = submit ? submit.innerHTML : "";

  function setStatus(message, success = false) {
    if (!status) return;

    status.textContent = message;

    status.style.color = success
      ? "#9bd6a7"
      : "#ffd166";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (
      typeof window.emailjs === "undefined" ||
      typeof window.emailjs.sendForm !== "function"
    ) {
      setStatus(
        "Email service is not configured. Please contact me directly by email."
      );
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending...";
    }

    setStatus("Sending your messageâ€¦");

    try {
      if (typeof window.emailjs.init === "function") {
        window.emailjs.init("zcwDXXnvY0Gg3Lw2K");
      }

      await window.emailjs.sendForm(
        "service_5u6z3qi",
        "template_qvyhnku",
        form
      );

      form.reset();

      setStatus(
        "Message sent â€” thank you for reaching out!",
        true
      );
    } catch (error) {
      console.error("EmailJS submission failed:", error);

      setStatus(
        "Sorry, your message could not be sent. Please email me directly."
      );
    } finally {
      if (submit) {
        submit.disabled = false;

        submit.innerHTML =
          originalText ||
          'Send message <span aria-hidden="true">â†—</span>';
      }
    }
  });
}


function setCurrentYear() {
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function initDescriptionAnimation() {
  const description = document.querySelector("#hero-description");

  if (!description) return;

  const text = description.textContent.trim();

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  description.textContent = "";

  const words = text.split(" ");
  let letterIndex = 0;

  const speed = 18;

  words.forEach((word, wordIndex) => {
    const wordElement = document.createElement("span");
    wordElement.className = "word";

    [...word].forEach((character) => {
      const letter = document.createElement("span");

      letter.className = "letter";
      letter.textContent = character;
      letter.style.animationDelay = `${letterIndex * speed}ms`;

      wordElement.appendChild(letter);
      letterIndex++;
    });

    description.appendChild(wordElement);

    if (wordIndex < words.length - 1) {
      description.appendChild(document.createTextNode(" "));
      letterIndex++;
    }
  });
}
