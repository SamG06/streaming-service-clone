import { detectMoviePage, mediaInfoPageData } from "../../../../tools";
import { showComponentForRoute } from "../../../routes";
import playButton from "../CircleButtons";

const MediaInfoHtml = `
    <div class="media-info-section">
        <div class="info-hero-banner">
            <img class="backdrop" src="/" alt="Backdrop image of {desc}" />
            <h2 id="mediaTitle">{title}</h2>
            <p id="mediaDescription  ">{desc}</p>
            
            <div className="play-trailer">
                ${playButton}
            </div>

            <div className="add-to-list"></div>
        </div>

        <div className="more-like-this">

        </div>
    </div>
`;

/* Keeping track of URL */
window.gotoMediaInfo = async (e, id, type) => {
  const location = e.href;
  if (location === window.location.href) return;
  history.pushState(id, "Generic Streaming Service", location);

  // Handle route and
  const { component, param } = showComponentForRoute();

  if (component === ".media-info-section") {
    const data = await mediaInfoPageData(type, id);
    document.querySelector(
      ".backdrop"
    ).src = `https://www.themoviedb.org/t/p/original/${data.backdrop_path}`;
    console.log(data.backdrop_path);
  }
};

export const MediaInfo = {
  html: MediaInfoHtml,
};
