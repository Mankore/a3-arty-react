import { CRS, LatLng } from "leaflet";
import { useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import { iconTarget, iconTrigger } from "../MapIcons";

interface IMapMarkers {
  crs: CRS;
}

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const MapMarkers = ({ crs }: IMapMarkers) => {
  const [targets, setTargets] = useState<LatLng[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<LatLng>();
  const [triggerPosition, setTriggerPosition] = useState<LatLng>();

  const map = useMap();
  const maxZoom = map.getMaxZoom();

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const point = crs.latLngToPoint(latlng, maxZoom);
      const event = e.originalEvent;
      console.log({ latlng, point });
      console.log("----");

      event.shiftKey && setArtilleryPosition(latlng);

      event.ctrlKey &&
        setTargets((prevState) => {
          return [...prevState, latlng];
        });

      event.altKey && setTriggerPosition(latlng);
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
          <Popup>Trigger pos</Popup>
        </Marker>
      )}
    </>
  );
};
