import { createSelector } from "@reduxjs/toolkit";
import { MainState } from "..";

const selectDomain = (state: MainState) => state.main;

export const selectTopDown = createSelector(
  selectDomain,
  (main) => main.isTopDown,
);

export const selectMap = createSelector(selectDomain, (main) => main.map);

export const selectArtillery = createSelector(
  selectDomain,
  (main) => main.artillery,
);

export const selectFireMode = createSelector(
  selectDomain,
  (main) => main.fireMode,
);

export const selectShell = createSelector(selectDomain, (main) => main.shell);

export const selectHeightAdjustment = createSelector(
  selectDomain,
  (main) => main.heightAdjustment,
);

export const selectTargets = createSelector(
  selectDomain,
  (main) => main.targets,
);
