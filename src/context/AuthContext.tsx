import React, { createContext, useContext, useState } from "react";

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

  const login = () => setAuthStatus("logged_in");
  const logout = () => setAuthStatus("logged_out");

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
