import { DragEndEvent, LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { ArtilleryMarker } from "./ArtilleryMarker";
import { TargetMarker } from "./TargetMarker";
import { TriggerMarker } from "./TriggerMarker";
import { IMapMarkers } from "./types";

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const MapMarkers = ({
  crs,
  artillery,
  shell,
  fireMode,
  currentMap,
  topDown,
  heightAdjustment,
}: IMapMarkers) => {
  const [targets, setTargets] = useState<LatLng[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<LatLng>();
  const [triggerPosition, setTriggerPosition] = useState<LatLng>();
  const [artilleryHeight, setArtilleryHeight] = useState<number>(0);

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

      event.shiftKey && setArtilleryPosition(latlng);

      event.ctrlKey &&
        artilleryPosition &&
        setTargets((prevState) => {
          return [...prevState, latlng];
        });

      event.altKey && setTriggerPosition(latlng);
    },
  });

  return (
    <>
      {targets.map((target, idx) => (
        <TargetMarker
          key={idx}
          artilleryPosition={artilleryPosition!}
          artilleryHeight={artilleryHeight}
          markerPosition={target}
          onDragEnd={(e: DragEndEvent) => {
            setTargets((prevState) => {
              const items = [...prevState];
              items[idx] = e.target._latlng;
              return items;
            });
          }}
          setTargets={setTargets}
          currentMap={currentMap}
          artillery={artillery}
          fireMode={fireMode}
          shell={shell}
          topDown={topDown}
          heightAdjustment={heightAdjustment}
        />
      ))}
      {artilleryPosition && (
        <ArtilleryMarker
          artilleryPosition={artilleryPosition}
          onDragEnd={(e) => {
            setArtilleryPosition(e.target._latlng);
          }}
          currentMap={currentMap}
          setArtilleryHeight={setArtilleryHeight}
          artilleryHeight={artilleryHeight}
        />
      )}
      {triggerPosition && <TriggerMarker triggerPosition={triggerPosition} />}
    </>
  );
};
