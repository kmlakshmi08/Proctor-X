import React from "react";
import { PersistGate } from "redux-persist/integration/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import Camera from "./pages/Camera.jsx";
import { Persistor, store } from "./reducer.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={Persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/camera" element={<Camera />}></Route>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="/home" element={<Home />}></Route>
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </>
    )
}

export default App;