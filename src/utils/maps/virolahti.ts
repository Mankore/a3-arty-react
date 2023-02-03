import { MapProps } from "../types";
const mapExtent = [0.0000,-8192.0000,8192.0000,0.0000]; // virolahti
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

export const mapVirolahti: MapProps = { name: "virolahti", mapExtent: mapExtent, mapOptions, mapBounds };
