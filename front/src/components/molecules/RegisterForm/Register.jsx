import React from "react";
import { InputText, Button } from "../../atoms/";

const RegisterForm = ({
  username,
  setUsername,
  handleUsernameBlur,
  password,
  setPassword,
  handlePasswordBlur,
  confirmPassword,
  setConfirmPassword,
  handleConfirmPasswordBlur,
  errors,
  isLoading,
  handleRegister,
}) => (
  <>
    <InputText
      type="email"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      onBlur={handleUsernameBlur}
      label="username"
    />
    {errors.username && <p className="error">Nom d'utilisateur non valide</p>}

    <InputText
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onBlur={handlePasswordBlur}
      label="Mot de passe"
    />
    {errors.password && (
      <p className="error">
        Le mot de passe doit faire un minimum de 8 caractères
      </p>
    )}

    <InputText
      type="password"
      id="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      onBlur={handleConfirmPasswordBlur}
      label="Confirmation du mot de passe"
    />
    {errors.confirmPassword && (
      <p className="error">Les mots de passes ne correspondent pas.</p>
    )}

    <Button
      disabled={isLoading}
      onClick={handleRegister}
      text={"Créer mon compte"}
    ></Button>
  </>
);

export default RegisterForm;
