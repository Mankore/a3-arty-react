import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";

const crs = Leaflet.CRS.Simple;
const mapExtent = [0.0, -7781.0, 7801.0, 0.0];

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
        <MapMarkers crs={crs}/>
        <MapSettings crs={crs} mapExtent={mapExtent} />
      </MapContainer>
    </Container>
  );
};
