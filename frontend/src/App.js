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
import Reports from "./pages/Reports.jsx";
import ReportDetails from "./pages/ReportDetails.jsx";
import Admin from "./pages/Admin.jsx"; 
import ManageUsers from './pages/ManageUsers';
import ManageTests from './pages/ManageTests';
import "./App.css";
import { useSelector ,useDispatch} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={Persistor}>
                <ThemedApp />
            </PersistGate>
        </Provider>
    );
}

function ThemedApp() {
    const theme = useSelector((state) => state.themeReducer.mode);
    return (
        <div style={{ height: "100vh",overflowY:"auto", backgroundColor: theme === "dark" ? "black" : "white" }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/asessment" element={<Asessment />} />
                    <Route path="/instructions" element={<Instructions />} />
                    <Route path="/report" element={<Reports />} />
                    <Route path="/report/:reportId" element={<ReportDetails />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/manageUsers" element={<ManageUsers />} />
                    <Route path="/admin/manageTests" element={<ManageTests />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;