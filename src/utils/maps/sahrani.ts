import { MapProps } from "../types";

const mapExtent = [0.0, -16384.0, 16384.0, 0.0]; // sahrani
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 6,
  tileSize: 128,
};
const mapBounds = {
  x: 20480,
  y: 20480,
};

export const mapSahrani: MapProps = {
  name: "sahrani",
  mapExtent: mapExtent,
  mapOptions,
  mapBounds,
};
