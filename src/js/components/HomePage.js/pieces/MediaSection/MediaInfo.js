import { detectMoviePage, mediaInfoPageData } from "../../../../tools";
import { loadingDots } from "../../../LoadingIntro";
import { showComponentForRoute } from "../../../routes";
import playButton from "../CircleButtons";
import { fetchVideoLink } from "./MediaCard";

const MediaInfoHtml = /*html*/ `
    <div class="media-info-section display-none">
        <div class="info-hero-banner">
          <div class="dark-overlay"></div>
            <img class="backdrop" src="/" alt="Backdrop image of {desc}" onerror="this.style.display='none'" onload="this.style.display='block'"/>
            <div class="media-info-display">
              <h2 id="mediaTitle">{title}</h2>
              <p id="mediaDescription">{desc}</p>
                
              <div className="play-button">
              <a href="http://" class="media-info-trailer" 
              target="_blank" 
              rel="noopener noreferrer">
                  ${playButton}
                  </a>
              </div>

              <div className="add-to-list"></div>
            </div>
        </div>

        <div className="more-like-this">

        </div>
    </div>
`;

/* Keeping track of URL */
window.gotoMediaInfo = async (e, id, type) => {
  const location = e.href;
  if (location === window.location.href) return;

  let component = ".media-info-section";

  if (location !== "auto") {
    history.pushState(id, "Generic Streaming Service", location);
    component = showComponentForRoute().component;
  }

  // Handle route and
  const backdropImg = document.querySelector(".backdrop");
  const titleEl = document.getElementById("mediaTitle");
  const mediaDescription = document.getElementById("mediaDescription");
  const trailerUrl = document.querySelector(".media-info-trailer");

  if (component === ".media-info-section") {
    const { backdrop_path, title, overview, name } = await mediaInfoPageData(
      type,
      id
    );
    const trailerLink = await fetchVideoLink(id, type);
    trailerUrl.href = trailerLink;
    backdropImg.src = `https://www.themoviedb.org/t/p/w1280/${backdrop_path}`;
    titleEl.innerText = title || name;
    mediaDescription.innerText = overview;
  } else {
    console.log("not component");
    backdrop.src = "none";
  }
};

window.onpopstate = () => {
  const { component, param } = showComponentForRoute();
  if (component !== ".media-info-section") {
    console.log("displaying-none");
    document.querySelector(".backdrop").style.display = "none";
    return;
  }
};
export const MediaInfo = {
  html: MediaInfoHtml,
};
