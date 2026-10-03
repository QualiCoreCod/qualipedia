
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const isAppReady = true;
  const isAuthenticated = false;
  const user = null;
  const loginWithProvider = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ isAppReady, isAuthenticated, user, loginWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
