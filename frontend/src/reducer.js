import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import captureReducer from "./store/Reducers/CaptureDetails"
import { themeReducer } from "./store/Reducers/Theme"
import { persistReducer,persistStore } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit"

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['globalPersistReducer']
}

const rootReducer = combineReducers({
    captureReducer: captureReducer,
    themeReducer: themeReducer
})

const persistreducer = persistReducer(rootPersistConfig,rootReducer);

export const store = configureStore({
    reducer: persistreducer
})

export const Persistor = persistStore(store)