import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";
import Produto from "./pages/movie";
const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const LogOutPage = () => <Logout />;
const UsuariosPage = () => <Usuarios />;
const ProdutosPage = () => <Produtos />;
const ProdutoPage = () => <Produto />;
const NotFoundPage = () => <h1>Página não encontrada.</h1>;
const AppPage = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <MainPage />;
};
const Rotas = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/logout" element={<LogOutPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="/usuarios/:id" element={<SignUpPage />} />
      <Route path="/produtos" element={<ProdutosPage />} />
      <Route path="/produto" element={<ProdutoPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
export default Rotas;
