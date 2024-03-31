import React from "react";
import { InputText } from "../../atoms";
import styles from "./LoginInputs.module.css";

const LoginInputs = ({
  onChangePassword,
  passwordValue,
  onChangeUsername,
  usernameValue,
}) => {
  return (
    <div className={styles["login-inputs"]}>
      <InputText
        onChange={onChangeUsername}
        value={usernameValue}
        placeholder={"Username"}
      />
      <InputText
        onChange={onChangePassword}
        value={passwordValue}
        placeholder={"Mot de passe"}
        type={"password"}
      />
    </div>
  );
};

export default LoginInputs;
