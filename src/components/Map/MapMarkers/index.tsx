import { DragEndEvent, LatLng } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useMainDispatch, useMainSelector } from "../../../state/hooks";
import { selectMap } from "../../../state/main/selectors";
import { ArtilleryMarker } from "./ArtilleryMarker";
import { TargetMarker } from "./TargetMarker";
import { TriggerMarker } from "./TriggerMarker";
import { IMapMarkers } from "./types";
import { setTargets } from "../../../state/main";
import { selectTargets } from "../../../state/main/selectors";

export const MapMarkers = ({ crs }: IMapMarkers) => {
  const dispatch = useMainDispatch();
  const targets = useMainSelector(selectTargets);
  const currentMap = useMainSelector(selectMap);

  const [artilleryPosition, setArtilleryPosition] = useState<LatLng>();
  const [triggerPosition, setTriggerPosition] = useState<LatLng>();
  const [artilleryHeight, setArtilleryHeight] = useState<number>(0);

  const cleanupMarkers = useCallback(() => {
    setArtilleryPosition(undefined);
    setTriggerPosition(undefined);
  }, []);

  useEffect(() => {
    cleanupMarkers();
  }, [currentMap, cleanupMarkers]);

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const event = e.originalEvent;

      event.shiftKey && setArtilleryPosition(latlng);

      event.ctrlKey && artilleryPosition && dispatch(setTargets([...targets, latlng]));

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
            const items = [...targets];
            items[idx] = e.target._latlng;
            dispatch(setTargets(items));
          }}
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
