import React, { createContext, useContext, useEffect, useState } from "react";

type AuthState = "logged_in" | "logged_out";

interface AuthContextProps {
  authStatus: AuthState;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authStatus, setAuthStatus] = useState<AuthState>("logged_out");

  const login = () => {
    setAuthStatus("logged_in");
    localStorage.setItem("hasSignedUp", "true");
  };
  const logout = () => {
    setAuthStatus("logged_out");
    localStorage.removeItem("hasSignedUp");
  };

  useEffect(() => {
    const hasSignedUp = localStorage.getItem("hasSignedUp");
    if (hasSignedUp) setAuthStatus("logged_in");
  }, []);
  return (
    <AuthContext.Provider value={{ authStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
