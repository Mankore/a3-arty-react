import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MainState, MainDispatch } from "..";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => MainDispatch;
export const useMainDispatch: DispatchFunc = useDispatch;
export const useMainSelector: TypedUseSelectorHook<MainState> = useSelector;
