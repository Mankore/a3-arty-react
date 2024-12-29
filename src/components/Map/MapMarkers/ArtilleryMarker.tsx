import { Marker, Popup } from "react-leaflet";
import { latLngToArmaCoords } from "../MapUtils";
import { ArtilleryPopup } from "./Popup";
import { IArtilleryMarker } from "./types";
import { useGetHeight } from "@/utils/hooks/useGetHeight";
import { useMainDispatch, useMainSelector } from "@/state/hooks";
import { selectArtilleryPosition } from "@/state/main/selectors";
import { setArtilleryPosition } from "@/state/main";

export const ArtilleryMarker = ({ currentMap }: IArtilleryMarker) => {
  const artilleryPosition = useMainSelector(selectArtilleryPosition);
  const dispatch = useMainDispatch();

  const coordinates = latLngToArmaCoords(
    artilleryPosition!,
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
        position={artilleryPosition!}
        draggable
        eventHandlers={{
          dragend: (e) => {
            dispatch(setArtilleryPosition(e.target._latlng));
          },
        }}
      >
        <Popup>
          <ArtilleryPopup coordinates={position} />
        </Popup>
      </Marker>
    </>
  );
};
