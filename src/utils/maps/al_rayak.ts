import { MapProps } from "../types";
const mapExtent = [0.0,-7680.0,7680.0,0.0]; // al_rayak
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 5,
  tileSize: 256,
};
const mapBounds = {
  x: 20480,
  y: 20480,
};

export const mapAlRayak: MapProps = { name: "al_rayak", mapExtent: mapExtent, mapOptions, mapBounds };
