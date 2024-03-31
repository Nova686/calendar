import { configureStore } from "@reduxjs/toolkit";
import {authSlice, login} from "./AuthStore";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export {store, login}