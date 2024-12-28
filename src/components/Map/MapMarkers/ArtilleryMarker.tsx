import { Marker, Popup } from "react-leaflet";
import { latLngToArmaCoords } from "../MapUtils";
import { ArtilleryPopup } from "./Popup";
import { IArtilleryMarker } from "./types";
import { useGetHeight } from "@/utils/hooks/useGetHeight";

export const ArtilleryMarker = ({
  artilleryPosition,
  onDragEnd,
  currentMap,
}: IArtilleryMarker) => {
  const coordinates = latLngToArmaCoords(
    artilleryPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds,
  );

  const { data: artilleryHeightData } = useGetHeight({
    map: currentMap.name,
    x: coordinates.x,
    y: coordinates.y,
  });

  const position = {
    x: coordinates.x,
    y: coordinates.y,
    z: artilleryHeightData?.z,
  };

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
