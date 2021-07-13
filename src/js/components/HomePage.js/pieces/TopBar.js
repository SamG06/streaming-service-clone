import logo from "../../Logo";
import { CloseIcon, HamburgerIcon, SearchIcon } from "../../svgs";

const TopBarHTML = /*html*/ `
  <div class="top-bar">
    ${CloseIcon(["toggle-nav"])}
    ${HamburgerIcon}
    ${SearchIcon}
  <div class="search-input-container">
    ${CloseIcon([])}
    <input type="text" name="search" class="search-input" placeholder="What are you looking for?" id="" />
  </div>
  ${logo}
  <div class="user-profile">
    <div class="user-circle">D</div>
    <p>Default</p>
  </div>
  </div>
`;

document.addEventListener("DOMContentLoaded", (event) => {
  // TOP BAR EVENT LISTENER EVENTS
  const topBar = document.querySelector(".top-bar");

  const changeBarBackgroundOnScroll = (e) => {
    const pageY = window.pageYOffset;
    if (pageY > 0) {
      topBar.classList.add("scrolled-down");
    } else {
      topBar.classList.remove("scrolled-down");
    }
  };

  window.addEventListener("scroll", changeBarBackgroundOnScroll);

  // SEARCH ICON LISTENER EVENTS
  const searchIcon = document.querySelector(".search-icon");

  searchIcon.addEventListener("click", () => {
    topBar.classList.add("bar-search-mode");
    document.querySelector(".search-input").focus();
  });

  const searchClose = document.querySelector(
    ".search-input-container .close-icon"
  );

  searchClose.addEventListener("click", () => {
    topBar.classList.remove("bar-search-mode");
  });
});

const TopBar = {
  html: TopBarHTML,
};

export default TopBar;
