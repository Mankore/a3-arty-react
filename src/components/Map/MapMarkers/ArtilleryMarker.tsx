import { Circle, Marker, Popup } from "react-leaflet";
import { getMaxRange } from "../../../utils/ballistics";
import { IArtilleryMarker } from "./types";

export const ArtilleryMarker = ({
  artilleryPosition,
  onDragEnd,
  artillery,
  shell,
  fireMode,
}: IArtilleryMarker) => {
  const { maxRange, currentAngle } = getMaxRange(artillery, shell, fireMode);
  // const map = useMap();
  console.log({ maxRange, currentAngle });

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
      <Circle center={artilleryPosition.latlng} radius={200} />
    </>
  );
};
