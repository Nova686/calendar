import React, { useState } from "react";
import { Heading } from "../../components/atoms";
import { Login, Register } from "../../components/organisms";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

const Auth = () => {
  const [selectedForm, setSelectedForm] =
    (useState < "login") | ("register" > "login");

  function handleSwitchForm(formType) {
    setSelectedForm(formType);
  }
  return (
    <div className="auth-container">
      <div className="return-link">
        <Link to="/" className="return-arrow">
          <i className="bi bi-arrow-left me-2"></i>
          Retour à l'accueil
        </Link>
      </div>
      <div className="form-switch-auth">
        <button
          className={`btn ${selectedForm === "login" ? "active" : ""}`}
          onClick={() => handleSwitchForm("login")}
        >
          Se connecter
        </button>
        <span className="separator"></span>
        <button
          className={`btn ${selectedForm === "register" ? "active" : ""}`}
          onClick={() => handleSwitchForm("register")}
        >
          Créer son compte
        </button>
      </div>
      {selectedForm === "login" && <Login />}
      {selectedForm === "register" && <Register />}
    </div>
  );
};

export default Auth;
