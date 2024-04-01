import React from "react";
import { InputText, Button } from "../../atoms";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  isLoading,
  handleLogin,
}) => (
  <>
    <div className="input-group">
      <InputText
        type="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="username"
      />
      <InputText
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Mot de passe"
      />
      <Button
        disabled={isLoading}
        onClick={handleLogin}
        text={"Se connecter"}
      ></Button>
    </div>
  </>
);

export default LoginForm;
