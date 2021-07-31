export const stringToHTML = (html) =>
  document.createRange().createContextualFragment(html);

let recentEventFunction = null;

export const scrollStopper = () => {
  const currentY = document.documentElement.scrollTop;

  const stopScroll = () => {
    window.scrollTo(0, currentY);
  };

  if (!recentEventFunction) {
    recentEventFunction = stopScroll;
    window.addEventListener("scroll", recentEventFunction);
  } else {
    window.removeEventListener("scroll", recentEventFunction);
    recentEventFunction = null;
  }
};

const enabled = {
  showHomepage: false,
  disableLoading: false,
  showWhosWatching: true,
};

const disabled = {
  showHomepage: true,
  disableLoading: true,
  showWhosWatching: false,
};
export const devSettings = disabled;

// TMDB API

const getData = async (api_link) => {
  const response = await fetch(`https://api.themoviedb.org/3${api_link}`, {
    method: "GET",
  });
  return response.json();
};

export const api_key = "d208a3fe240766f14fc979daf33da1f3";
const popular_movies = `https://api.themoviedb.org/3`;

export const movieData = () => getData(popular_movies);

const popular_tv = `https://api.themoviedb.org/3`;

export const tvData = () => getData(popular_tv);

export { getData };
