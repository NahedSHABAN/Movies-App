import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./slices/favoriteSlice"

export const store = configureStore({
    reducer:{
        favorites: favoriteSlice,
    }
})