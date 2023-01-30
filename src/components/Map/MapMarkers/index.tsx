import { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { iconTarget, iconTrigger } from "../MapIcons";
import { createArtilleryMarker, createTargetMarker, createTriggerMarker } from "./createMarker";
import { IMapMarkers, IMarkerInfo } from "./types";

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const MapMarkers = ({ crs, artillery, shell, fireMode, currentMap }: IMapMarkers) => {
  const [targets, setTargets] = useState<IMarkerInfo[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<IMarkerInfo>();
  const [triggerPosition, setTriggerPosition] = useState<IMarkerInfo>();

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const event = e.originalEvent;

      event.shiftKey && createArtilleryMarker(latlng, currentMap, setArtilleryPosition);

      event.ctrlKey &&
        artilleryPosition &&
        createTargetMarker(
          latlng,
          currentMap,
          artilleryPosition,
          fireMode,
          shell,
          artillery,
          setTargets
        );

      event.altKey && createTriggerMarker(latlng, setTriggerPosition);
    },
    keyup(e) {
      if (e.originalEvent.key === "Delete") {
        console.log(e);
      }
    },
  });

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
