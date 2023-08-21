const HAMBURGER_CONTAINER = document.querySelector(".nav__hamburger"),
  HAMBURGER_ELEMENTS = [...HAMBURGER_CONTAINER.querySelectorAll("span")],
  NAVIGATION_LIST = document.querySelector(".nav__list"),
  NAVIGATION_ELEMENTS = [...NAVIGATION_LIST.querySelectorAll(".nav__link")],
  MENU_OFFER_ELEMENT = NAVIGATION_LIST.querySelector(
    ".nav__item:nth-child(1) .nav__link"
  ),
  MENU_OFFER_ELEMENTS = [
    ...NAVIGATION_LIST.querySelectorAll(".offer-container div"),
  ],
  MAIN_ELEMENTS = [...document.querySelectorAll("section")],
  SEARCH_CONTAINER = document.querySelector(".nav__search-container"),
  SEARCH_LOOP = SEARCH_CONTAINER.querySelector(".lnr-magnifier"),
  SEARCH_INPUT = SEARCH_CONTAINER.querySelector(".nav__input"),
  GALLERY_CONTAINER = document.querySelector(".realizations__gallery"),
  EXPAND_GALLERY_BTN = document.querySelector(".realizations__btn"),
  GALLERY_OVERLAY = document.querySelector(".realizations__gallery-overlay"),
  GALLERY_HIDDEN_ELEMENTS = [...GALLERY_CONTAINER.querySelectorAll(".hidden")];

// Hamburger action
function toggleMenu() {
  HAMBURGER_CONTAINER.classList.toggle("active");
  NAVIGATION_LIST.classList.toggle("active");
}
function removeBlurElement() {
  document.body.removeChild(document.querySelector(".blur-active"));
}
function changeHamburger() {
  for (const element of HAMBURGER_ELEMENTS) {
    element.classList.toggle("active");
  }
}
function initMenu(e) {
  e.stopPropagation();
  console.log("asds");
  toggleMenu();
  changeHamburger();
  if (!document.querySelector(".blur-active")) {
    const blur = document.createElement("div");
    blur.classList.toggle("blur-active");
    document.body.prepend(blur);
  } else {
    removeBlurElement();
    showHideOffer(e, true);
  }
}

function hideMenu(e) {
  if (window.innerWidth >= 1200) {
    return;
  }
  e.stopPropagation();
  if (e.target.classList == "blur-active") {
    toggleMenu();
    changeHamburger();
    removeBlurElement();
    showHideOffer(e, true);
  }
  console.log("blur");
}
function showHideOffer(e, condition) {
  e.stopPropagation();
  const offers = [
    ...NAVIGATION_LIST.querySelectorAll(".nav__item:nth-child(1) div div "),
  ];
  const container = NAVIGATION_LIST.querySelector(".offer-container");

  if (condition) {
    container.classList.remove("active");
  } else {
    container.classList.toggle("active");
    console.log("offf");
  }
  setTimeout(() => {
    for (const offer of offers) {
      if (condition) {
        offer.classList.remove("active");
      } else {
        offer.classList.toggle("active");
        console.log("offf");
      }
    }
    condition = false;
  }, 200);

  console.log("offer");
}
function showSearchBar(e) {
  e.stopPropagation();
  console.log("looop");
  if (SEARCH_CONTAINER.classList.contains("active")) {
    SEARCH_INPUT.value = "";
  }
  SEARCH_INPUT.classList.toggle("active");
  SEARCH_CONTAINER.classList.toggle("active");
}
//Menu scrollTo
function scrollToSection(e) {
  const index = NAVIGATION_ELEMENTS.indexOf(e.target);
  if (e.target.tagName === "DIV") {
    scrollToConfig(0);
    showHideOffer(e, true);
  }
  if (e.target.tagName === "A") {
    if (index === 1) {
      scrollToConfig(index);
    }
    if (index === 2) {
      scrollToConfig(index);
    }
    if (index === 3) {
      scrollToConfig(index);
    }
  }
  if (window.innerWidth < 1200) {
    toggleMenu();
    changeHamburger();
    removeBlurElement();
    showHideOffer(e, true);
  }
}
function scrollToConfig(index) {
  const navBarOffset = document.querySelector(".nav").offsetHeight;
  const elementsOffset = [];
  for (const element of MAIN_ELEMENTS) {
    elementsOffset.push(element.offsetTop);
  }
  window.scrollTo({
    top: elementsOffset[index] - navBarOffset,
    left: 0,
    behavior: "smooth",
  });
}

NAVIGATION_LIST.addEventListener("click", scrollToSection);
SEARCH_LOOP.addEventListener("click", showSearchBar);
MENU_OFFER_ELEMENT.addEventListener("click", showHideOffer);
HAMBURGER_CONTAINER.addEventListener("click", initMenu);
window.addEventListener("click", hideMenu);

//Macy.JS init
const macyInstance = new Macy({
  container: ".realizations__gallery",
  trueOrder: false,
  waitForImages: false,
  margin: 20,
  columns: 3,
  breakAt: {
    480: 2,
    330: 1,
  },
});

//SimpleLightbox init
const lightbox = new SimpleLightbox(".realizations__gallery a", {});

//Expand gallery
function expandGallery() {
  GALLERY_OVERLAY.classList.toggle("hide");
  EXPAND_GALLERY_BTN.classList.toggle("expanded");
  if (EXPAND_GALLERY_BTN.classList.contains("expanded")) {
    EXPAND_GALLERY_BTN.innerHTML =
      'Zwiń <span class="about__button-arrow lnr lnr-arrow-down"></span>';
  } else {
    EXPAND_GALLERY_BTN.innerHTML =
      'Rozwiń <span class="about__button-arrow lnr lnr-arrow-down"></span>';
  }
  for (const element of GALLERY_HIDDEN_ELEMENTS) {
    element.classList.toggle("hidden");
  }
  macyInstance.recalculate(true);
}

EXPAND_GALLERY_BTN.addEventListener("click", expandGallery);
