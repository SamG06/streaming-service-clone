const MediaSectionHTML = /*html*/ `

<div class="media-content">
<button id="next">next</button>
  <div class="media-container">

    <div class="media-rolling-container">
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
      <div class="media-card"></div>
    </div>
  </div>
</div>`;

const MediaSection = {
  html: MediaSectionHTML,
};

const sliderLogic = (e) => {
  const query = `.media-rolling-container .media-card:last-child`;
  const lastMedia = document.querySelector(query);
  const lastMediaPosition = lastMedia.getBoundingClientRect().x;
  const lastMediaWidth = lastMedia.offsetWidth;

  const mediaContainer = document.querySelector(".media-container");
  const mediaContainerPosition = mediaContainer.getBoundingClientRect().x;
  const mediaContainerWidth = mediaContainer.offsetWidth;

  // Make it so that the amount of medias in the container is counted and then figure out
  // Where they should be to show all???"

  console.log(mediaContainerWidth, "width");
  const positionToLastElement = Math.round(
    mediaContainerWidth -
      lastMediaPosition +
      mediaContainerPosition -
      lastMediaWidth
  );

  const howManyShow = mediaContainerWidth / (lastMediaWidth + 10);
  console.log(howManyShow, "how many shown");

  const howManyToShow =
    document.querySelectorAll(".media-container .media-card").length *
      (lastMediaWidth + 10) -
    mediaContainerWidth;

  console.log(howManyToShow, "how many to show");

  console.log(howManyShow * lastMediaWidth + 10 + 100);

  const nextSection = Math.floor(howManyShow) * lastMediaWidth;
  // move from width of everything whole number so 4.8 is 4
  const roll = document.querySelector(".media-rolling-container");

  roll.style.transform = `translateX(-${nextSection}px)`;
};

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("next").addEventListener("click", sliderLogic);
});
export default MediaSection;
