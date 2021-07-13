import HeroBanner from "./pieces/HeroBanner";
import ItemSection from "./pieces/ItemsSection/ItemsSection";
import TopBar from "./pieces/TopBar";

const HomeMainHTML = `<div class="home-page">
${TopBar.html}
${HeroBanner.html}
${ItemSection.html}
</div>`;

const HomeMain = {
  html: HomeMainHTML,
};

export default HomeMain;
