const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const usuarioModel = require("../models/usuario.model");

verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({
      message: "Não possui token para autentificação",
    });
  } else {
    const [, token] = authorization.split(" ");
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Acesso não autorizado. Credencial inválida",
        });
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
};
isAdmin = (req, res, next) => {
  usuarioModel.findById(req.id, (err, data) => {
    if (data.type == 1) {
      next();
    } else {
      res.status(403).send({
        message: "Você precisa ser administrador para executar a ação!",
      });
    }
  });
};
isAdmin = (req, res, next) => {
  usuarioModel.findById(req.id, (err, data) => {
    if (data.type == 1 || data.type == 2) {
      next();
    } else {
      res.status(403).send({
        message:
          "Você precisa ser do administrador para executar a ação!",
      });
    }
  });
};
isAdmin = (req, res, next) => {
  usuarioModel.findById(req.id, (err, data) => {
    if (data.type == 1 || data.type == 3) {
      next();
    } else {
      res.status(403).send({
        message: "Você precisa ser da administrador para executar a ação!",
      });
    }
  });
};
module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
