import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";
import { Artillery, FireMode, ShellType } from "../../utils/types";
import { useEffect } from "react";

const crs = Leaflet.CRS.Simple;
// const mapExtent = [0.0, -7781.0, 7801.0, 0.0]; // cherno
// const mapOptions = {
//   zoom: 3,
//   minZoom: 0,
//   maxZoom: 6,
//   tileSize: 128,
// };

const mapExtent = [0.0, -16384.0, 16384.0, 0.0]; // sahrani3
const mapOptions = {
  zoom: 3,
  minZoom: 0,
  maxZoom: 6,
  tileSize: 128,
};

interface IMap {
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
}

export const Map = ({ artillery, shell, fireMode }: IMap) => {
  useEffect(() => {
    fetch("/maps/sahrani3/height_map.txt").then((val) => {
      console.log("done");
    });
  }, []);
  return (
    <Container>
      <MapContainer
        crs={crs}
        center={[0, 0]}
        zoom={mapOptions.zoom}
        minZoom={mapOptions.minZoom}
        maxZoom={mapOptions.maxZoom}
        style={{ height: "100%", width: "100%" }}
        maxBoundsViscosity={1}
      >
        <TileLayer url="/maps/sahrani3/{z}/{x}/{y}.png" tileSize={mapOptions.tileSize} noWrap />
        <MapMarkers
          crs={crs}
          mapExtent={mapExtent}
          artillery={artillery}
          shell={shell}
          fireMode={fireMode}
        />
        <MapSettings crs={crs} mapExtent={mapExtent} />
      </MapContainer>
    </Container>
  );
};
