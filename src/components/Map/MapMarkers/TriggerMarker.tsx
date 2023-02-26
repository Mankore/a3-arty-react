import { Marker } from "react-leaflet";
import { ITriggerMarker } from "./types";
import { iconTrigger } from "../MapIcons";

export const TriggerMarker = ({ triggerPosition }: ITriggerMarker) => {
  return (
    <>
      <Marker position={triggerPosition} icon={iconTrigger}></Marker>
    </>
  );
};
