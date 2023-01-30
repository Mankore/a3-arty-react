import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";
import { Artillery, FireMode, MapProps, ShellType } from "../../utils/types";

const crs = Leaflet.CRS.Simple;

interface IMap {
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  map: MapProps;
  topDown: boolean;
}

export const Map = ({ artillery, shell, fireMode, map, topDown }: IMap) => {
  return (
    <Container>
      <MapContainer
        crs={crs}
        center={[0, 0]}
        zoom={map.mapOptions.zoom}
        minZoom={map.mapOptions.minZoom}
        maxZoom={map.mapOptions.maxZoom}
        style={{ height: "100%", width: "100%" }}
        maxBoundsViscosity={1}
        doubleClickZoom={false}
      >
        <TileLayer
          url={`/maps/${map.name}/{z}/{x}/{y}.png`}
          tileSize={map.mapOptions.tileSize}
          noWrap
          maxNativeZoom={map.mapOptions.maxZoom}
        />
        <MapMarkers
          crs={crs}
          currentMap={map}
          artillery={artillery}
          shell={shell}
          fireMode={fireMode}
          topDown={topDown}
        />
        <MapSettings crs={crs} mapExtent={map.mapExtent} />
      </MapContainer>
    </Container>
  );
};
