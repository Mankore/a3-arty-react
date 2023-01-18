import Leaflet from "leaflet";
import { Container } from "./styles";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MapSettings } from "./MapSettings";

const crs = Leaflet.CRS.Simple;

function ClickLog() {
  const map = useMap();
  const maxZoom = map.getMaxZoom();

  useMapEvents({
    click(e) {
      const point = crs.latLngToPoint(e.latlng, maxZoom);
      console.log(point);
      console.log(e.latlng);
      console.log("----");
    },
  });
  return <></>;
}

export const Map = () => {
  return (
    <Container>
      <MapContainer
        crs={crs}
        center={[0, 0]}
        zoom={0}
        minZoom={0}
        maxZoom={6}
        style={{ height: "100%", width: "100%" }}
        maxBoundsViscosity={1}
      >
        <TileLayer url="/maps/cherno/{z}/{x}/{y}.png" tileSize={128} noWrap />
        <ClickLog />
        <MapSettings />
      </MapContainer>
    </Container>
  );
};
