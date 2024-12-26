import { IMarkerPopup, ITargetPopup } from "../types";

export const TargetPopup = ({
  coordinates,
  tof,
  shell,
  fireMode,
  range,
  currentAngle,
  azimuth,
  apex,
  exitAngle,
}: ITargetPopup) => {
  return (
    <div className="select-none text-sm">
      <div>Target Position:</div>
      <span>
        <b>
          [<span title="X">{coordinates.x}</span>,{" "}
          <span title="Y">{coordinates.y}</span>,{" "}
          <span title="Z">{coordinates.z}</span>]
        </b>
      </span>
      {tof === 0 ? (
        <div>Solution not possible</div>
      ) : (
        <>
          <div>
            {shell.name} / {fireMode.name}
          </div>
          <div>
            <b>Range</b>: {range.toFixed(1)} m
          </div>
          <div style={{ color: "red" }}>
            <b>Elevation</b>: {currentAngle.toFixed(3)}&deg;
          </div>
          <div style={{ color: "blue" }}>
            <b>Azimuth</b>: {azimuth.toFixed(2)}&deg;
          </div>
          <div title="Time of Flight">
            <b>ToF</b>: {tof.toFixed(1)} s
          </div>
          <div title="Heighest point of trajectory">
            <b>Apex</b>: {apex.toFixed(1)} m
          </div>
          <div title="Angle at which the shell lands on the target">
            <b>Exit Angle</b>: {exitAngle.toFixed(1)}&deg;
          </div>
        </>
      )}
    </div>
  );
};

export const ArtilleryPopup = ({ coordinates }: IMarkerPopup) => {
  return (
    <div className="select-none text-sm">
      <div>Artillery Position:</div>
      <span>
        <b>
          [{coordinates.x}, {coordinates.y}, {coordinates.z}]
        </b>
      </span>
      {/* <div>Flatness: {flatness !== undefined? flatness.toFixed(4) : "loading"}</div> */}
    </div>
  );
};
