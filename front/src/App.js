import React, { useState } from "react";
import styles from "./App.module.css";
import Auth from "./pages/Auth/Auth"
import { useRoutes } from "react-router-dom";
import Landing from "./pages/landing/landing"
import { ThemeProvider } from "styled-components";
import { AuthProvider, NightProvider } from "./contexts";
import { Provider } from "react-redux";
import { store } from "./stores";
import { NightModeSwitch } from "./components/molecules";
import { Date } from "./components/atoms";
import { day, night, theme } from "./config";
import functions from "./functions";

const AppRoutes = () => {
    const routing = useRoutes([
        { path: "/login", element: <Auth /> },
        { path: "/", element: <Landing /> },
    ]);

    return <>{routing}</>;
}

const App = () => {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    )
}

export default App;