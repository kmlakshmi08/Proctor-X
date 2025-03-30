import React from "react";
import { PersistGate } from "redux-persist/integration/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import Camera from "./pages/Camera.jsx";
import { Persistor, store } from "./reducer.js";
import Home from "./pages/Home.jsx";
import Tests from "./pages/Tests.jsx";
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx";
import Navbar from "./pages/Navbar.jsx";
import "./App.css"
function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={Persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/camera" element={<Camera />}></Route>
                            <Route path="/" element={<Signup />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/tests" element={<Tests />}></Route>
                            <Route path="/home" element={<Home />}></Route>
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </>
    )
}

export default App;