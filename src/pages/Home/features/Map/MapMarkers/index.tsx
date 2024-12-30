import { DragEndEvent, LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useMainDispatch, useMainSelector } from "@/state/hooks";
import { selectArtilleryPosition, selectMap } from "@/state/main/selectors";
import { ArtilleryMarker } from "./ArtilleryMarker";
import { TargetMarker } from "./TargetMarker";
import { TriggerMarker } from "./TriggerMarker";
import { setArtilleryPosition, setTargets } from "@/state/main";
import { selectTargets } from "@/state/main/selectors";

export const MapMarkers = () => {
  const dispatch = useMainDispatch();
  const targets = useMainSelector(selectTargets);
  const currentMap = useMainSelector(selectMap);
  const artilleryPosition = useMainSelector(selectArtilleryPosition);

  const [triggerPosition, setTriggerPosition] = useState<LatLng>();

  useEffect(() => {
    // Reset markers on map change
    dispatch(setArtilleryPosition(undefined));
    setTriggerPosition(undefined);
  }, [dispatch, currentMap]);

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const event = e.originalEvent;

      if (event.shiftKey) dispatch(setArtilleryPosition(latlng));

      if ((event.ctrlKey || event.metaKey) && artilleryPosition)
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
          markerPosition={target}
          onDragEnd={(e: DragEndEvent) => {
            const items = [...targets];
            items[idx] = e.target._latlng;
            dispatch(setTargets(items));
          }}
        />
      ))}
      {artilleryPosition && <ArtilleryMarker currentMap={currentMap} />}
      {triggerPosition && <TriggerMarker triggerPosition={triggerPosition} />}
    </>
  );
};
