import { useEffect, useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { iconTrigger } from "../MapIcons";
import { ArtilleryMarker } from "./ArtilleryMarker";
import { createArtilleryMarker, createTargetMarker, createTriggerMarker } from "./createMarker";
import { TargetMarker } from "./TargetMarker";
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
      {targets.map((target, idx) => (
        <TargetMarker
          key={idx}
          artilleryPosition={artilleryPosition!}
          markerPosition={target}
          setTargets={setTargets}
          onDragEnd={(event) =>
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
            )
          }
        />
      ))}
      {artilleryPosition && (
        <ArtilleryMarker
          artilleryPosition={artilleryPosition}
          onDragEnd={(e) =>
            createArtilleryMarker(e.target._latlng, currentMap, setArtilleryPosition)
          }
          artillery={artillery}
          shell={shell}
          fireMode={fireMode}
          currentMap={currentMap}
        />
      )}
      {triggerPosition && (
        <Marker position={triggerPosition.latlng} icon={iconTrigger}>
          <Popup>{triggerPosition.popupContent}</Popup>
        </Marker>
      )}
    </>
  );
};
