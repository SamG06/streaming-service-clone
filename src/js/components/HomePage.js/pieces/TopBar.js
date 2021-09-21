import { devSettings } from "../../../tools";
import logo from "../../Logo";
import { showComponentForRoute } from "../../routes";
import { CloseIcon, HamburgerIcon, SearchIcon } from "../../svgs";

const { showHomepage } = devSettings;

const displayNone = showHomepage ? "" : 'style="display:none"';

const TopBarHTML = /*html*/ `
  <div class="top-bar" ${displayNone}>
    ${CloseIcon(["toggle-nav"])}
    ${HamburgerIcon}
    ${SearchIcon}
  <div class="search-input-container">
    ${CloseIcon([])}
    <input type="text" name="search" class="search-input" placeholder="What are you looking for?" id="" />
  </div>
  <a href="/">
  ${logo}
  </a>
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
    history.pushState("", "Generic Streaming Service", "/search/test");
    const { component, param } = showComponentForRoute();

    topBar.classList.add("bar-search-mode");
    document.querySelector(".search-input").focus();
  });

  const searchClose = document.querySelector(
    ".search-input-container .close-icon"
  );

  searchClose.addEventListener("click", () => {
    history.pushState("", "Generic Streaming Service", "/");
    showComponentForRoute();
    topBar.classList.remove("bar-search-mode");
  });
});

const TopBar = {
  html: TopBarHTML,
};

export default TopBar;
