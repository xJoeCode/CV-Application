import { apiSlice } from "./features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";



export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware)
})
setupListeners(store.dispatch)

