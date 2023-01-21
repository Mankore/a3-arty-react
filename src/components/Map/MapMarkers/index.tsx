import { CRS, LatLng } from "leaflet";
import { useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import { getAngleSolutionForRange, getBearing, getRange } from "../../../utils/ballistics";
import { Artillery, FireMode, ShellType } from "../../../utils/types";
import { iconTarget, iconTrigger } from "../MapIcons";
import { latLngToArmaCoords } from "../MapUtils";

interface IMapMarkers {
  crs: CRS;
  mapExtent: number[];
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
}

interface IMarkerInfo {
  latlng: LatLng;
  popupContent: React.ReactNode;
}

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const MapMarkers = ({ crs, mapExtent, artillery, shell, fireMode }: IMapMarkers) => {
  const [targets, setTargets] = useState<IMarkerInfo[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<IMarkerInfo>();
  const [triggerPosition, setTriggerPosition] = useState<IMarkerInfo>();

  const map = useMap();
  const maxZoom = map.getMaxZoom();

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const event = e.originalEvent;

      event.shiftKey && createArtilleryMarker(latlng);

      event.ctrlKey && artilleryPosition && createTargetMarker(latlng);

      event.altKey && createTriggerMarker(latlng);
    },
  });

  const createTargetMarker = (latlng: LatLng) => {
    if (!artilleryPosition) return;

    const targetCoords = latLngToArmaCoords(latlng, maxZoom, mapExtent, crs);
    const artyCoords = latLngToArmaCoords(artilleryPosition.latlng, maxZoom, mapExtent, crs);
    const range = getRange(artyCoords.x, artyCoords.y, targetCoords.x, targetCoords.y);
    const bearing = getBearing(artyCoords.x, artyCoords.y, targetCoords.x, targetCoords.y);

    const muzzleVelocity = fireMode.artilleryCharge * shell.initSpeed;
    const { currentAngle, apex, tof, exitAngle, px } = getAngleSolutionForRange(
      range,
      muzzleVelocity,
      0,
      artillery,
      shell,
      false
    );

    const popupContent = (
      <>
        <div>Target Position:</div>
        <span>
          x: {targetCoords.x}, y: {targetCoords.y}
        </span>
        <div>Fire Mode: {fireMode.name}</div>
        <div>Shell: {shell.name}</div>
        <div>Range: {range}</div>
        <div>Barrel Angle: {currentAngle}</div>
        <div>Bearing: {bearing}</div>
        <div>tof: {tof}</div>
        <div>px: {px}</div>
        <div>apex: {apex}</div>
        <div>exitAngle: {exitAngle}</div>
      </>
    );
    setTargets((prevState) => {
      return [...prevState, { latlng, popupContent }];
    });
  };

  const createArtilleryMarker = (latlng: LatLng) => {
    const coordinates = latLngToArmaCoords(latlng, maxZoom, mapExtent, crs);
    const popupContent = (
      <>
        <div>Artillery Position:</div>
        <span>
          x: {coordinates.x}, y: {coordinates.y}
        </span>
      </>
    );
    setArtilleryPosition({ latlng, popupContent });
  };

  const createTriggerMarker = (latlng: LatLng) => {
    setTriggerPosition({ latlng, popupContent: "TriggerPos" });
  };

  return (
    <>
      {targets.map((marker, idx) => {
        return (
          <Marker position={marker.latlng} key={idx} icon={iconTarget}>
            <Popup>{marker.popupContent}</Popup>
          </Marker>
        );
      })}
      {artilleryPosition && (
        <Marker position={artilleryPosition.latlng}>
          <Popup>{artilleryPosition.popupContent}</Popup>
        </Marker>
      )}
      {triggerPosition && (
        <Marker position={triggerPosition.latlng} icon={iconTrigger}>
          <Popup>{triggerPosition.popupContent}</Popup>
        </Marker>
      )}
    </>
  );
};
