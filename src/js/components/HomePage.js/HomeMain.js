import { devSettings } from "../../tools";
import HeroBanner from "./pieces/HeroBanner";
import MediaSection from "./pieces/MediaSection/MediaSection";
import TopBar from "./pieces/TopBar";

const { showHomepage } = devSettings;

const displayNone = showHomepage ? "" : 'style="display:none';

const HomeMainHTML = /*HTML*/ `
<div class="home-page" ${displayNone}">
${TopBar.html}  
${HeroBanner.html}
${MediaSection.html}
</div>`;

const HomeMain = {
  html: HomeMainHTML,
};

export default HomeMain;
