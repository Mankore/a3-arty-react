import { LatLng } from "leaflet";
import { IMarkerInfo } from "./types";
import { getAngleSolutionForRange, getBearing, getRange } from "../../../utils/ballistics";
import { Artillery, FireMode, MapInfo, ShellType } from "../../../utils/types";
import { fetchHeightByCoordinates, latLngToArmaCoords } from "../MapUtils";
import { ArtilleryPopup, TargetPopup } from "./Popup";

export const createArtilleryMarker = async (
  latlng: LatLng,
  currentMap: MapInfo,
  setState: React.Dispatch<React.SetStateAction<IMarkerInfo | undefined>>
) => {
  const coordinates = latLngToArmaCoords(
    latlng,
    currentMap.mapOptions.maxZoom,
    currentMap.mapExtent,
    currentMap.mapBounds
  );
  const height = await fetchHeightByCoordinates(currentMap.name, coordinates.x, coordinates.y);
  const position = { x: coordinates.x, y: coordinates.y, z: height };
  const popupContent = <ArtilleryPopup coordinates={position} />;
  setState({
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
  setState: React.Dispatch<React.SetStateAction<IMarkerInfo[]>>,
  oldMarkerId?: number
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
  const solution = getAngleSolutionForRange(
    range,
    muzzleVelocity,
    targetHeight - artyCoords!.z,
    artillery,
    shell,
    topDown
  );

  const coordinates = { x: targetCoords.x, y: targetCoords.y, z: targetHeight };

  const popupContent = (
    <TargetPopup
      coordinates={coordinates}
      shell={shell}
      fireMode={fireMode}
      range={range}
      bearing={bearing}
      {...solution}
    />
  );

  if (oldMarkerId === undefined) {
    setState((prevState) => {
      return [
        ...prevState,
        {
          latlng,
          popupContent,
          coordinates,
        },
      ];
    });
  } else {
    setState((prevState) => {
      const items = [...prevState];
      const updatedItem = {
        ...items[oldMarkerId],
        latlng,
        popupContent,
        coordinates,
      };
      items[oldMarkerId] = updatedItem;
      return items;
    });
  }
};

export const createTriggerMarker = (
  latlng: LatLng,
  setState: React.Dispatch<React.SetStateAction<IMarkerInfo | undefined>>
) => {
  setState({ latlng, popupContent: "TriggerPos" });
};
