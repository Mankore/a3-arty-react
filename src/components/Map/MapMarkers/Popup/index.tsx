import { IMarkerPopup, ITargetPopup } from "../types";

export const TargetPopup = ({
  coordinates,
  tof,
  shell,
  fireMode,
  range,
  currentAngle,
  bearing,
  apex,
  exitAngle,
}: ITargetPopup) => {
  return (
    <>
      <div>Target Position:</div>
      <span>
        [{coordinates.x}, {coordinates.y}, {coordinates.z}]
      </span>
      {tof === 0 ? (
        <div>Solution not possible</div>
      ) : (
        <>
          <div>
            {shell.name} {fireMode.name}
          </div>
          <div>Range: {range.toFixed(1)} m</div>
          <div style={{ color: "red" }}>Elevation Angle: {currentAngle.toFixed(3)}&deg;</div>
          <div>Bearing: {bearing.toFixed(2)}&deg;</div>
          <div>ToF: {tof.toFixed(1)} s</div>
          <div>apex: {apex.toFixed(1)} m</div>
          <div>exitAngle: {exitAngle.toFixed(1)}&deg;</div>
        </>
      )}
    </>
  );
};

export const ArtilleryPopup = ({ coordinates }: IMarkerPopup) => {
  return (
    <>
      <div>Artillery Position:</div>
      <span>
        [{coordinates.x}, {coordinates.y}, {coordinates.z}]
      </span>
    </>
  );
};
