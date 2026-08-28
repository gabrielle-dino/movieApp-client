import { createElement, useState, useEffect } from "react";
import api from "../api/axios.js";
import MovieCard from "../components/MovieCard.js";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/movies/getMovies")
      .then(({ data }) => setMovies(data.movies))
      .catch((err) => setError(err.response?.data?.message || "Failed to load movies."));
  }, []);

  return createElement(
    "div",
    { className: "container mt-4" },
    createElement("h2", { className: "mb-4" }, "Movie Catalog"),
    error && createElement("div", { className: "alert alert-danger" }, error),
    createElement(
      "div",
      { className: "row" },
      movies.map((movie) => createElement(MovieCard, { key: movie._id, movie }))
    )
  );
}