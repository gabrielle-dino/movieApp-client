import { createElement, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";

export default function MovieView() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/movies/getMovie/${id}`)
      .then(({ data }) => setMovie(data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load movie."));
  }, [id]);

  if (error) {
    return createElement("div", { className: "container mt-4" },
      createElement("div", { className: "alert alert-danger" }, error));
  }
  if (!movie) {
    return createElement("div", { className: "container mt-4" }, "Loading...");
  }

  return createElement(
    "div",
    { className: "container mt-4" },
    createElement(Link, { to: "/movies", className: "btn btn-link mb-3" }, "← Back to Catalog"),
    createElement(
      "div",
      { className: "card" },
      createElement(
        "div",
        { className: "card-body" },
        createElement("h3", { className: "card-title" }, movie.title),
        createElement("h6", { className: "card-subtitle mb-2 text-muted" }, `${movie.director} · ${movie.year}`),
        createElement("p", { className: "card-text" }, createElement("strong", null, "Genre: "), movie.genre),
        createElement("p", { className: "card-text" }, movie.description),
        createElement("hr"),
        createElement("h5", null, "Comments"),
        movie.comments && movie.comments.length
          ? createElement(
              "ul",
              { className: "list-group" },
              movie.comments.map((c) => createElement("li", { key: c._id, className: "list-group-item" }, c.comment))
            )
          : createElement("p", { className: "text-muted" }, "No comments yet.")
      )
    )
  );
}