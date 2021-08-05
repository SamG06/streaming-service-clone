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
];

export const getCurrentRoute = () => {
  const url = window.location.pathname;
  const regex = "([a-zA-Z0-9-_]+)$";

  if (url == "/") return routes[0];

  let param = null;
  const routeFound = routes.find(({ path }) => {
    const match = url.match(`^${path.split(":")[0]}${regex}`);
    if (match) {
      param = match[1];
      return true;
    }
  });

  routeFound.param = param;
  return routeFound;
};

export const showComponentForRoute = () => {
  const { path, component, param } = getCurrentRoute();
  console.log("taco");
  routes.forEach((route) => {
    const el = document.querySelector(route.component);
    const view = route.path === path ? "block" : "none";
    el.style.display = view;
  });
  //document.querySelector(".media-info-section");
  //document.querySelector(".home-page").style.display = "none";
  return { component, param };
};
window.onpopstate = () => {
  showComponentForRoute();
};
