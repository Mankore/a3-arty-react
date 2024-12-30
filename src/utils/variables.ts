// To allow zooming without loading new tiles
export const increaseMapZoomBy = 2;

export const backend = {
  basepath: "http://127.0.0.1:3000",
  routes: {
    coordinates: "/coords",
    flatness: "/flatness",
  },
};

export const QUERY_KEY = {
  coordinates: "coordinates",
  flatness: "flatness",
  ping: "ping",
};

export const routes = {
  base: "/a3-arty-react",
  home: "/",
  about: "/about",
};
