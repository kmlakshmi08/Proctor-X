import { configureStore } from "@reduxjs/toolkit";
import captureReducer from "./Reducers/CaptureDetails.js";
import { themeReducer } from "./Reducers/Theme.js";

export const store = configureStore({
    reducer: {
        CaptureReducer: captureReducer,
        ThemeReducer: themeReducer
    }
});