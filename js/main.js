const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");
const select = (className) => document.querySelector(className);
const nums = document.querySelectorAll(".counter-box .num");
const section = document.querySelector(".counter");
let started = false;

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 90; // Adjust for the fixed navbar height
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const currentNavLink = document.querySelector(
    `nav ul li a[href="#${current}"]`,
  );
  if (currentNavLink) {
    currentNavLink.classList.add("active");
  }
});

// Add smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1); // Remove the '#' character
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 90, // Adjust for the fixed navbar height
        behavior: "smooth",
      });
    }
  });
});

// Type effect
const typed = select(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

// Increasing counter
function startCounter(el) {
  const goal = el.dataset.goal;
  const count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 1500 / goal);
}

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop - 400) {
    if (!started) {
      nums.forEach((num) => {
        startCounter(num);
      });
    }
    started = true;
  }
};
