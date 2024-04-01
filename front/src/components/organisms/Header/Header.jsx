import React from "react";
import { AuthLink, LandingLink } from "../../molecules";
import { disconnectUser } from "../../../services/AuthService";
import { useAuth } from "../../../contexts/AuthContext";

const Header = () => {
  const { setIsAuthenticated } = useAuth();

  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <LandingLink />
      <AuthLink
        onLogout={() => {
          disconnectUser(setIsAuthenticated);
        }}
      />
    </header>
  );
};

export default Header;
