import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artillery, FireMode, MapInfo, ShellType } from "@/utils/types";
import { mapAltis } from "@/utils/maps";
import { Arty_M109A6 } from "@/utils/artillery";
import { LatLng } from "leaflet";

const defaultArty = Arty_M109A6;
const defaultMap = mapAltis;

interface MainState {
  isTopDown: boolean;
  map: MapInfo;
  artillery: Artillery;
  fireMode: FireMode;
  shell: ShellType;
  heightAdjustment: number;
  targets: LatLng[];
  artilleryPosition: LatLng | undefined;
  isBackendEnabled: boolean;
}

const initState: MainState = {
  isTopDown: false,
  map: defaultMap,
  artillery: defaultArty,
  fireMode: defaultArty.fireModes[0],
  shell: defaultArty.shellTypes[0],
  heightAdjustment: 0,
  targets: [],
  artilleryPosition: undefined,
  isBackendEnabled: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initState,
  reducers: {
    setIsTopDown: (state, action: PayloadAction<boolean>) => {
      state.isTopDown = action.payload;
    },
    setMap: (state, action: PayloadAction<MapInfo>) => {
      state.targets = [];
      state.map = action.payload;
    },
    setArtillery: (state, action: PayloadAction<Artillery>) => {
      state.artillery = action.payload;
      state.fireMode = action.payload.fireModes[0];
      state.shell = action.payload.shellTypes[0];
    },
    setFireMode: (state, action: PayloadAction<FireMode>) => {
      state.fireMode = action.payload;
    },
    setShell: (state, action: PayloadAction<ShellType>) => {
      state.shell = action.payload;
    },
    setHeightAdjustment: (state, action: PayloadAction<number>) => {
      state.heightAdjustment = action.payload;
    },
    setTargets: (state, action: PayloadAction<LatLng[]>) => {
      state.targets = action.payload;
    },
    setIsBackendEnabled: (state, action: PayloadAction<boolean>) => {
      state.isBackendEnabled = action.payload;
    },
    setArtilleryPosition: (state, action: PayloadAction<LatLng | undefined>) => {
      state.artilleryPosition = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsTopDown,
  setMap,
  setArtillery,
  setFireMode,
  setShell,
  setHeightAdjustment,
  setTargets,
  setIsBackendEnabled,
  setArtilleryPosition,
} = mainSlice.actions;

export default mainSlice.reducer;
