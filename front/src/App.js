import React, { useState } from "react";
import styles from "./App.module.css";
import { ThemeProvider } from "styled-components";
import { AuthProvider, NightProvider } from "./contexts";
import { Provider } from "react-redux";
import { store } from "./stores";
import { NightModeSwitch, DateLine, HoursLine } from "./components/molecules";
import { Date } from "./components/atoms";
import { day, night, theme } from "./config";
import functions from "./functions";
// import {FaCarrot, FaLemon, FaPepperHot} from "react-icons/fa";
// import {Menu} from "./components/organisms";
// import {Heading, Section} from "./components/atoms";
// import ToDoList from "./components/organisms/ToDoList/ToDoList";
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import {Auth, Register} from "./pages";
// import AuthRoute from "./components/AuthRoute";
//
// const menuData = [
//     {
//         icon: <FaPepperHot></FaPepperHot>,
//         text: "Chili",
//         value: "chili",
//     },
//     {
//         icon: <FaCarrot></FaCarrot>,
//         text: "Carrot",
//         value: "carrot",
//     },
//     {
//         icon: <FaLemon></FaLemon>,
//         text: "Lemon",
//         value: "lemon",
//     },
// ];

function App() {
    const [page, setPage] = useState("chili");
    const [isAuth, setIsAuth] = useState(false);
    const [isNightMode, setIsNightMode] = useState(false)

    const invert = () => {
        return { ...theme, ...(isNightMode ? day : night) };
    };

    const handlerAuth = (token) => {
        if (typeof token === "string" && token.trim() !== "") {
            setIsAuth(true);
            functions.setCookie(token, 10);
        } else {
            setIsAuth(false);
            functions.deleteCookie()
        }
    }

    const handlerNightMode = () => {
        setIsNightMode(!isNightMode);
    }

    const renderPage = () => {
        switch (page) {
            case "carrot":
                return <div>Carrot</div>
                break;
            case "lemon":
                return <div>Lemon</div>
                break;
            default:
                return <div>Chili</div>
                break;
        }
    }

    const handler = (pageName) => {
        setPage(pageName);
    }

    const hanlderAuth = (isAuth) => {
        setIsAuth(isAuth);
    }

    const dateData = [
        {
            dateDay: "Lun",
            dateNumber: "1"
        },
        {
            dateDay: "Mar",
            dateNumber: "2"
        },
        {
            dateDay: "Mer",
            dateNumber: "3"
        },
        {
            dateDay: "Jeu",
            dateNumber: "4"
        },
        {
            dateDay: "Ven",
            dateNumber: "5"
        },
        {
            dateDay: "Sam",
            dateNumber: "6"
        },
        {
            dateDay: "Dim",
            dateNumber: "7"
        },
    ];

    const dataHours = [
        {
            hourStart: 700,
            hourEnd: 1830,
        },
        {
            hourStart: 800,
            hourEnd: 1900,
        },
        {
            hourStart: 600,
            hourEnd: 1700,
        }
    ]



    return (
        <Provider store={store}>
            <ThemeProvider theme={invert}>
                <NightProvider value={{
                    changeNightMode: () => setIsNightMode(!isNightMode),
                    nightMode: isNightMode
                }}>
                    <NightModeSwitch className={styles.NightSwitch} handler={handlerNightMode} />
                    <DateLine data={dateData} ></DateLine>
                    <HoursLine dataHours={dataHours}></HoursLine>
                    <AuthProvider value={{
                        isAuth: isAuth,
                        setAuth: (auth) => handlerAuth(auth)
                    }}>
                        Bonjour
                    </AuthProvider>

                    {/*<Menu data={menuData} handler={handler} hanlderAuth={hanlderAuth} isAuth={isAuth}/>*/}
                    {/*<ToDoList data={""}/>*/}
                    {/*{renderPage()}*/}
                </NightProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;