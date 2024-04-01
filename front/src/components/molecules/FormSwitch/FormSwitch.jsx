import React from "react";
import { Button } from "../../atoms";

const FormSwitch = ({ selectedForm, onSwitchForm }) => (
  <div className="form-switch-auth">
    <Button
      className={selectedForm === "login" ? "active" : ""}
      onClick={() => onSwitchForm("login")}
    >
      Se connecter
    </Button>
    <span className="separator"></span>
    <Button
      className={selectedForm === "register" ? "active" : ""}
      onClick={() => onSwitchForm("register")}
    >
      Créer son compte
    </Button>
  </div>
);

export default FormSwitch;
