import { createSelector } from "@reduxjs/toolkit";
import { MainState } from "..";

export const selectDomain = (state: MainState) => state.main;

export const selectTopDown = createSelector(selectDomain, (main) => main.isTopDown);
