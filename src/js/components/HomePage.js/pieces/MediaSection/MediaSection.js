import { api_key, getData, movieData, stringToHTML } from "../../../../tools";
import { forwardSVG, previousSVG } from "../../../svgs";
import { MediaCarouselsHTML } from "./MediaCarousels";

const MediaSectionHTML = /*html*/ `

<div class="media-content">
  ${MediaCarouselsHTML}
</div>`;

const MediaSection = {
  html: MediaSectionHTML,
};

export default MediaSection;
