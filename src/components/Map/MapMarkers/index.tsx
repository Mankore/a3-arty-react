import { useEffect, useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { iconTarget, iconTrigger } from "../MapIcons";
import { createArtilleryMarker, createTargetMarker, createTriggerMarker } from "./createMarker";
import { IMapMarkers, IMarkerInfo } from "./types";

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const MapMarkers = ({
  crs,
  artillery,
  shell,
  fireMode,
  currentMap,
  topDown,
}: IMapMarkers) => {
  const [targets, setTargets] = useState<IMarkerInfo[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<IMarkerInfo>();
  const [triggerPosition, setTriggerPosition] = useState<IMarkerInfo>();

  const cleanupMarkers = () => {
    setArtilleryPosition(undefined);
    setTargets([]);
    setTriggerPosition(undefined);
  };

  useEffect(() => {
    cleanupMarkers();
  }, [currentMap]);

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
          topDown,
          setTargets
        );

      event.altKey && createTriggerMarker(latlng, setTriggerPosition);
    },
  });

  return (
    <>
      {targets.map((marker, idx) => {
        return (
          <Marker
            position={marker.latlng}
            key={idx}
            icon={iconTarget}
            draggable
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              keydown: (event) => {
                if (event.originalEvent.key === "Delete")
                  setTargets((prevState) => {
                    return prevState.filter((item) => item.latlng !== marker.latlng);
                  });
              },
              dragend: (event) => {
                createTargetMarker(
                  event.target._latlng,
                  currentMap,
                  artilleryPosition!,
                  fireMode,
                  shell,
                  artillery,
                  topDown,
                  setTargets,
                  idx
                );
              },
            }}
          >
            <Popup>{marker.popupContent}</Popup>
          </Marker>
        );
      })}
      {artilleryPosition && (
        <Marker
          position={artilleryPosition.latlng}
          draggable
          eventHandlers={{
            dragend: (e) =>
              createArtilleryMarker(e.target._latlng, currentMap, setArtilleryPosition),
          }}
        >
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
