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

const SideNavHTML = /*html*/ `
    <div class="side-nav-transparent-overlay hide-nav-overlay toggle-nav"></div>
    <nav class="side-nav hide-side-nav">
        <div class="pages-buttons">
          <section>
              ${pages1
                .map((page) => {
                  return `<div class="page-button">${page}</div>`;
                })
                .join("")}
          </section>
          <section>
              ${pages2
                .map((page) => {
                  return `<div class="page-button">${page}</div>`;
                })
                .join("")}
          </section>
        </div>
    </nav>
`;

showHideToggle = () => {
  const root = document.getElementById("root");
  const sideNav = document.querySelector(".side-nav");

  const toggle = () => {
    root.classList.toggle("show-side-nav");
    sideNav.scrollTo(0, 0);
  };

  const toggleClicks = document.querySelectorAll(".toggle-nav");
  toggleClicks.forEach((el) => el.addEventListener("click", toggle));
};

const SideNav = {
  html: SideNavHTML,
  autoRunFunctions: [showHideToggle],
};

export default SideNav;
