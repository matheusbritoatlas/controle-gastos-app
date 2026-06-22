import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport"; // Adicionado para suportar o auth.js
import "./config/passport.js";
import authRoutes from "./routes/auth.js";
import financeiroRoutes from "./routes/financeiro.js"; // Importa as rotas financeiras

const app = express();

app.use(cors());
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
app.use('/financeiro', financeiroRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});