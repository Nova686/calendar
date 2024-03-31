import {LoginInputs} from "../../molecules";
import styles from "./Login.module.css";
import {Button} from "../../atoms";
import React, {useContext, useEffect, useState} from "react";
import {login} from "../../../stores";
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../contexts";

const Login = () => {
    const dispatch = useDispatch();
    const apiReturn = useSelector((state) => {
        return state.auth;
    });
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [sendForm, setSendForm] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (username.trim() !== "" && password.trim() !== "") {
            dispatch(login({"username": username, "password": password}));
        }

    }, [dispatch, sendForm]);

    useEffect(() => {
        if (apiReturn.status === "succeed") {
            authContext.setAuth(apiReturn.auth.token);
        } else if (apiReturn.status === "error") {
            setError(apiReturn.auth.message)
        }
    }, [apiReturn, authContext, error]);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlerLogin = () => {
        setSendForm(!sendForm);
    }

    return (
        <>
            <LoginInputs onChangeUsername={handleUsername} usernameValue={username}
                         onChangePassword={handlePassword} passwordValue={password}/>
            <div className={styles["login-error"]}>
                {error}
                <Button text={"Connexion"} onClick={handlerLogin} className={styles["login-button"]}/>
            </div>
        </>
    )
}

export default Login;