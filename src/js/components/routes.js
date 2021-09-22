/* Assuming its in the root path already ;)*/

const routes = [
  {
    path: "/",
    component: ".home-page",
  },
  {
    path: "/media-info/:id/:type",
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
    console.log(path, "THIS PATH");
    if (url.includes("media-info") && path.includes("media-info")) {
      const params = url.split("/");
      console.log(params, path, "THIS PATH INSIDE MEDIA INFO");
      if (params[3] === "movie" || params[3] === "tv") {
        param = params;
        return true;
      }
    }

    const match = url.match(`^${path.split(":")[0]}${regex}`);
    console.log(match, "match");
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
  console.log(param, "taco");

  routes.forEach((route) => {
    console.log(route);
    const el = document.querySelector(route.component);
    const none = "display-none";
    //const view = route.path === path ? "block" : "none";
    console.log(route.path, path, "route, and path");
    if (route.path === path) {
      console.log("this is the path");
      el.classList.remove(none);
    } else {
      el.classList.add(none);
    }

    if (path === "/media-info/:id/:type") {
      console.log(param, "taco");
      const id = param[2];
      const type = param[3];
      console.log("running again", param[2], param[3]);
      gotoMediaInfo({ href: "auto" }, param[2], param[3]);
    }
  });
  //document.querySelector(".media-info-section");
  //document.querySelector(".home-page").style.display = "none";
  return { component, param };
};
window.onpopstate = () => {
  showComponentForRoute();
};

window.onload = () => {
  showComponentForRoute();
};
