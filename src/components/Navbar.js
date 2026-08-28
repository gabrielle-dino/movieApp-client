import { createElement, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return createElement(
    "nav",
    { className: "navbar navbar-expand navbar-dark bg-dark px-3" },
    createElement(Link, { className: "navbar-brand", to: "/movies" }, "Movie Catalog"),
    createElement(
      "div",
      { className: "ms-auto" },
      user.id
        ? createElement(
            "div",
            null,
            user.isAdmin &&
              createElement(Link, { className: "btn btn-outline-light btn-sm me-2", to: "/admin" }, "Admin"),
            createElement("button", { className: "btn btn-outline-light btn-sm", onClick: handleLogout }, "Logout")
          )
        : createElement(
            "div",
            null,
            createElement(Link, { className: "btn btn-outline-light btn-sm me-2", to: "/login" }, "Login"),
            createElement(Link, { className: "btn btn-outline-light btn-sm", to: "/register" }, "Register")
          )
    )
  );
}