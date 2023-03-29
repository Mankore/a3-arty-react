import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainState {
  isTopDown: boolean;
  map: string;
}

const initState: MainState = {
  isTopDown: false,
  map: "Altis",
};

export const mainSlice = createSlice({
  name: "main",
  initialState: initState,
  reducers: {
    setIsTopDown: (state, action: PayloadAction<boolean>) => {
      state.isTopDown = action.payload;
    },
    changeMap: (state, action: PayloadAction<string>) => {
      state.map = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsTopDown } = mainSlice.actions;

export default mainSlice.reducer;
