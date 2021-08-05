import "../css/main.css";
import HomeMain from "./components/HomePage.js/HomeMain";
import SideNav from "./components/HomePage.js/pieces/SideNav";
import TopBar from "./components/HomePage.js/pieces/TopBar";
import LoadingIntro from "./components/LoadingIntro";
import logo from "./components/Logo";
import WhosWatching from "./components/WhosWatching";
import { movieData, stringToHTML } from "./tools";
const root = document.getElementById("root");

// Initial Setup
const mainHTML = stringToHTML(
  `${LoadingIntro.html}${WhosWatching.html}${SideNav.html}${HomeMain.html}`
);
root.append(mainHTML);

function autoRun(funcs) {
  funcs.forEach((func) => func());
}

// Effects for content
autoRun(LoadingIntro.autoRunFunctions);

autoRun(WhosWatching.autoRunFunctions);

autoRun(SideNav.autoRunFunctions);

movieData();
