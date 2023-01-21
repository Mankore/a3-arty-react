import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";
import { Artillery, ShellType } from "../../utils/types";

const crs = Leaflet.CRS.Simple;
const mapExtent = [0.0, -7781.0, 7801.0, 0.0];

interface IMap {
  artillery: Artillery;
  shell: ShellType;
}

export const Map = ({ artillery, shell }: IMap) => {
  return (
    <Container>
      <MapContainer
        crs={crs}
        center={[0, 0]}
        zoom={3}
        minZoom={0}
        maxZoom={6}
        style={{ height: "100%", width: "100%" }}
        maxBoundsViscosity={1}
      >
        <TileLayer url="/maps/cherno/{z}/{x}/{y}.png" tileSize={128} noWrap />
        <MapMarkers crs={crs} mapExtent={mapExtent} artillery={artillery} shell={shell} />
        <MapSettings crs={crs} mapExtent={mapExtent} />
      </MapContainer>
    </Container>
  );
};
