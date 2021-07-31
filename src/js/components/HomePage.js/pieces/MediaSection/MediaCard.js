import { api_key } from "../../../../tools";

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

  return `
          <div class="media-card" data-id="${id}">
          <a
             href="${videoLink}"
               target="_blank"
               rel="noopener noreferrer"
             >
               <img
                 src="https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}"
                alt="${media_name}"
              />
            </a>
          <div class="overlay"></div>
         </div>
        `;
};
