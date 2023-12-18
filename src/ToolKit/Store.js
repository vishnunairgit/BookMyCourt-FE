import { configureStore } from "@reduxjs/toolkit";
import useSlice from "./userSlic";

export const store = configureStore({
  reducer: {
    user: useSlice,
    
  },
});
