import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { myAPI } from "./services/api";

export const store = configureStore({
  reducer: {
    [myAPI.reducerPath]: myAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myAPI.middleware),
});
