const express = require("express"); // framework para criar o servidor
const session = require("express-session");     // middleware para gerenciar sessões
const bcrypt = require("bcrypt");               // biblioteca para criptografar senhas

const app = express(); // cria o servidor

app.use(express.json());   // middleware para parsear JSON no corpo das requisições

app.use(session({// configurações da sessão
    secret: "segredo",
    resave: false,
    saveUninitialized: false
}));

const authRoutes = require("./routes/auth");// importa as rotas de autenticação

app.use(authRoutes);// usa as rotas de autenticação

app.listen(3000, () => {// inicia o servidor na porta 3000
    console.log("Servidor rodando na porta 3000");
});