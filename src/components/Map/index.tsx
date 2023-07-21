import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";
import { increaseMapZoomBy } from "../../utils/variables";
import { MapMouseCoordinates } from "./MapMouseCoordinates";
import { useMainSelector } from "../../state/main/hooks";
import { selectMap } from "../../state/main/selectors";

const crs = Leaflet.CRS.Simple;

export const Map = () => {
  const map = useMainSelector(selectMap);

  return (
    <Container>
      <MapContainer
        key={map.name}
        crs={crs}
        center={[0, 0]}
        zoom={map.mapOptions.zoom}
        minZoom={map.mapOptions.minZoom}
        maxZoom={map.mapOptions.maxZoom + increaseMapZoomBy}
        style={{ height: "100%", width: "100%" }}
        maxBoundsViscosity={0.8}
        doubleClickZoom={false}
      >
        <TileLayer
          url={`${process.env.PUBLIC_URL}/maps/${map.name.toLowerCase()}/{z}/{y}/{x}.png`}
          tileSize={map.mapOptions.tileSize}
          noWrap
          maxNativeZoom={map.mapOptions.maxZoom}
        />
        <MapMarkers crs={crs} />
        <MapSettings crs={crs} mapExtent={map.mapExtent} />
        <MapMouseCoordinates {...map} />
      </MapContainer>
    </Container>
  );
};
