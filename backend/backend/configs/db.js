// modulo do mysql
const mysql = require("mysql");
const dbConfig = require("../configs/db.config");

// cria uma conexao com o BD
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT
});

// nova conexao sql
connection.connect(error=>{
    if(error) throw error;
    console.log("Banco de Dados Conectado!");
});

module.exports = connection;