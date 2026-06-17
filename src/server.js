const express = require("express"); 
const session = require("express-session");     
const passport = require("passport"); // Adicionado para suportar o auth.js

const app = express(); 

app.use(express.json());   

app.use(session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false
}));

// Inicializa o passport para o Login do Google funcionar corretamente
app.use(passport.initialize());
app.use(passport.session());

// Importações
const authRoutes = require("./routes/auth");
const financeiroRoutes = require("./routes/financeiro"); // Importa as rotas financeiras
const verificarAutenticacao = require("./middlewares/authMiddleware"); // Importa o middleware de proteção

// Uso das rotas públicas
app.use(authRoutes);

// Uso das rotas protegidas
// O middleware é injetado aqui. Qualquer requisição para "/financeiro/..." passará por ele primeiro.
app.use('/financeiro', verificarAutenticacao, financeiroRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});