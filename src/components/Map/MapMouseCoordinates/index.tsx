import { Point } from "leaflet";
import { useRef, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapInfo } from "../../../utils/types";
import { latLngToArmaCoords } from "../MapUtils";
import { CoordinateOverlay, Coordinates, HorizontalLine, VerticalLine } from "./styles";

export const MapMouseCoordinates = (map: MapInfo) => {
  const [coords, setCoords] = useState<Point>();
  const [mousePos, setMousePos] = useState<Point>();
  const leftHorLine = useRef<HTMLDivElement>(null);
  const rightHorLine = useRef<HTMLDivElement>(null);
  const topVerLine = useRef<HTMLDivElement>(null);
  const bottomVerLine = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<HTMLDivElement>(null);

  useMapEvents({
    mousemove(event) {
      const point = latLngToArmaCoords(
        event.latlng,
        map.mapOptions.maxZoom,
        map.mapExtent,
        map.mapBounds
      );
      setCoords(point);
      const pos = event.containerPoint;
      setMousePos(pos);

      if (leftHorLine && leftHorLine.current) {
        leftHorLine.current.style.left = `${pos.x + 30}px`;
        leftHorLine.current.style.top = `${pos.y}px`;
      }
      if (rightHorLine && rightHorLine.current) {
        rightHorLine.current.style.left = `${pos.x - 30}px`;
        rightHorLine.current.style.top = `${pos.y}px`;
      }
      if (topVerLine && topVerLine.current) {
        topVerLine.current.style.left = `${pos.x}px`;
        topVerLine.current.style.top = `${pos.y + 30}px`;
      }
      if (bottomVerLine && bottomVerLine.current) {
        bottomVerLine.current.style.left = `${pos.x}px`;
        bottomVerLine.current.style.top = `${pos.y - 30}px`;
      }
      if (coordinatesRef && coordinatesRef.current) {
        coordinatesRef.current.style.left = `${pos.x + 50}px`;
        coordinatesRef.current.style.top = `${pos.y - 35}px`;
      }
    },
    mouseout() {
      setCoords(undefined);
    },
  });

  return coords ? (
    <CoordinateOverlay>
      {mousePos && (
        <>
          <Coordinates ref={coordinatesRef}>
            [{coords.x}, {coords.y}]
          </Coordinates>
          <HorizontalLine ref={leftHorLine} />
          <HorizontalLine translateX={-100} ref={rightHorLine} />
          <VerticalLine ref={topVerLine} />
          <VerticalLine translateY={-100} ref={bottomVerLine} />
        </>
      )}
    </CoordinateOverlay>
  ) : (
    <></>
  );
};
