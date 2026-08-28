import { createContext, createElement, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, isAdmin: decoded.isAdmin });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  function login(token) {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id, isAdmin: decoded.isAdmin });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser({ id: null, isAdmin: null });
  }

  return createElement(
    UserContext.Provider,
    { value: { user, login, logout } },
    children
  );
}