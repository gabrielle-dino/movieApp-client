import { createElement, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios.js";
import { UserContext } from "../context/UserContext.js";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: "", director: "", year: "", description: "", genre: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function fetchMovies() {
    api.get("/movies/getMovies")
      .then(({ data }) => setMovies(data.movies))
      .catch((err) => setError(err.response?.data?.message || "Failed to load movies."));
  }

  useEffect(() => { fetchMovies(); }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    api.post("/movies/addMovie", { ...form, year: Number(form.year) })
      .then(() => {
        setSuccess("Movie added successfully!");
        setForm({ title: "", director: "", year: "", description: "", genre: "" });
        fetchMovies();
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to add movie."));
  }

  if (user.isAdmin === false) {
    return createElement(Navigate, { to: "/movies", replace: true });
  }

  return createElement(
    "div",
    { className: "container mt-4" },
    createElement("h2", { className: "mb-4" }, "Admin Dashboard"),
    createElement(
      "div",
      { className: "card mb-4" },
      createElement(
        "div",
        { className: "card-body" },
        createElement("h5", { className: "card-title" }, "Add New Movie"),
        error && createElement("div", { className: "alert alert-danger" }, error),
        success && createElement("div", { className: "alert alert-success" }, success),
        createElement(
          "form",
          { onSubmit: handleSubmit, className: "row g-3" },
          createElement("div", { className: "col-md-6" },
            createElement("input", { name: "title", className: "form-control", placeholder: "Title", value: form.title, onChange: handleChange, required: true })),
          createElement("div", { className: "col-md-6" },
            createElement("input", { name: "director", className: "form-control", placeholder: "Director", value: form.director, onChange: handleChange, required: true })),
          createElement("div", { className: "col-md-3" },
            createElement("input", { name: "year", type: "number", className: "form-control", placeholder: "Year", value: form.year, onChange: handleChange, required: true })),
          createElement("div", { className: "col-md-3" },
            createElement("input", { name: "genre", className: "form-control", placeholder: "Genre", value: form.genre, onChange: handleChange, required: true })),
          createElement("div", { className: "col-md-6" },
            createElement("input", { name: "description", className: "form-control", placeholder: "Description", value: form.description, onChange: handleChange, required: true })),
          createElement("div", { className: "col-12" },
            createElement("button", { type: "submit", className: "btn btn-success" }, "Add Movie"))
        )
      )
    ),
    createElement("h5", null, "All Movies"),
    createElement(
      "table",
      { className: "table table-striped" },
      createElement("thead", null,
        createElement("tr", null,
          createElement("th", null, "Title"), createElement("th", null, "Director"),
          createElement("th", null, "Year"), createElement("th", null, "Genre"))),
      createElement(
        "tbody",
        null,
        movies.map((m) =>
          createElement("tr", { key: m._id },
            createElement("td", null, m.title), createElement("td", null, m.director),
            createElement("td", null, m.year), createElement("td", null, m.genre)))
      )
    )
  );
}