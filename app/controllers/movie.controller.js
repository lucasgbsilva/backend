const MovieModel = require("../models/movie.model");

exports.create = (req, res) => {
    if (!req.body.name || !req.body.acceptableNames || !req.body.emoji || !req.body.type) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const movie = new MovieModel({
            name: req.body.name,
            acceptableNames: req.body.acceptableNames,
            emoji: req.body.emoji,
            type: req.body.type
        });
        MovieModel.create(movie, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro"
                });
            } else {
                res.send(data);
            }
        })
    }
}

exports.findAll = (req, res) => {
    MovieModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu um erro"
            });
        } else {
            res.send(data);
        }
    })
}

exports.findById = (req, res) => {
    MovieModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Filme não encontrado. ID: " + req.params.id
                });
            } else {
                res.status(500).send({
                    message: "Erro ao retornar o filme com ID: " +
                        req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
}

exports.update = (req, res) => {
    if (!req.body.name || !req.body.acceptableNames || !req.body.emoji) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const movie = new MovieModel({
            name: req.body.name,
            acceptableNames: req.body.acceptableNames,
            emoji: req.body.emoji
        });
        MovieModel.updateById(req.params.id, movie, (err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(404).send({
                        message: "Filme não encontrado."
                    })
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar filme."
                    })
                }
            } else {
                res.send(data);
            }
        });
    }
}

exports.delete = (req, res) => {
    MovieModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "Filme não encontrado."
                })
            } else {
                res.status(500).send({
                    message: "Erro ao deletar filme."
                })
            }
        } else {
            res.send({ message: "Filme deletado com sucesso" });
        }
    })
}



