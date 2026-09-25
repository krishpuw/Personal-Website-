(function () {
  "use strict";

  // Remove the no-js fallback class now that JS is running.
  document.documentElement.classList.remove("no-js");

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Scroll reveal ----------
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // ---------- Active-section nav highlighting ----------
  var sectionIds = ["about", "experience", "projects", "skills", "contact"];
  var sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  var navLinkGroups = [
    document.querySelectorAll('#navLinks a[data-section]'),
    document.querySelectorAll('#mobileNavLinks a[data-section]'),
  ];

  function setActive(id) {
    navLinkGroups.forEach(function (links) {
      links.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("data-section") === id);
      });
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          });
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  // ---------- Mobile menu ----------
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var menuIconOpen = document.getElementById("menuIconOpen");
  var menuIconClose = document.getElementById("menuIconClose");

  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuIconOpen.style.display = "";
    menuIconClose.style.display = "none";
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuIconOpen.style.display = isOpen ? "none" : "";
      menuIconClose.style.display = isOpen ? "" : "none";
    });

    document.querySelectorAll("#mobileNavLinks a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  // ---------- Contact form (no backend yet) ----------
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }
})();
