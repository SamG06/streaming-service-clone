import { searchData } from "../../../tools";
import { createMediaCard } from "./MediaSection/MediaCard";

export const SearchSectionHTML = /*html*/ `
    <div class="search-section display-none">
        <div class="search-results">
        
        </div>
    </div>
`;

const searchMedia = async (query) => {
  const results = await searchData(query);
  return results;
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search-input")
    .addEventListener("keyup", async (e) => {
      console.log(e.target.value);
      const query = e.target.value;

      const results = await searchMedia(query);
      console.log(results);
      const resultsHtml = [];
      results.forEach(async (media) => {
        resultsHtml.push(createMediaCard(media, media.media_type));
      });
      const joined = await (await Promise.all(resultsHtml)).join("");

      document.querySelector(".search-results").innerHTML = joined;
    });
});

export const SearchSection = {
  html: SearchSectionHTML,
};
