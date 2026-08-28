import { createElement, useContext, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Movies from "./pages/Movies.js";
import MovieView from "./pages/MovieView.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import { UserContext } from "./context/UserContext.js";

export default function App() {
  const { user } = useContext(UserContext);

  return createElement(
    Fragment,
    null,
    createElement(Navbar),
    createElement(
      Routes,
      null,
      createElement(Route, { path: "/", element: createElement(Navigate, { to: "/movies", replace: true }) }),
      createElement(Route, { path: "/login", element: createElement(Login) }),
      createElement(Route, { path: "/register", element: createElement(Register) }),
      createElement(Route, { path: "/movies", element: createElement(Movies) }),
      createElement(Route, { path: "/movies/:id", element: createElement(MovieView) }),
      createElement(Route, {
        path: "/admin",
        element: user.id ? createElement(AdminDashboard) : createElement(Navigate, { to: "/login", replace: true })
      })
    )
  );
}