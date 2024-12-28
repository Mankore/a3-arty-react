import { useMemo, useState } from "react";
import { Circle, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { useMainDispatch, useMainSelector } from "@/state/hooks";
import {
  selectArtillery,
  selectFireMode,
  selectHeightAdjustment,
  selectMap,
  selectShell,
  selectTopDown,
} from "@/state/main/selectors";
import {
  getAngleSolutionForRange,
  getAzimuth,
  getRange,
} from "@/utils/ballistics";
import { iconTarget } from "../MapIcons";
import { latLngToArmaCoords } from "../MapUtils";
import { TargetPopup } from "./Popup";
import { ITargetMarker, ITargetMarkerVisuals } from "./types";
import { selectTargets } from "@/state/main/selectors";
import { setTargets } from "@/state/main";
import { useGetHeight } from "@/utils/hooks/useGetHeight";

export const TargetMarker = ({
  artilleryPosition,
  markerPosition,
  onDragEnd,
}: ITargetMarker) => {
  const isTopDown = useMainSelector(selectTopDown);
  const artillery = useMainSelector(selectArtillery);
  const fireMode = useMainSelector(selectFireMode);
  const shell = useMainSelector(selectShell);
  const heightAdjustment = useMainSelector(selectHeightAdjustment);
  const currentMap = useMainSelector(selectMap);

  // Calculate Marker Solution

  const targetPoint = latLngToArmaCoords(
    markerPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds,
  );

  const artyPoint = latLngToArmaCoords(
    artilleryPosition,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds,
  );

  const { data: targetHeightData, isPending: isTargetDataPending } =
    useGetHeight({
      map: currentMap.name,
      x: targetPoint.x,
      y: targetPoint.y,
    });

  const { data: artilleryHeightData } = useGetHeight({
    map: currentMap.name,
    x: artyPoint.x,
    y: artyPoint.y,
  });

  const range = getRange(
    artyPoint.x,
    artyPoint.y,
    targetPoint.x,
    targetPoint.y,
  );
  const azimuth = getAzimuth(
    artyPoint.x,
    artyPoint.y,
    targetPoint.x,
    targetPoint.y,
  );

  const muzzleVelocity = fireMode.artilleryCharge * shell.initSpeed;

  const targetHeight = targetHeightData ? targetHeightData.z : 0;
  const artilleryHeight = artilleryHeightData ? artilleryHeightData.z : 0;

  const altDiff = targetHeight - artilleryHeight + heightAdjustment;

  const solution = useMemo(
    () =>
      getAngleSolutionForRange(
        range,
        muzzleVelocity,
        altDiff,
        artillery,
        shell,
        isTopDown,
      ),
    [range, muzzleVelocity, altDiff, artillery, shell, isTopDown],
  );

  const coordinates = {
    x: targetPoint.x,
    y: targetPoint.y,
    z: targetHeightData?.z,
  };

  return (
    <TargetMarkerVisuals
      artilleryPosition={artilleryPosition}
      markerPosition={markerPosition}
      onDragEnd={onDragEnd}
      popupContent={
        isTargetDataPending ? (
          <>Loading...</>
        ) : (
          <TargetPopup
            coordinates={coordinates}
            shell={shell}
            fireMode={fireMode}
            range={range}
            azimuth={azimuth}
            {...solution!}
          />
        )
      }
    />
  );
};

const TargetMarkerVisuals = ({
  artilleryPosition,
  markerPosition,
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

  const dispatch = useMainDispatch();
  const targets = useMainSelector(selectTargets);

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
          mouseout: () => {
            // event.target.closePopup();
            setIsHovered(false);
          },
          keydown: (event) => {
            if (event.originalEvent.key === "Delete")
              dispatch(
                setTargets(targets.filter((item) => item !== markerPosition)),
              );
          },
          dragend: onDragEnd,
        }}
      >
        <Popup>{popupContent}</Popup>
        {isHovered && (
          <>
            <Circle
              center={artilleryPosition!}
              radius={dist}
              pathOptions={{ fillColor: "none" }}
            />
            <Polyline positions={[artilleryPosition, markerPosition]} />
          </>
        )}
      </Marker>
    </>
  );
};
