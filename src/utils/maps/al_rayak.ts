import { MapProps } from "../types";
const mapExtent = [0.0000,-7680.0000,7680.0000,0.0000]; // al_rayak
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 5,
  tileSize: 256,
};
const mapBounds = {
  x: 15360,
  y: 15360,
};

export const mapAlRayak: MapProps = { name: "al_rayak", mapExtent: mapExtent, mapOptions, mapBounds };
