import playButton from "./CircleButtons";
import HeroMovieTitle from "./HeroMovieTitle";

const cardTemp = (title) => `<div class="card-temp">${title}</div>`;

const cardInfo = ["Movie 1", "TV Show 1", "Aboxofsox"];

const HeroBannerHTML = /*html*/ `<section class="hero-banner">
<div class="hero-overlay">
  <div class="content">
 ${HeroMovieTitle}
  <h4>JUST-ADDED HORROR MOVIE</h4>
  <p class="movie-desc">Jquery is rising from the grave. <wbr> Can the hero with a box of socks save the day?</p>
    <div class="button-things">
      ${playButton}
      <button class="more-info">MORE INFO</button>
    </div>
    <div class="continue-watching" style="visibility:hidden">
      <h3>Continue Watching ></h3>
      <div class="card-holder">
        ${cardInfo.map((t) => cardTemp(t)).join("")}
      </div>
    </div>
  </div>
</div>
  <video class="hero-video" src="movie.mp4" autoplay  playsinline muted></video>
</section>`;

const HeroBanner = {
  html: HeroBannerHTML,
};

export default HeroBanner;
