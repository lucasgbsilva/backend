const usuarioModel = require("../models/usuario.model.js");
const bcrypt = require("bcryptjs");
const config = require("../configs/auth.config.js");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  if (!req.body.email || !req.body.senha || !req.body.type) {
    res.status(400).send({
      message: "E-mail, senha ou type não enviados.",
    });
  } else {
    const usuario = new usuarioModel({
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, 8),
      type: req.body.type,
    });
    usuarioModel.create(usuario, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Ocorreu um erro.",
        });
      } else {
        res.send(data);
      }
    });
  }
};
exports.signIn = (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: " Email não enviado.",
    });
  } else {
    usuarioModel.findByEmail(req.body.email, (err, data) => {
      if (err) {
        if (err == "not_found") {
          res.status(404).send({
            message: "Não foi encontrado usuario com o email digitado.",
          });
        } else {
          res.status(500).send({
            message: "Ocorreu um erro ao buscar email do usuário no sistema.",
          });
        }
      } else {
        let validPassword = bcrypt.compareSync(req.body.senha, data.senha);
        if (!validPassword) {
          res.status(401).send({
            accessToken: null,
            message: "Senha inválida!",
          });
        } else {
          let token = jwt.sign({ id: data.idusuario }, config.secret, {
            expiresIn: 86400,
          }); //24h
          res.status(200).send({
            accessToken: token,
            id: data.idusuario,
            email: data.email,
            type: data.type,
          });
        }
      }
    });
  }
};
exports.findAll = (req, res) => {
  usuarioModel.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu erro desconhecido!",
      });
    } else {
      res.send(data);
    }
  });
};
exports.update = (req, res) => {
  if (!req.body.email || !req.body.senha || !req.body.type) {
    res.status(400).send({
      message: "E-mail, senha ou type não enviados.",
    });
  } else {
    const usuario = new usuarioModel({
      email: req.body.email,
      senha: bcrypt.hashSync(req.body.senha, 8),
      type: req.body.type,
    });
    usuarioModel.updateById(req.params.id, usuario, (err, data) => {
      if (err) {
        if (err.type == "not_found") {
          res.status(404).send({
            message: "Usuário não encontrado.",
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar usuário.",
          });
        }
      } else {
        res.send(data);
      }
    });
  }
};
exports.delete = (req, res) => {
  usuarioModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.type == "not_found") {
        res.status(404).send({ message: "Usuário não encontrado." });
      } else {
        res.status(500).send({ message: "Erro ao deletar usuário." });
      }
    } else {
      res.send({ message: "Usuário deletado com sucesso" });
    }
  });
};
