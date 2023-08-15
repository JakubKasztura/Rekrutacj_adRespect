// Hamburger action
const HAMBURGER_CONTAINER = document.querySelector(".nav__hamburger"),
  HAMBURGER_ELEMENTS = HAMBURGER_CONTAINER.querySelectorAll("span"),
  NAVIGATION_LIST = document.querySelector(".nav__list");

function toggleMenu() {
  console.log("asds");
  HAMBURGER_CONTAINER.classList.toggle("active");
  NAVIGATION_LIST.classList.toggle("active");
  if (!document.querySelector(".blur-active")) {
    const blur = document.createElement("div");
    blur.classList.toggle("blur-active");
    document.body.prepend(blur);
  } else {
    document.body.removeChild(document.querySelector(".blur-active"));
  }
}

HAMBURGER_CONTAINER.addEventListener("click", toggleMenu);

function dropMenu(e) {
  if (e.target.classList == "blur-active") {
    HAMBURGER_CONTAINER.classList.toggle("active");
    NAVIGATION_LIST.classList.toggle("active");
    document.body.removeChild(document.querySelector(".blur-active"));
  }
}
window.addEventListener("click", dropMenu);
