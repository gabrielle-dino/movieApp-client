import { createElement, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { UserContext } from "../context/UserContext.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    api.post("/users/login", { email, password })
      .then(({ data }) => {
        login(data.access);
        navigate("/movies");
      })
      .catch((err) => setError(err.response?.data?.message || "Login failed."));
  }

  return createElement(
    "div",
    { className: "container mt-5", style: { maxWidth: "400px" } },
    createElement("h2", { className: "mb-4" }, "Login"),
    error && createElement("div", { className: "alert alert-danger" }, error),
    createElement(
      "form",
      { onSubmit: handleSubmit },
      createElement(
        "div",
        { className: "mb-3" },
        createElement("label", { className: "form-label" }, "Email"),
        createElement("input", {
          type: "email", className: "form-control", value: email,
          onChange: (e) => setEmail(e.target.value), required: true
        })
      ),
      createElement(
        "div",
        { className: "mb-3" },
        createElement("label", { className: "form-label" }, "Password"),
        createElement("input", {
          type: "password", className: "form-control", value: password,
          onChange: (e) => setPassword(e.target.value), required: true
        })
      ),
      createElement("button", { type: "submit", className: "btn btn-primary w-100" }, "Login")
    ),
    createElement(
      "p",
      { className: "mt-3 text-center" },
      "No account? ",
      createElement(Link, { to: "/register" }, "Register here")
    )
  );
}