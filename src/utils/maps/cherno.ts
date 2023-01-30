import { MapProps } from "../types";
const mapExtent = [0.0, -7781.0, 7801.0, 0.0]; // cherno
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 6,
  tileSize: 128,
};
const mapBounds = {
  x: 15360,
  y: 15360,
};

export const mapCherno: MapProps = { name: "cherno", mapExtent: mapExtent, mapOptions, mapBounds };
