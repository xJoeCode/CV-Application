import { apiSlice } from "./features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware)
})

