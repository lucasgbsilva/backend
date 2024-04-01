import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaWindowClose, FaExclamation } from "react-icons/fa";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { UsuarioContainer } from "../Usuarios/style";
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
    let response = "";
    try {
      response = await api.delete(`/movies/${id}`);
      const novosMovies = [...movies];
      novosMovies.splice(index, 1);
      setMovies(novosMovies);
    } catch (err) {
      setError("Houve um problema ao excluir os dados: " + response);
    }
  };
  return (
    <div>
      <Navbar />
      <h1>Listagem de Movies</h1>
      {error && <p>{error}</p>}
      <UsuarioContainer>
        <div>
          <span>ID</span>
          <span>Nome</span>
          <span>Preço</span>
          <span>Editar</span>
          <span>Excluir</span>
        </div>
        {movies.map((movie, index) => (
          <div key={String(movie.idmovie)}>
            <span>{movie.idmovie}</span>
            <span>{movie.nome}</span>
            <span>{`R$ ${movie.valor.toFixed(2)}`}</span>
            <Link to={`/movie/${movie.idmovie}`}>
              <FaEdit size={16} />
            </Link>
            <Link
              onClick={handleDeleteAsk}
              to={`/movie/${movie.idmovie}`}
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
      </UsuarioContainer>
    </div>
  );
};
export default Movies;
 