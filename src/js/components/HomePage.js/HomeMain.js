import { devSettings } from "../../tools";
import HeroBanner from "./pieces/HeroBanner";
import { MediaInfo } from "./pieces/MediaSection/MediaInfo";
import MediaSection from "./pieces/MediaSection/MediaSection";
import { SearchSection } from "./pieces/SearchSection";
import TopBar from "./pieces/TopBar";

const { showHomepage } = devSettings;

const displayNone = showHomepage ? "" : 'style="display:none';

const HomeMainHTML = /*HTML*/ `
${TopBar.html}  
${SearchSection.html}
<div class="home-page" ${displayNone}">  
  ${HeroBanner.html}
  ${MediaSection.html}
</div>
${MediaInfo.html}
`;

const HomeMain = {
  html: HomeMainHTML,
};

export default HomeMain;
