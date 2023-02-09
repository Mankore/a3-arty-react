import { Marker, Popup } from "react-leaflet";
import { IArtilleryMarker } from "./types";

export const ArtilleryMarker = ({
  artilleryPosition,
  onDragEnd,
  artillery,
  shell,
  fireMode,
}: IArtilleryMarker) => {
  return (
    <>
      <Marker
        position={artilleryPosition.latlng}
        draggable
        eventHandlers={{
          dragend: onDragEnd,
        }}
      >
        <Popup>{artilleryPosition.popupContent}</Popup>
      </Marker>
    </>
  );
};
