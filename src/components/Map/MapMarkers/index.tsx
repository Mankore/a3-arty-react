import Leaflet, { LatLng } from "leaflet";
import { useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import { iconTarget, iconTrigger } from "../MapIcons";

const crs = Leaflet.CRS.Simple;

export const MapMarkers = () => {
  const [targets, setTargets] = useState<LatLng[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<LatLng>();
  const [triggerPosition, setTriggerPosition] = useState<LatLng>();
  const map = useMap();
  const maxZoom = map.getMaxZoom();

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const point = crs.latLngToPoint(latlng, maxZoom);
      console.log(point);
      console.log(e.latlng);
      console.log(e);
      console.log("----");

      e.originalEvent.shiftKey && setArtilleryPosition(latlng);

      e.originalEvent.ctrlKey &&
        setTargets((prevState) => {
          return [...prevState, latlng];
        });

      e.originalEvent.altKey && setTriggerPosition(latlng);
    },
  });

  return (
    <>
      {targets.map((position, idx) => {
        return (
          <Marker position={position} key={idx} icon={iconTarget}>
            <Popup>{crs.latLngToPoint(position, maxZoom).toString()}</Popup>
          </Marker>
        );
      })}
      {artilleryPosition && (
        <Marker position={artilleryPosition}>
          <Popup>Arty pos</Popup>
        </Marker>
      )}
      {triggerPosition && (
        <Marker position={triggerPosition} icon={iconTrigger}>
          <Popup>Arty pos</Popup>
        </Marker>
      )}
    </>
  );
};
