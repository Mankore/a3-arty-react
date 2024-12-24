import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main";

// TODO: Redux doesnt like classes in state (getBaseProjectileSpawnPoint: Vector), review later
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    main: mainReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type MainState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type MainDispatch = typeof store.dispatch;
