import { useState } from "react";
import { Circle, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { iconTarget } from "../MapIcons";
import { ITargetMarker } from "./types";

export const TargetMarker = ({
  artilleryPosition,
  markerPosition,
  onDragEnd,
  setTargets,
}: ITargetMarker) => {
  const [isHovered, setIsHovered] = useState(false);
  const map = useMap();
  const minZoom = map.getMinZoom();
  const point1 = map.project(artilleryPosition!.latlng, minZoom);
  const point2 = map.project(markerPosition.latlng, minZoom);
  const dist = point1.distanceTo(point2);

  return (
    <>
      <Marker
        position={markerPosition.latlng}
        icon={iconTarget}
        draggable
        eventHandlers={{
          mouseover: (event) => {
            event.target.openPopup();
            setIsHovered(true);
          },
          mouseout: (event) => {
            event.target.closePopup();
            setIsHovered(false);
          },
          keydown: (event) => {
            if (event.originalEvent.key === "Delete")
              setTargets((prevState) => {
                return prevState.filter((item) => item.latlng !== markerPosition.latlng);
              });
          },
          dragend: onDragEnd,
        }}
      >
        <Popup>{markerPosition.popupContent}</Popup>
        {isHovered && (
          <>
            <Circle
              center={artilleryPosition!.latlng}
              radius={dist}
              pathOptions={{ fillColor: "none" }}
            />
            <Polyline positions={[artilleryPosition.latlng, markerPosition.latlng]} />
          </>
        )}
      </Marker>
    </>
  );
};
