import { useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { fetchHeightByCoordinates, latLngToArmaCoords } from "../MapUtils";
import { ArtilleryPopup } from "./Popup";
import { IArtilleryMarker } from "./types";

export const ArtilleryMarker = ({
  artilleryPosition,
  onDragEnd,
  currentMap,
  artilleryHeight,
  setArtilleryHeight,
}: IArtilleryMarker) => {
  const coordinates = latLngToArmaCoords(
    artilleryPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds,
  );

  useEffect(() => {
    async function fetchHeight() {
      const height = await fetchHeightByCoordinates(
        currentMap.name,
        coordinates.x,
        coordinates.y,
      );
      setArtilleryHeight(height);
    }
    fetchHeight();
  }, [coordinates.x, coordinates.y, currentMap.name, setArtilleryHeight]);

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
