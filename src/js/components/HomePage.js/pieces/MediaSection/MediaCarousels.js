import { api_key, getData } from "../../../../tools";
import { forwardSVG, previousSVG } from "../../../svgs";
import { createMediaCard } from "./MediaCard";

/* DATA */
const carousels = [
  {
    title: "Popular Movies",
    id: "popular-movies",
    type: "movie",
    api_link: `/movie/popular?api_key=${api_key}&language=en-US&page=1`,
  },
  {
    title: "Upcoming Movies",
    id: "upcoming-movies",
    type: "movie",
    api_link: `/movie/upcoming?api_key=${api_key}&language=en-US&page=3`,
  },
  {
    title: "Popular TV Shows",
    id: "popular-tv",
    type: "tv",
    api_link: `/tv/popular?api_key=${api_key}&language=en-US&page=1`,
  },
  {
    title: "Top Rated TV Shows",
    id: "top-rated",
    type: "tv",
    api_link: `/tv/top_rated?api_key=${api_key}&language=en-US&page=1`,
  },
];

/* CAROUSEL PLACEHOLDER/SETUP FUNCTION */
const mediaContainer = (sectionTitle, id) => {
  return /*html*/ `
    <div class="media-container">
    <h2>${sectionTitle}</h2>
    ${previousSVG}
      <div class="media-carousel" id="${id}">
        ${Array.from({ length: 30 }, () => [
          `<div class="media-card placeholder"></div>`,
        ])
        .join("")}
      </div>
    ${forwardSVG}
    </div>
    `;
};

/* HTML WITH NO DATA */
export const MediaCarouselsHTML = `${carousels
  .map(({ title, id }) => mediaContainer(title, id))
  .join("")}`;

let clickingDisabled = false;

const sliderLogic = (e, direction, mediaContainer, roll) => {
  if (clickingDisabled) return;
  clickingDisabled = true;
  let { position } = mediaContainer.dataset;
  const updatePosition = (v) => (mediaContainer.dataset.position = v);

  const query = `.media-card:last-child`;
  const lastMedia = mediaContainer.querySelector(query);
  const lastMediaPosition = lastMedia.getBoundingClientRect().x;
  const lastMediaWidth = lastMedia.offsetWidth;

  const mediaContainerPosition = mediaContainer.getBoundingClientRect().x;
  const mediaContainerWidth = mediaContainer.offsetWidth;

  const amountShown = () => (mediaContainerWidth - 50) / lastMediaWidth;

  const positionToLastElement = Math.round(
    mediaContainerWidth -
      lastMediaPosition +
      mediaContainerPosition -
      lastMediaWidth
  );

  const howManyToShow =
    document.querySelectorAll(".media-container .media-card").length *
      lastMediaWidth -
    mediaContainerWidth;

  const sectionLength = amountShown() * lastMediaWidth;
  // move from width of everything whole number so 4.8 is 4

  let nextSection = 0;
  let minus;
  console.log("ended up here");
  if (direction === "next") {
    const newElement = Math.ceil(parseInt(position) + amountShown());
    const elementToGoTo = mediaContainer.querySelector(
      `.media-carousel .media-card:nth-child(${newElement})`
    );
    if (!elementToGoTo) {
      clickingDisabled = false;
      return;
    }

    updatePosition(Math.floor(parseInt(position) + amountShown()));

    nextSection = elementToGoTo.getBoundingClientRect().x - 50;

    minus = "-";
  } else {
    let newElement = parseInt(position) - Math.floor(amountShown());

    if (newElement < 0) {
      newElement = 0;
    }

    updatePosition(newElement);

    const elementToGoTo = mediaContainer.querySelector(
      `.media-carousel .media-card:nth-child(${newElement + 1})`
    );

    nextSection = elementToGoTo.getBoundingClientRect().x - 50;
  }

  if (roll.style.transform) {
    current = parseInt(roll.style.transform.match(/\d+/g)[0]);
  } else {
    current = 0;
  }

  roll.style.transform = `translateX(-${current + nextSection}px)`;
  console.log("ended up here 2");

  currentSection = nextSection;
  setTimeout(() => {
    clickingDisabled = false;
  }, 320);
};

document.addEventListener("DOMContentLoaded", async (event) => {
  document.querySelectorAll(".media-container").forEach((el) => {
    el.dataset.position = 0;
    el.addEventListener("click", (e) => {
      if (!e.target.classList.contains("arrow-container")) return;
      const direction = e.target.id;
      const carousel = el.querySelector(".media-carousel");
      sliderLogic(null, direction, el, carousel);
    });
  });

  carousels.forEach(async ({ id, api_link, type }) => {
    const media = await getData(api_link);

    let promises = [];

    for (i = 0; i < media.results.length; i += 1) {
      promises.push(createMediaCard(media.results[i], type));
    }

    const ids = await Promise.all(promises);

    document.getElementById(id).innerHTML = ids.join("");
  });
  console.log("crying");
});
