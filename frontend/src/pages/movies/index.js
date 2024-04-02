import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { MovieContainer } from "./style";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await api.get("/movies");
      setMovies(response.data);
    }
    getData();
  }, []);
  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute("display", "block");
    e.currentTarget.remove();
  };
  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      let response = await api.delete(`/movies/${id}`);
      const novosMovies = [...movies];
      novosMovies.splice(index, 1);
      setMovies(novosMovies);
    } catch (err) {
      setError(
        "Houve um problema ao excluir os dados: " + err.response.data.message
      );
    }
  };
  return (
    <div>
      <Navbar />
      <h1>Listagem de Filmes</h1>
      {error && <p>{error}</p>}
      <MovieContainer>
        <div>
          <span>ID</span>
          <span>Nome</span>
          <span>Valor</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>
        {movies.map((movie, index) => (
          <div key={String(movie.idmovie)}>
            <span>{movie.idmovie}</span>
            <span>{movie.name}</span>
            <span>{movie.acceptableNames}</span>
            <span>{movie.emoji}</span>
            <span>{movie.tipo}</span>
            <Link to={`/movies/${movie.idmovie}`}>
              <FaEdit size={16} />
            </Link>
            <Link
              onClick={handleDeleteAsk}
              to={`/movies/${movie.idmovie}`}
            >
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, movie.idmovie, index)}
            />
          </div>
        ))}
      </MovieContainer>
    </div>
  );
};
export default Movies;
