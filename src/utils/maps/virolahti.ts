import { MapProps } from "../types";
const mapExtent = [0.0,-6750.0,6750.0,0.0]; // virolahti
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 5,
  tileSize: 256,
};
const mapBounds = {
  x: 18000,
  y: 18000,
};

export const mapVirolahti: MapProps = { name: "virolahti", mapExtent: mapExtent, mapOptions, mapBounds };
