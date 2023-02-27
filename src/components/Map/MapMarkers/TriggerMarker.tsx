import { Marker } from "react-leaflet";
import { ITriggerMarker } from "./types";
import { iconTrigger } from "../MapIcons";

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const TriggerMarker = ({ triggerPosition }: ITriggerMarker) => {
  return (
    <>
      <Marker position={triggerPosition} icon={iconTrigger}></Marker>
    </>
  );
};
