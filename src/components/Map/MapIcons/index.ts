import L from "leaflet";
import targetSVG from "../../../assets/svg/target.svg";
import triggerSVG from "../../../assets/svg/trigger.svg";

const iconTarget = new L.Icon({
  iconUrl: targetSVG,
  iconRetinaUrl: targetSVG,
  iconSize: new L.Point(40, 40),
  popupAnchor: [-0, -0],
});

const iconTrigger = new L.Icon({
  iconUrl: triggerSVG,
  iconRetinaUrl: triggerSVG,
  iconSize: new L.Point(100, 100),
  popupAnchor: [-0, -0],
});

export { iconTarget, iconTrigger };
