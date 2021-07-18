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

export const devSettings = {
  showHomepage: true,
  disableLoading: true,
  showWhosWatching: false,
};
