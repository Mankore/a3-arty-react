import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    main: mainReducer,
  },
});

export type MainState = ReturnType<typeof store.getState>;
export type MainDispatch = typeof store.dispatch;
