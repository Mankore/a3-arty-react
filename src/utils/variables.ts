// To allow zooming without loading new tiles
export const increaseMapZoomBy = 2;

export const backend = {
  basepath: "http://127.0.0.1:3080",
  routes: {
    coordinates: "/coords",
    flatness: "/flatness",
  },
};

export const isBackendAvailable = true;