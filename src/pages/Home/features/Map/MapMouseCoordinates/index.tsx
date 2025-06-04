import { Point } from "leaflet";
import { useRef, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapInfo } from "@/shared/utils/types";
import { latLngToArmaCoords } from "../MapUtils";

const cursorSize = 30;

const setDivPosition = (
  ref: React.RefObject<HTMLDivElement | null>,
  pos: Point,
  left: number,
  top: number,
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
        map.mapBounds,
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
    <div className="pointer-events-none absolute inset-0 z-[1001] text-red-600">
      <div className="absolute text-sm font-bold" ref={coordinatesRef}>
        [{coords.x}, {coords.y}]
      </div>
      <div className="absolute h-[1px] w-full bg-red-600" ref={leftHorLine} />
      <div
        className="absolute h-[1px] w-full -translate-x-full bg-red-600"
        ref={rightHorLine}
      />
      <div className="absolute h-full w-[1px] bg-red-600" ref={topVerLine} />
      <div
        className="absolute h-full w-[1px] -translate-y-full bg-red-600"
        ref={bottomVerLine}
      />
    </div>
  ) : null;
};
