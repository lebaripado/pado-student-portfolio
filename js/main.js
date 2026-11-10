/* =========================================================
   main.js — runs on EVERY page

   What this file does:
   1. Puts the current year in the footer
   2. Highlights the menu link for the page you are on
   3. Fades sections in as you scroll down (scroll reveal)
   ========================================================= */


/* ---------- 1. Footer year ---------- */

// Find the <span id="year"> in the footer
const yearSpan = document.getElementById("year");

// new Date().getFullYear() gives the current year, e.g. 2026
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* ---------- 2. Highlight the current page in the menu ---------- */

// Every <body> has data-page="home", "about", etc.
const currentPage = document.body.dataset.page;

// Get ALL menu links (top menu + bottom tab bar). This gives a list (like an array).
const navLinks = document.querySelectorAll("[data-nav]");

// Loop through each link one by one
for (let i = 0; i < navLinks.length; i++) {
  const link = navLinks[i];

  // If this link's data-nav matches the page we are on, mark it active
  if (link.dataset.nav === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page"); // tells screen readers "you are here"
  }
}


/* ---------- 3. Scroll reveal ---------- */

// All elements with class="reveal" start invisible (see styles.css)
const revealItems = document.querySelectorAll(".reveal");

// IntersectionObserver watches elements and tells us when they appear on screen
function handleReveal(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible"); // CSS fades it in
      observer.unobserve(entry.target);         // stop watching once shown
    }
  });
}

// Older browsers may not support IntersectionObserver, so check first
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(handleReveal, { threshold: 0.12 });
  revealItems.forEach(function (item) {
    observer.observe(item);
  });
} else {
  // Fallback: just show everything
  revealItems.forEach(function (item) {
    item.classList.add("is-visible");
  });
}
