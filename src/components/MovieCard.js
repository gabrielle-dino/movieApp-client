import { createElement } from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return createElement(
    "div",
    { className: "col-md-4 mb-4" },
    createElement(
      "div",
      { className: "card h-100 shadow-sm" },
      createElement(
        "div",
        { className: "card-body" },
        createElement("h5", { className: "card-title" }, movie.title),
        createElement("h6", { className: "card-subtitle mb-2 text-muted" }, `${movie.director} (${movie.year})`),
        createElement("p", { className: "card-text" }, movie.genre),
        createElement(Link, { to: `/movies/${movie._id}`, className: "btn btn-outline-primary" }, "View Movie")
      )
    )
  );
}