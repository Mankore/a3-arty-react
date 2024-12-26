import { DragEndEvent, LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useMainDispatch, useMainSelector } from "@/state/hooks";
import { selectMap } from "@/state/main/selectors";
import { ArtilleryMarker } from "./ArtilleryMarker";
import { TargetMarker } from "./TargetMarker";
import { TriggerMarker } from "./TriggerMarker";
import { setTargets } from "@/state/main";
import { selectTargets } from "@/state/main/selectors";
import { useGetHeight } from "@/utils/hooks/useGetHeight";

export const MapMarkers = () => {
  const dispatch = useMainDispatch();
  const targets = useMainSelector(selectTargets);
  const currentMap = useMainSelector(selectMap);

  const [artilleryPosition, setArtilleryPosition] = useState<LatLng>();
  const [triggerPosition, setTriggerPosition] = useState<LatLng>();
  const { data: artilleryHeightData } = useGetHeight({
    map: currentMap.name,
    x: artilleryPosition?.lng ?? 0,
    y: artilleryPosition?.lat ?? 0,
    enabled: !!artilleryPosition,
  });

  useEffect(() => {
    // Reset markers on map change
    setArtilleryPosition(undefined);
    setTriggerPosition(undefined);
  }, [currentMap]);

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const event = e.originalEvent;

      if (event.shiftKey) setArtilleryPosition(latlng);

      if (event.ctrlKey && artilleryPosition)
        dispatch(setTargets([...targets, latlng]));

      if (event.altKey) setTriggerPosition(latlng);
    },
  });

  return (
    <>
      {targets.map((target, idx) => (
        <TargetMarker
          key={idx}
          artilleryPosition={artilleryPosition!}
          artilleryHeight={artilleryHeightData?.z}
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
          artilleryHeight={artilleryHeightData?.z}
        />
      )}
      {triggerPosition && <TriggerMarker triggerPosition={triggerPosition} />}
    </>
  );
};
