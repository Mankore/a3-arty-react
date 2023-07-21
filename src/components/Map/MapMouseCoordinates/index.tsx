import { Point } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapInfo } from "../../../utils/types";
import { latLngToArmaCoords } from "../MapUtils";
import { CoordinateOverlay, Coordinates, HorizontalLine, VerticalLine } from "./styles";

export const MapMouseCoordinates = (map: MapInfo) => {
  const [coords, setCoords] = useState<Point>();
  const [mousePos, setMousePos] = useState<Point>();

  useMapEvents({
    mousemove(event) {
      const point = latLngToArmaCoords(
        event.latlng,
        map.mapOptions.maxZoom,
        map.mapExtent,
        map.mapBounds
      );
      setCoords(point);
      setMousePos(event.containerPoint);
    },
    mouseout() {
      setCoords(undefined);
    },
  });

  return coords ? (
    <CoordinateOverlay>
      {mousePos && (
        <>
          <Coordinates left={mousePos.x + 20} top={mousePos.y - 35}>
            [{coords.x}, {coords.y}]
          </Coordinates>
          <HorizontalLine left={mousePos.x + 30} top={mousePos.y} />
          <HorizontalLine left={mousePos.x - 30} top={mousePos.y} translateX={-100} />
          <VerticalLine left={mousePos.x} top={mousePos.y + 30} />
          <VerticalLine left={mousePos.x} top={mousePos.y - 30} translateY={-100} />
        </>
      )}
    </CoordinateOverlay>
  ) : (
    <></>
  );
};
