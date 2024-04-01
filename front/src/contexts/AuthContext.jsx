import React, { createContext, useContext, useState, useEffect } from "react";
import { isUserAuthenticated } from "../services/AuthService";

export const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const result = isUserAuthenticated();
      setIsAuthenticated(result);
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  }, []);

  const value = { isAuthenticated, setIsAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
