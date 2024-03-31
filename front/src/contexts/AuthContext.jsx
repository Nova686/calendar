import React, {createContext} from "react";
import {Auth} from "../pages";
import functions from "../functions";

const cookie = functions.getCookie();
const AuthContext = createContext(cookie);

const AuthProvider = ({value, ...props}) => {
    return (
        <AuthContext.Provider value={value}>
            {value.isAuth || (typeof cookie === "string" && cookie.trim() !== "") ? props.children : <Auth/>}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}