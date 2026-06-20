import express from "express"
import "dotenv/config"
import session from "express-session"
import "./config/passport.js";     
import passport from "passport" // Adicionado para suportar o auth.js
import authRoutes from "./routes/auth.js";
import financeiroRoutes from "./routes/financeiro.js"; // Importa as rotas financeiras
import verificarAutenticacao from "./middlewares/authMiddleware.js"; // Importa o middleware de proteção

const app = express(); 

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Inicializa o passport para o Login do Google funcionar corretamente
app.use(passport.initialize());
app.use(passport.session());

// Uso das rotas públicas
app.use(authRoutes);

// Uso das rotas protegidas
// O middleware é injetado aqui. Qualquer requisição para "/financeiro/..." passará por ele primeiro.
app.use('/financeiro', verificarAutenticacao, financeiroRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});