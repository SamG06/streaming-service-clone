import { api_key, mediaInfoPageData } from "../../../../tools";
import { showComponentForRoute } from "../../../routes";

const fetchVideoLink = async (id, type) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}&language=en-US`,
    { method: "GET" }
  );
  const { results } = await response.json();

  if (results !== undefined && results[0] !== undefined) {
    if (results[0].hasOwnProperty("key")) {
      if (results[0].site === "YouTube") {
        return `https://www.youtube.com/watch?v=${results[0].key}`;
      }
    }
  }
  return null;
};

export const createMediaCard = async (
  { id, title, name, poster_path },
  type
) => {
  const media_name = title === undefined ? name : title;

  const videoLink = await fetchVideoLink(id, type);

  return /*html*/ `
          <div class="media-card" data-id="${id}">
          <a
             href="/media-info/${id}"
             onclick="gotoMediaInfo(this, ${id}, '${type}'); return false;"
             >
               <img
                 src="https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}"
                alt="${media_name}"
                onerror="testFunction(this, '${media_name}')"
              />
            </a>
          <div class="overlay"></div>
         </div>
        `;
};

window.testFunction = (source, name) => {
  source.parentElement.innerText = name;
};
