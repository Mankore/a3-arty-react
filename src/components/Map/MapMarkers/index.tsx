import { DragEndEventHandlerFn } from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvents, Marker, Popup, Circle, useMap, Polyline } from "react-leaflet";
import { iconTarget, iconTrigger } from "../MapIcons";
import { createArtilleryMarker, createTargetMarker, createTriggerMarker } from "./createMarker";
import { IMapMarkers, IMarkerInfo } from "./types";

// TODO: adjust trigger icon size programmaticaly to represent 500m radius circle (depends on map)
export const MapMarkers = ({
  crs,
  artillery,
  shell,
  fireMode,
  currentMap,
  topDown,
}: IMapMarkers) => {
  const [targets, setTargets] = useState<IMarkerInfo[]>([]);
  const [artilleryPosition, setArtilleryPosition] = useState<IMarkerInfo>();
  const [triggerPosition, setTriggerPosition] = useState<IMarkerInfo>();

  const cleanupMarkers = () => {
    setArtilleryPosition(undefined);
    setTargets([]);
    setTriggerPosition(undefined);
  };

  useEffect(() => {
    cleanupMarkers();
  }, [currentMap]);

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const event = e.originalEvent;

      event.shiftKey && createArtilleryMarker(latlng, currentMap, setArtilleryPosition);

      event.ctrlKey &&
        artilleryPosition &&
        createTargetMarker(
          latlng,
          currentMap,
          artilleryPosition,
          fireMode,
          shell,
          artillery,
          topDown,
          setTargets
        );

      event.altKey && createTriggerMarker(latlng, setTriggerPosition);
    },
  });

  return (
    <>
      {targets.map((marker, idx) => (
        <TargetMarker
          key={idx}
          artilleryPosition={artilleryPosition!}
          markerPosition={marker}
          setTargets={setTargets}
          onDragEnd={(event) => {
            createTargetMarker(
              event.target._latlng,
              currentMap,
              artilleryPosition!,
              fireMode,
              shell,
              artillery,
              topDown,
              setTargets,
              idx
            );
          }}
        />
      ))}
      {artilleryPosition && (
        <Marker
          position={artilleryPosition.latlng}
          draggable
          eventHandlers={{
            dragend: (e) =>
              createArtilleryMarker(e.target._latlng, currentMap, setArtilleryPosition),
          }}
        >
          <Popup>{artilleryPosition.popupContent}</Popup>
        </Marker>
      )}
      {triggerPosition && (
        <Marker position={triggerPosition.latlng} icon={iconTrigger}>
          <Popup>{triggerPosition.popupContent}</Popup>
        </Marker>
      )}
    </>
  );
};

interface ITargetMarker {
  artilleryPosition: IMarkerInfo;
  markerPosition: IMarkerInfo;
  setTargets: (value: React.SetStateAction<IMarkerInfo[]>) => void;
  onDragEnd: DragEndEventHandlerFn | undefined;
}

const TargetMarker = ({
  artilleryPosition,
  markerPosition,
  onDragEnd,
  setTargets,
}: ITargetMarker) => {
  const [isHovered, setIsHovered] = useState(false);
  const map = useMap();
  const minZoom = map.getMinZoom();
  const point1 = map.project(artilleryPosition!.latlng, minZoom);
  const point2 = map.project(markerPosition.latlng, minZoom);
  const dist = point1.distanceTo(point2);

  return (
    <>
      <Marker
        position={markerPosition.latlng}
        icon={iconTarget}
        draggable
        eventHandlers={{
          mouseover: (event) => {
            event.target.openPopup();
            setIsHovered(true);
          },
          mouseout: (event) => {
            event.target.closePopup();
            setIsHovered(false);
          },
          keydown: (event) => {
            if (event.originalEvent.key === "Delete")
              setTargets((prevState) => {
                return prevState.filter((item) => item.latlng !== markerPosition.latlng);
              });
          },
          dragend: onDragEnd,
        }}
      >
        <Popup>{markerPosition.popupContent}</Popup>
        {isHovered && (
          <>
            <Circle
              center={artilleryPosition!.latlng}
              radius={dist}
              pathOptions={{ fillColor: "none" }}
            />
            <Polyline positions={[artilleryPosition.latlng, markerPosition.latlng]} />
          </>
        )}
      </Marker>
    </>
  );
};
