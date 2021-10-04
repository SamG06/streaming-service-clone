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
      <div class="media-carousel" id="${id}" data-showing="false" style="transform: translateX(0px);">
        ${Array.from(
          { length: 30 },
          () => `<div class="media-card placeholder"></div>`
        ).join("")}
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

  const currentTransform = parseInt(
    mediaContainer
      .querySelector(".media-carousel")
      .style.transform.match(/\d+/)[0]
  );

  const positionToLastElement = Math.round(
    mediaContainerWidth - lastMediaPosition - lastMediaWidth - currentTransform
  );

  let nextSection = 0;
  let minus;

  if (direction === "next") {
    const newElement = Math.ceil(parseInt(position) + amountShown());
    const elementToGoTo = mediaContainer.querySelector(
      `.media-carousel .media-card:nth-child(${newElement})`
    );
    console.log(currentTransform, "transform", elementToGoTo);

    if (!elementToGoTo) {
      clickingDisabled = false;
      roll.style.transform = `translateX(-${-positionToLastElement + 50}px)`;
      return;
    }

    updatePosition(Math.floor(parseInt(position) + amountShown()));

    nextSection = elementToGoTo.getBoundingClientRect().x - 50;

    minus = "-";
  } else {
    let newElement = parseInt(position) - Math.floor(amountShown());
    console.log("previous", newElement);

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

  let newSpot = current + nextSection;
  console.log(newSpot, positionToLastElement, "new");
  if (-newSpot < positionToLastElement) {
    newSpot = -positionToLastElement + 50;
  }
  roll.style.transform = `translateX(-${newSpot}px)`;

  console.log("position to last element", positionToLastElement);

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

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom <=
      (window.innerHeight + 300 || document.documentElement.clientHeight + 300)
    );
  }

  // Inserting values into media container
  carousels.forEach(async ({ id, api_link, type }) => {
    const mediaContainerEl = document.getElementById(id);

    const media = await getData(api_link);

    let promises = [];

    for (i = 0; i < media.results.length; i += 1) {
      promises.push(createMediaCard(media.results[i], type, true));
    }

    const ids = await Promise.all(promises);

    const showImagesInView = () => {
      if (mediaContainerEl.dataset.showing === "true") return;
      if (isInViewport(mediaContainerEl)) {
        mediaContainerEl.innerHTML = ids.join("");
        mediaContainerEl.dataset.showing = "true";
      }
    };
    showImagesInView();

    ["scroll", "load", "DOMContentLoaded", "resize"].forEach((event) => {
      document.addEventListener(event, showImagesInView);
    });
  });
});
