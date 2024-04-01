const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  app.use(cors());
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Linhas das rotas
require("./routes/movie.routes.js")(app);
require("./routes/usuario.routes.js")(app);

app.get("/", (req, res) => {
  res.json({
    message: "Bem vindo à API MVC do CINEFILO",
  });
});
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
