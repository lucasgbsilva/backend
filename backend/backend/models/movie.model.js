const sql = require("../configs/db");

// construtor
const MovieModel = function (movie) {
  this.name = movie.name;
  this.acceptableNames = movie.acceptableNames;
  this.emoji = movie.emoji;
  this.tipo = movie.tipo;

};

MovieModel.create = (movie, result) => {
  sql.query("INSERT INTO movies SET ?", movie, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }
    console.log("Movie criado: ", { idmovie: res.insertid, ...movie });
    result(null, { idmovie: res.insertid, ...movie });
  });
};

MovieModel.getAll = (result) => {
  sql.query("SELECT * FROM movies", (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(null, err);
      return;
    }
    console.log("movies: ", res);
    result(null, res);
  });
};

MovieModel.findById = (id, result) => {
  sql.query("SELECT * FROM movies WHERE idmovie = " + id, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log("movie Encontrado: ", res[0]);
      result(null, res[0]);
    } else {
      result({ type: "not_found" }, null);
      console.log("movie não encontrado");
    }
  });
};

MovieModel.updateById = (id, movie, result) => {
  sql.query(
    "UPDATE movies SET name = ?, acceptableNames = ?, emoji = ?, tipo = ? WHERE idmovie = ? ",
    [movie.name, movie.acceptableNames, movie.emoji, movie.tipo, id],
    (err, res) => {
      if (err) {
        console.log("erro: ", err);
        result(null, err);
      } else if (res.affectedRows == 0) {
        result({ type: "not_found" }, null);
      } else {
        console.log("Filme atualizado: ", {
          idmovie: id,
          ...movie,
        });
        result(null, { idmovie: id, ...movie });
      }
    }
  );
};

MovieModel.remove = (id, result) => {
  sql.query("DELETE FROM movies WHERE idmovie = ?", id, (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(err, null);
    } else if (res.affectedRows == 0) {
      result({ type: "not_found" }, null);
    } else {
      result(null, res);
    }
  });
};

MovieModel.removeAll = (result) => {
  sql.query("DELETE FROM movies ", (err, res) => {
    if (err) {
      console.log("erro: ", err);
      result(err);
    } else {
      result(null);
    }
  });
};

module.exports = MovieModel;
