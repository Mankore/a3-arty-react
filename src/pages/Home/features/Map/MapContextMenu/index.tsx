import { useMainDispatch, useMainSelector } from "@/state/hooks";
import { setArtilleryPosition, setTargets } from "@/state/main";
import { selectArtilleryPosition, selectTargets } from "@/state/main/selectors";
import { LatLng } from "leaflet";
import { PropsWithChildren, useState } from "react";
import { useMapEvents } from "react-leaflet";

type AnchorPoint = {
  x: number;
  y: number;
};

export const MapContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState<AnchorPoint>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [latlng, setLatlng] = useState<LatLng>();
  const targets = useMainSelector(selectTargets);
  const artilleryPosition = useMainSelector(selectArtilleryPosition);
  const dispatch = useMainDispatch();

  useMapEvents({
    click() {
      setTimeout(() => {
        setIsVisible(false);
      });
    },
    contextmenu(e) {
      e.originalEvent.preventDefault();
      setLatlng(e.latlng);
      setAnchorPoint({ x: e.originalEvent.layerX, y: e.originalEvent.layerY });
      setIsVisible(true);
    },
  });

  if (!isVisible) return null;

  return (
    <div
      className="absolute z-[1020] cursor-pointer rounded-lg bg-white p-1 shadow-lg dark:bg-zinc-950"
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
    >
      <ul className="grid gap-1 text-zinc-950 dark:text-white">
        <ContextMenuItem
          onClick={() => {
            dispatch(setArtilleryPosition(latlng));
            setIsVisible(false);
          }}
        >
          Set Artillery Position
        </ContextMenuItem>
        <ContextMenuItem
          disabled={!artilleryPosition}
          onClick={() => {
            if (latlng && artilleryPosition)
              dispatch(setTargets([...targets, latlng]));
            setIsVisible(false);
          }}
        >
          Set Target Position
        </ContextMenuItem>
      </ul>
    </div>
  );
};

interface ContextMenuItemProps extends PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
}

const ContextMenuItem = ({
  children,
  onClick,
  disabled,
}: ContextMenuItemProps) => {
  return (
    <li
      role="menuitem"
      className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${disabled && "opacity-50"}`}
      >
        {children}
      </button>
    </li>
  );
};
