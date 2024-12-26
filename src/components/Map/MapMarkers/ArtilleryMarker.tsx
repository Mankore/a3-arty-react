import { Marker, Popup } from "react-leaflet";
import { latLngToArmaCoords } from "../MapUtils";
import { ArtilleryPopup } from "./Popup";
import { IArtilleryMarker } from "./types";

export const ArtilleryMarker = ({
  artilleryPosition,
  onDragEnd,
  currentMap,
  artilleryHeight,
}: IArtilleryMarker) => {
  const coordinates = latLngToArmaCoords(
    artilleryPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds,
  );

  const position = { x: coordinates.x, y: coordinates.y, z: artilleryHeight };

  return (
    <>
      <Marker
        position={artilleryPosition}
        draggable
        eventHandlers={{
          dragend: onDragEnd,
        }}
      >
        <Popup>
          <ArtilleryPopup coordinates={position} />
        </Popup>
      </Marker>
    </>
  );
};
