import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";

const crs = Leaflet.CRS.Simple;

export const Map = () => {
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
        <MapMarkers />
        <MapSettings />
      </MapContainer>
    </Container>
  );
};
