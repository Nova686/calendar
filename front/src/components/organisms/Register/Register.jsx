import { useState } from "react";
import { registerUser } from "../../../services/AuthService";
import { UserSaveModel } from "../../../Models/UserModel";
import {
  displayCustomToastError,
  displayDefaultToastError,
} from "../../../services/ToastHelper";
import { AxiosError } from "axios";
import { RegisterForm } from "../../molecules";
import React from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });

  function validatePassword() {
    if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  function validateConfirmPassword() {
    if (confirmPassword !== password) {
      return false;
    } else {
      return true;
    }
  }

  function validateInputsThenSetErrors() {
    const isPasswordCorrect = validatePassword();
    const isConfirmPasswordCorrect = validateConfirmPassword();

    setErrors({
      password: !isPasswordCorrect,
      confirmPassword: !isConfirmPasswordCorrect,
    });

    return isPasswordCorrect && isConfirmPasswordCorrect && username;
  }

  function handleUsernameBlur() {
    setErrors({
      password: errors.password,
      confirmPassword: errors.confirmPassword,
    });
  }

  function handlePasswordBlur() {
    setErrors({
      username: errors.username,
      password: !validatePassword(),
      confirmPassword: errors.confirmPassword,
    });
  }

  function handleConfirmPasswordBlur() {
    setErrors({
      username: errors.username,
      password: errors.password,
      confirmPassword: !validateConfirmPassword(),
    });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!validateInputsThenSetErrors()) {
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(new UserSaveModel(username, password));
      window.location.href = "/";
    } catch (error) {
      if (error instanceof AxiosError) {
        displayCustomToastError(error.response?.data.message);
      } else {
        displayDefaultToastError();
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="register-form">
      <h2>Créer un compte</h2>
      <RegisterForm
        username={username}
        setUsername={setUsername}
        handleUsernameBlur={handleUsernameBlur}
        password={password}
        setPassword={setPassword}
        handlePasswordBlur={handlePasswordBlur}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleConfirmPasswordBlur={handleConfirmPasswordBlur}
        errors={errors}
        isLoading={isLoading}
        handleRegister={handleRegister}
      />
    </div>
  );
};

export default Register;
