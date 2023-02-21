import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container } from "./styles";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";
import { Artillery, FireMode, MapInfo, ShellType } from "../../utils/types";
import { increaseMapZoomBy } from "../../utils/variables";
import { MapMouseCoordinates } from "./MapMouseCoordinates";

const crs = Leaflet.CRS.Simple;

interface IMap {
  artillery: Artillery;
  shell: ShellType;
  fireMode: FireMode;
  map: MapInfo;
  topDown: boolean;
  heightAdjustment: number;
}

export const Map = ({ artillery, shell, fireMode, map, topDown, heightAdjustment }: IMap) => {
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
          url={`${process.env.PUBLIC_URL}/maps/${map.name}/{z}/{y}/{x}.png`}
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
          heightAdjustment={heightAdjustment}
        />
        <MapSettings crs={crs} mapExtent={map.mapExtent} />
        <MapMouseCoordinates {...map} />
      </MapContainer>
    </Container>
  );
};
