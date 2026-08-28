import { createElement, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    api.post("/users/register", { email, password })
      .then(() => {
        setSuccess("Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((err) => setError(err.response?.data?.message || "Registration failed."));
  }

  return createElement(
    "div",
    { className: "container mt-5", style: { maxWidth: "400px" } },
    createElement("h2", { className: "mb-4" }, "Register"),
    error && createElement("div", { className: "alert alert-danger" }, error),
    success && createElement("div", { className: "alert alert-success" }, success),
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
      createElement(
        "div",
        { className: "mb-3" },
        createElement("label", { className: "form-label" }, "Confirm Password"),
        createElement("input", {
          type: "password", className: "form-control", value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value), required: true
        })
      ),
      createElement("button", { type: "submit", className: "btn btn-primary w-100" }, "Register")
    ),
    createElement(
      "p",
      { className: "mt-3 text-center" },
      "Already have an account? ",
      createElement(Link, { to: "/login" }, "Login here")
    )
  );
}