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
    console.log("adding");
    window.addEventListener("scroll", recentEventFunction);
  } else {
    console.log("removing");
    window.removeEventListener("scroll", recentEventFunction);
    recentEventFunction = null;
  }
};
