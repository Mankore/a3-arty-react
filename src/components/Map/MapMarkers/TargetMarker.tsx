import { useEffect, useMemo, useState } from "react";
import { Circle, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { getAngleSolutionForRange, getBearing, getRange } from "../../../utils/ballistics";
import { iconTarget } from "../MapIcons";
import { fetchHeightByCoordinates, latLngToArmaCoords } from "../MapUtils";
import { TargetPopup } from "./Popup";
import { ITargetMarker, ITargetMarkerVisuals } from "./types";

export const TargetMarker = ({
  artilleryPosition,
  markerPosition,
  onDragEnd,
  setTargets,
  artilleryHeight,
  currentMap,
  artillery,
  fireMode,
  shell,
  topDown,
  heightAdjustment,
}: ITargetMarker) => {
  // Calculate Marker Solution
  const [targetHeight, setTargetHeight] = useState<number | undefined>(undefined);
  const targetPoint = latLngToArmaCoords(
    markerPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds
  );

  const artyPoint = latLngToArmaCoords(
    artilleryPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds
  );

  useEffect(() => {
    async function fetchTargetHeight() {
      const height = await fetchHeightByCoordinates(currentMap.name, targetPoint.x, targetPoint.y);
      setTargetHeight(height);
    }
    fetchTargetHeight();
  }, [currentMap.name, targetPoint.x, targetPoint.y]);

  const range = getRange(artyPoint.x, artyPoint.y, targetPoint.x, targetPoint.y);
  const bearing = getBearing(artyPoint.x, artyPoint.y, targetPoint.x, targetPoint.y);

  const muzzleVelocity = fireMode.artilleryCharge * shell.initSpeed;

  const altDiff =
    targetHeight !== undefined
      ? targetHeight - artilleryHeight + heightAdjustment
      : heightAdjustment;

  const solution = useMemo(
    () => getAngleSolutionForRange(range, muzzleVelocity, altDiff, artillery, shell, topDown),
    [range, muzzleVelocity, altDiff, artillery, shell, topDown]
  );

  const coordinates = { x: targetPoint.x, y: targetPoint.y, z: targetHeight };

  return (
    <TargetMarkerVisuals
      artilleryPosition={artilleryPosition}
      markerPosition={markerPosition}
      setTargets={setTargets}
      onDragEnd={onDragEnd}
      popupContent={
        targetHeight !== undefined ? (
          <TargetPopup
            coordinates={coordinates}
            shell={shell}
            fireMode={fireMode}
            range={range}
            bearing={bearing}
            {...solution!}
          />
        ) : (
          <>Loading...</>
        )
      }
    />
  );
};

const TargetMarkerVisuals = ({
  artilleryPosition,
  markerPosition,
  setTargets,
  onDragEnd,
  popupContent,
}: ITargetMarkerVisuals) => {
  // Calculate Marker Visual State
  const [isHovered, setIsHovered] = useState(false);
  const map = useMap();
  const minZoom = map.getMinZoom();
  const point1 = map.project(artilleryPosition, minZoom);
  const point2 = map.project(markerPosition, minZoom);
  const dist = point1.distanceTo(point2);

  return (
    <>
      <Marker
        position={markerPosition}
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
                return prevState.filter((item) => item !== markerPosition);
              });
          },
          dragend: onDragEnd,
        }}
      >
        <Popup>{popupContent}</Popup>
        {isHovered && (
          <>
            <Circle center={artilleryPosition!} radius={dist} pathOptions={{ fillColor: "none" }} />
            <Polyline positions={[artilleryPosition, markerPosition]} />
          </>
        )}
      </Marker>
    </>
  );
};
