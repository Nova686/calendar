import React from "react";
import { LinkTemplate, Button } from "../../atoms";
import { useAuth } from "../../../contexts/AuthContext";

const AuthLink = ({ onLogout }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <Button className="logout" onClick={onLogout}>
          Déconnexion
        </Button>
      ) : (
        <LinkTemplate to="/login">Connexion</LinkTemplate>
      )}
    </div>
  );
};

export default AuthLink;
