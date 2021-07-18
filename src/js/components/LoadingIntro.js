import { devSettings } from "../tools";
import logo from "./Logo";

const loadingDots = `<div class="loading-dots">
                        <div></div>
                        <div></div>               
                        <div></div>               
                        </div>`;

const loadingHTML = `<div class="initial-loading-page">${logo}${loadingDots}</div>`;

const loadingTime = devSettings.disableLoading ? 0 : 2000;
let dotInterval = null;
function changeLoading() {
  const loading = document.querySelector(".initial-loading-page");
  console.log(loading);
  setTimeout(() => {
    loading.style.display = "none";
    clearInterval(dotInterval);
    console.log("changed");
  }, loadingTime); // 2000
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function dotLoading() {
  const dots = document.querySelector(`.loading-dots`);

  let notFilled = true;

  const fillDots = async () => {
    for (let i = 0; i < 3; i += 1) {
      await sleep(200);
      dots.children[i].style.background = "white";
      if (i === 2) {
        notFilled = false;
      }
    }
  };
  // toggle instead of two for loops
  const emptyDots = async () => {
    for (let i = 0; i < 3; i += 1) {
      await sleep(200);
      dots.children[i].style.background = "#6526d1";
      if (i === 2) {
        notFilled = true;
      }
    }
  };
  fillDots();
  dotInterval = setInterval(() => {
    if (notFilled) {
      fillDots();
    } else {
      emptyDots();
    }
  }, 350 * 3);
}

const LoadingIntro = {
  html: loadingHTML,
  autoRunFunctions: [changeLoading, dotLoading],
};

export default LoadingIntro;
