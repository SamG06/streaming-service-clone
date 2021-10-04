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

export const showMediaInfo = () => {};

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
export const devSettings = enabled;

// TMDB API

const getData = async (api_link) => {
  const response = await fetch(`https://api.themoviedb.org/3${api_link}`, {
    method: "GET",
  });
  if (api_link === "https://api.themoviedb.org/3") return;
  const data = await response.json();
  return data;
};

export const api_key = "d208a3fe240766f14fc979daf33da1f3";
const popular_movies = `https://api.themoviedb.org/3`;

export const movieData = () => getData(popular_movies);

const popular_tv = `https://api.themoviedb.org/3`;

export const tvData = () => getData(popular_tv);

export const mediaInfoPageData = async (type, id) => {
  return await getData(`/${type}/${id}?api_key=${api_key}&language=en-US`);
};

export const searchData = async (query) => {
  const { results } = await getData(
    `/search/multi?api_key=${api_key}&query=${query}&page=1&include_adult=false`
  );

  return results.filter(
    ({ media_type, backdrop_path }) =>
      media_type === "tv" || (media_type === "movie" && backdrop_path !== null)
  );
};

export { getData };

export const detectMoviePage = () => {
  const url = window.location.href;
  const movieId = url.substring(url.lastIndexOf("/") + 1);
  const urlPathValues = window.location.pathname.split("/");
  const lastIndex = urlPathValues.length - 1;
  const lastTwoValues =
    urlPathValues[lastIndex - 1] + "/" + urlPathValues[lastIndex];
  console.log(lastTwoValues, "last two values");

  console.log(url.split("/")[url.split], "movie id");

  // add check if it is a number send if false
  return movieId;
};
