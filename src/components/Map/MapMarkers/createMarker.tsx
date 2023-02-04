import { LatLng } from "leaflet";
import { IMarkerInfo } from "./types";
import { getAngleSolutionForRange, getBearing, getRange } from "../../../utils/ballistics";
import { Artillery, FireMode, MapInfo, ShellType } from "../../../utils/types";
import { latLngToArmaCoords } from "../MapUtils";

async function fetchHeightByCoordinates(mapName: string, x: number, y: number) {
  const roundedX = Math.round(x / 10) * 10;
  const roundedY = Math.round(y / 10) * 10;
  const endpoint = "http://127.0.0.1:3080/coords/";
  const json = await fetch(`${endpoint}${mapName}/${roundedX}.${roundedY}`, {
    method: "GET",
    mode: "cors",
  }).then((res) => res.json());

  console.log(json);
  return json.z;
}

export const createArtilleryMarker = async (
  latlng: LatLng,
  currentMap: MapInfo,
  cb: React.Dispatch<React.SetStateAction<IMarkerInfo | undefined>>
) => {
  const coordinates = latLngToArmaCoords(
    latlng,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds
  );
  const height = await fetchHeightByCoordinates(currentMap.name, coordinates.x, coordinates.y);
  const popupContent = (
    <>
      <div>Artillery Position:</div>
      <span>
        x: {coordinates.x}
        <br /> y: {coordinates.y}
        <br /> z: {height}
      </span>
    </>
  );
  cb({
    latlng,
    popupContent,
    coordinates: { x: coordinates.x, y: coordinates.y, z: height },
  });
};

export const createTargetMarker = async (
  latlng: LatLng,
  currentMap: MapInfo,
  artilleryPosition: IMarkerInfo,
  fireMode: FireMode,
  shell: ShellType,
  artillery: Artillery,
  topDown: boolean,
  cb: React.Dispatch<React.SetStateAction<IMarkerInfo[]>>
) => {
  if (!artilleryPosition) return;

  const targetCoords = latLngToArmaCoords(
    latlng,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds
  );
  const targetHeight = await fetchHeightByCoordinates(
    currentMap.name,
    targetCoords.x,
    targetCoords.y
  );
  const artyCoords = artilleryPosition.coordinates;
  const range = getRange(artyCoords!.x, artyCoords!.y, targetCoords.x, targetCoords.y);
  const bearing = getBearing(artyCoords!.x, artyCoords!.y, targetCoords.x, targetCoords.y);

  const muzzleVelocity = fireMode.artilleryCharge * shell.initSpeed;
  const { currentAngle, apex, tof, exitAngle } = getAngleSolutionForRange(
    range,
    muzzleVelocity,
    targetHeight - artyCoords!.z,
    artillery,
    shell,
    topDown
  );

  const popupContent = (
    <>
      <div>Target Position:</div>
      <span>
        x: {targetCoords.x}, y: {targetCoords.y}, z: {targetHeight}
      </span>
      {tof === 0 ? (
        <div>Solution not possible</div>
      ) : (
        <>
          <div>{fireMode.name} {shell.name}</div>
          <div>Range: {range.toFixed(1)}</div>
          <div>Elevation Angle: {currentAngle.toFixed(3)}</div>
          <div>Bearing: {bearing.toFixed(2)}</div>
          <div>ToF: {tof.toFixed(1)}</div>
          <div>apex: {apex.toFixed(1)}</div>
          <div>exitAngle: {exitAngle.toFixed(1)}</div>
        </>
      )}
    </>
  );
  cb((prevState) => {
    return [
      ...prevState,
      {
        latlng,
        popupContent,
        coordinates: { x: targetCoords.x, y: targetCoords.y, z: targetHeight },
      },
    ];
  });
};

export const createTriggerMarker = (
  latlng: LatLng,
  cb: React.Dispatch<React.SetStateAction<IMarkerInfo | undefined>>
) => {
  cb({ latlng, popupContent: "TriggerPos" });
};
