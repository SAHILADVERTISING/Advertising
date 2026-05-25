const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const projectTrack = document.querySelector("#project-track");
const prevButton = document.querySelector(".project-prev");
const nextButton = document.querySelector(".project-next");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

function scrollProjects(direction) {
  if (!projectTrack) return;

  const firstCard = projectTrack.querySelector(".project-card");
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 260;
  const gap = 20;

  projectTrack.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: "smooth"
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => scrollProjects(-1));
}

if (nextButton) {
  nextButton.addEventListener("click", () => scrollProjects(1));
}

document.addEventListener("keydown", (event) => {
  if (!projectTrack || document.activeElement !== projectTrack) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollProjects(1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollProjects(-1);
  }
});
