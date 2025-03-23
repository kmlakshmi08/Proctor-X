import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Camera from "./components/Camera.jsx";

function App() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/camera" element={<Camera />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;