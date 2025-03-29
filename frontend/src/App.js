import React from "react";
import { PersistGate } from "redux-persist/integration/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import Camera from "./pages/Camera.jsx";
import { Persistor, store } from "./reducer.js";
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={Persistor}>
                    <BrowserRouter>
                    <Navbar/>
                        <Routes>
                            <Route path="/camera" element={<Camera />}></Route>
                            <Route path="/" element={<Home />}></Route>
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </>
    )
}

export default App;