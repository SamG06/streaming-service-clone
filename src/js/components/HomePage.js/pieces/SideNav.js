import { scrollStopper } from "../../../tools";

const pages1 = [
  "Home",
  "Series",
  "Movies",
  "Originals",
  "Just Added",
  "Last Chance",
  "Coming Soon",
  "Trending Now",
];

const pages2 = [
  "Action",
  "Animation",
  "Comedy",
  "Crime",
  "Documentaries",
  "Drama",
  "Fantasy & Sci-Fi",
  "Horror",
  "International",
  "Kids & Family",
  "Latino",
  "Music",
  "News/Talk",
  "Reality",
  "Romance",
  "Shorts",
  "Sports",
  "Suspense",
];

const listPages = (pages) => {
  return `
  <section>
    ${pages.map((page) => `<div class="page-button">${page}</div>`).join("")}
  </section>
  `;
};

const SideNavHTML = /*html*/ `
    <div class="side-nav-transparent-overlay hide-nav-overlay toggle-nav"></div>
    <nav class="side-nav hide-side-nav">
        <div class="pages-buttons">
          ${[pages1, pages2].map((pages) => listPages(pages)).join("")}
        </div>
    </nav>
`;

showHideToggle = () => {
  const sideNav = document.querySelector(".side-nav");

  const toggle = () => {
    document.body.classList.toggle("show-side-nav");
    sideNav.scrollTo(0, 0);
    scrollStopper();
  };

  const toggleClicks = document.querySelectorAll(".toggle-nav");
  toggleClicks.forEach((el) => el.addEventListener("click", toggle));
};

const SideNav = {
  html: SideNavHTML,
  autoRunFunctions: [showHideToggle],
};

export default SideNav;
