import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
const Movie = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [acceptabeNames, setAcceptableNames] = useState("");
  const [emoji, setEmoji] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        const { data } = await api.get(`/movies/${id}`); // Correção aqui: mudar para GET
        setName(data.name);
        setAcceptableNames(data.acceptableNames);
        setEmoji(data.emoji);
        setTipo(data.tipo);
      } catch (err) {
        setError("Houve um problema ao carregar os dados do filme: " + err.response.data.message);
      }
    }
    getData();
  }, [id]);
  
  const handleMovie = async (e) => {
    e.preventDefault();
    if (!name || !acceptabeNames || !emoji || !tipo) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        if (!id) {
          await api.post("/movies", { name, acceptabeNames, emoji, tipo });
        } else {
          await api.put(`/movies/${id}`, { name, acceptabeNames, emoji, tipo });
        }
        navigate(-1);
      } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao cadastra movie.");
      }
    }
  };
  const handleCancel = () => {
    navigate(-1); // Navega para a página anterior
  };
  return (
    <Container>
      <Form onSubmit={handleMovie}>
        {error && <p>{error}</p>}
        <img src={Logo} alt="logo_senac" />
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={acceptabeNames}
          type="text"
          placeholder="acceptableNames"
          onChange={(e) => setAcceptableNames(e.target.value)}
        />
        <input
          value={emoji}
          type="text"
          placeholder="emoji"
          onChange={(e) => setEmoji(e.target.value)}
        />
        <input
          value={tipo}
          type="text"
          placeholder="tipo"
          onChange={(e) => setTipo(e.target.value)}
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </Form>
    </Container>
  );
};
export default Movie;
