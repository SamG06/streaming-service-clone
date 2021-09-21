/* Assuming its in the root path already ;)*/

const routes = [
  {
    path: "/",
    component: ".home-page",
  },
  {
    path: "/media-info/:id",
    component: ".media-info-section",
  },
  {
    path: "/search/:query",
    component: ".search-section",
  },
];

export const getCurrentRoute = () => {
  const url = window.location.pathname;
  const regex = "([a-zA-Z0-9-_]+)$";

  if (url == "/") return routes[0];

  let param = null;
  const routeFound = routes.find(({ path, component }) => {
    const match = url.match(`^${path.split(":")[0]}${regex}`);
    console.log(match);
    if (match) {
      param = match[1];

      return true;
    }
  });
  console.log(routeFound, "route found");

  routeFound.param = param;
  return routeFound;
};

export const showComponentForRoute = () => {
  const { path, component, param } = getCurrentRoute();
  console.log("taco");
  routes.forEach((route) => {
    console.log(route);
    const el = document.querySelector(route.component);
    const none = "display-none";
    //const view = route.path === path ? "block" : "none";
    if (route.path === path) {
      el.classList.remove(none);
    } else {
      el.classList.add(none);
    }
  });
  //document.querySelector(".media-info-section");
  //document.querySelector(".home-page").style.display = "none";
  return { component, param };
};
window.onpopstate = () => {
  showComponentForRoute();
};
