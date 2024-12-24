import { MapInfo } from "../types";
const mapExtent = [0.0, -11520.0, 11520.0, 0.0]; // altis
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 6,
  tileSize: 256,
};
const mapBounds = {
  x: 30720,
  y: 30720,
};

export const mapAltis: MapInfo = { name: "Altis", mapExtent, mapOptions, mapBounds };
