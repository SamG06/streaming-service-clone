import { devSettings } from "../tools";
import logo from "./Logo";

const plus = `<svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="15" width="3" height="32" fill="#C4C4C4"/>
<rect y="17" width="3" height="32" transform="rotate(-90 0 17)" fill="#C4C4C4"/>
</svg>
`;

const { showWhosWatching } = devSettings;
const displayNone = showWhosWatching ? "" : 'style="display:none;"';

const whosWatchingHtml = /*html*/ `
    <div class="whos-watching" ${displayNone} >
        ${logo}
        <h2>Who Is Watching?</h2>
        <div class="user-circle-container">
        <div class="user-circle">
            D    
        </div>
        <span class="name-tiny">Default</span>
        </div>

        <div class="add-user-container">
        <div class="add-buttons">
        <button>${plus}MONKEY</button>
        <button>${plus}GOAT</button>
        </div>

        <div class="manage-profiles">MANAGE PROFILES</div>
        </div>
        
    </div>
`;

const userChosenEvent = () => {
  const watching = document.querySelector(".whos-watching");
  const userCircle = document.querySelector(".user-circle");
  const home = document.querySelector(".home-page");
  const topBar = document.querySelector(".top-bar");
  userCircle.addEventListener("click", () => {
    watching.style.display = "none";
    home.style.display = "block";
    topBar.style.display = "flex";
    document.querySelector(".top-bar").classList.remove("display-none");
    console.log("run");
  });
};

const WhosWatching = {
  html: whosWatchingHtml,
  autoRunFunctions: [userChosenEvent],
};
export default WhosWatching;
