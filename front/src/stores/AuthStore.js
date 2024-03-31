import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        auths: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = action.payload.status === 200 ? "succeed" : "error";
                state.auth = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.status = "failed";
            });
    },
});

const login = createAsyncThunk(
    "auth/login",
    async (payload) => {
        const {username, password} = payload;
        const config = {
            url: "http://127.0.0.1:8000/api/login_check",
            method: "post",
            data: {
                "username": username,
                "password": password
            }
        };
        const response = await axios(config)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err.response;
            });

        if (response.status === 200) {
            let responseData = response.data;
            responseData.status = 200;
            return responseData;
        } else {
            return response.data;
        }

    }
);

export {authSlice, login}