import Leaflet from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapSettings } from "./MapSettings";
import { MapMarkers } from "./MapMarkers";
import { MapMouseCoordinates } from "./MapMouseCoordinates";
import { MapButtons } from "./MapButtons";
import { useMainSelector } from "@/state/hooks";
import { increaseMapZoomBy } from "@/shared/utils/variables";
import { selectMap } from "@/state/main/selectors";
import { MapContextMenu } from "./MapContextMenu";

const crs = Leaflet.CRS.Simple;

export const Map = () => {
  const map = useMainSelector(selectMap);

  return (
    <div className="relative h-full w-full">
      <MapButtons />
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
          url={`${import.meta.env.BASE_URL}maps/${map.name.toLowerCase()}/{z}/{y}/{x}.png`}
          tileSize={map.mapOptions.tileSize}
          noWrap
          maxNativeZoom={map.mapOptions.maxZoom}
        />
        <MapMarkers />
        <MapSettings crs={crs} mapExtent={map.mapExtent} />
        <MapMouseCoordinates {...map} />
        <MapContextMenu />
      </MapContainer>
    </div>
  );
};
