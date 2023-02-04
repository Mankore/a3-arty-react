import { Point } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapInfo } from "../../../utils/types";
import { latLngToArmaCoords } from "../MapUtils";
import { Container } from "./styles";

export const MapMouseCoordinates = (map: MapInfo) => {
  const [mousePos, setMousePos] = useState<Point>();

  useMapEvents({
    mousemove(event) {
      const point = latLngToArmaCoords(
        event.latlng,
        map.mapOptions.maxZoom,
        map.mapExtent,
        map.mapBounds
      );
      setMousePos(point);
    },
    mouseout() {
      setMousePos(undefined);
    },
  });

  return mousePos ? (
    <Container>
      [{mousePos.x}, {mousePos.y}]
    </Container>
  ) : (
    <></>
  );
};
