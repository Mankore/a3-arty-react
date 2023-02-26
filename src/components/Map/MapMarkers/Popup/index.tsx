import { Container } from "./styles";
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
    <Container>
      <div>Target Position:</div>
      <span>
        <b>
          [{coordinates.x}, {coordinates.y}, {coordinates.z}]
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
            <b>Elevation Angle</b>: {currentAngle.toFixed(3)}&deg;
          </div>
          <div>
            <b>Bearing</b>: {bearing.toFixed(2)}&deg;
          </div>
          <div>
            <b>ToF</b>: {tof.toFixed(1)} s
          </div>
          <div>
            <b>Apex</b>: {apex.toFixed(1)} m
          </div>
          <div>
            <b>Exit Angle</b>: {exitAngle.toFixed(1)}&deg;
          </div>
        </>
      )}
    </Container>
  );
};

export const ArtilleryPopup = ({ coordinates, flatness }: IMarkerPopup) => {
  return (
    <Container>
      <div>Artillery Position:</div>
      <span>
        <b>
          [{coordinates.x}, {coordinates.y}, {coordinates.z}]
        </b>
      </span>
      <div>Flatness: {flatness ? flatness.toFixed(4) : "loading"}</div>
    </Container>
  );
};
