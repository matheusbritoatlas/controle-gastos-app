import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3"; // 1. Importa a factory do store
import passport from "passport"; 
import "./config/passport.js";
import authRoutes from "./routes/auth.js";
import financeiroRoutes from "./routes/financeiro.js";


const app = express();
const SQLiteStore = SQLiteStoreFactory(session); // 2. Inicializa o store com a sessão

app.use(cors());
app.use(express.json());

app.use(session({
    // 3. Configura para salvar no seu arquivo de banco existente
    store: new SQLiteStore({
        db: "financas.db", // Nome do seu arquivo SQLite
        dir: "./"          // Diretório onde ele está (raiz do projeto)
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
     } // Opcional: Mantém o cookie vivo por 7 dias
}));

// Inicializa o passport
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use('/financeiro', financeiroRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});