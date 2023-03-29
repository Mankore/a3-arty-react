import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type MainState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type MainDispatch = typeof store.dispatch;
