import { Point } from "leaflet";
import { useRef, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapInfo } from "../../../utils/types";
import { latLngToArmaCoords } from "../MapUtils";
import { CoordinateOverlay, Coordinates, HorizontalLine, VerticalLine } from "./styles";

const cursorSize = 30;

const setDivPosition = (
  ref: React.RefObject<HTMLDivElement>,
  pos: Point,
  left: number,
  top: number
) => {
  if (ref && ref.current) {
    ref.current.style.left = `${pos.x + left}px`;
    ref.current.style.top = `${pos.y + top}px`;
  }
};

export const MapMouseCoordinates = (map: MapInfo) => {
  const [coords, setCoords] = useState<Point>();
  const leftHorLine = useRef<HTMLDivElement>(null);
  const rightHorLine = useRef<HTMLDivElement>(null);
  const topVerLine = useRef<HTMLDivElement>(null);
  const bottomVerLine = useRef<HTMLDivElement>(null);
  const coordinatesRef = useRef<HTMLDivElement>(null);

  const overlayElements = [
    {
      ref: leftHorLine,
      left: cursorSize,
      top: 0,
    },
    {
      ref: rightHorLine,
      left: -cursorSize,
      top: 0,
    },
    {
      ref: topVerLine,
      left: 0,
      top: cursorSize,
    },
    {
      ref: bottomVerLine,
      left: 0,
      top: -cursorSize,
    },
    {
      ref: coordinatesRef,
      left: 50,
      top: -35,
    },
  ];

  useMapEvents({
    mousemove(event) {
      const point = latLngToArmaCoords(
        event.latlng,
        map.mapOptions.maxZoom,
        map.mapExtent,
        map.mapBounds
      );
      setCoords(point);

      overlayElements.forEach((elem) => {
        setDivPosition(elem.ref, event.containerPoint, elem.left, elem.top);
      });
    },
    mouseout() {
      setCoords(undefined);
    },
  });

  return coords ? (
    <CoordinateOverlay>
      <Coordinates ref={coordinatesRef}>
        [{coords.x}, {coords.y}]
      </Coordinates>
      <HorizontalLine ref={leftHorLine} />
      <HorizontalLine $translateX={-100} ref={rightHorLine} />
      <VerticalLine ref={topVerLine} />
      <VerticalLine $translateY={-100} ref={bottomVerLine} />
    </CoordinateOverlay>
  ) : (
    <></>
  );
};
