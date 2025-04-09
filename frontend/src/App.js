import React from "react";
import { PersistGate } from "redux-persist/integration/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { Persistor, store } from "./reducer.js";
import Home from "./pages/Home.jsx";
import Tests from "./pages/Tests.jsx";
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx"
import Asessment from "./pages/Asessment.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Instructions from "./global_components/Instructions.jsx";


import "./App.css"
function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={Persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Signup />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/tests" element={<Tests />}></Route>
                            <Route path="/home" element={<Home />}></Route>
                            <Route path="/profile" element={<Profile />}></Route>
                            <Route path="/asessment" element={<Asessment />}></Route>
                            <Route path="/instructions" element={<Instructions />}></Route>
                            <Route path="*" element={<PageNotFound />}></Route>
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </>
    )
}

export default App;