import { configureStore } from "@reduxjs/toolkit";
import useSlice from "./userSlic";
import courtSlice from "./courtSlic";

export const store = configureStore({
  reducer: {
    user: useSlice,
    court: courtSlice,
  },
});
