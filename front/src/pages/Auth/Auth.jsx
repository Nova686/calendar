import React, {useState} from "react";
import {Heading} from "../../components/atoms";
import styles from "./Auth.module.css"
import {Login} from "../../components/organisms";

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true)

    return (
        <div>
            <Heading className={styles["title"]}>
                <span onClick={() => {setIsLoginPage(true)}}>Connexion</span>
                <span> | </span>
                <span onClick={() => {setIsLoginPage(false)}}>Inscription</span>
            </Heading>
            {isLoginPage
                ? (<Login/>)
                : (<>Register ici</>)
            }
        </div>
    )
}

export default Auth