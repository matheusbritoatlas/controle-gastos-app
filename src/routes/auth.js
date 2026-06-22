import bcrypt from "bcrypt";
import express from "express";
import passport from "passport";
import { dbAsync as db } from '../database/database.js';

const router = express.Router();

// =========================
// CADASTRO
// =========================
router.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // 1. Criptografa a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // 2. Salva o usuário usando await
        await db.run(
            `
            INSERT INTO users (nome, email, senha)
            VALUES (?, ?, ?)
            `,
            [nome, email, senhaCriptografada]
        );

        // 3. Se chegou aqui, deu certo!
        return res.json({
            mensagem: "Usuário cadastrado com sucesso"
        });

    } catch (erro) {
        // 4. Captura o erro do SQLite (e-mail repetido)
        if (erro.code === 'SQLITE_CONSTRAINT' || erro.message.includes('UNIQUE')) {
            return res.status(400).json({
                erro: "Email já cadastrado"
            });
        }

        console.error("Erro inesperado no servidor:", erro);
        return res.status(500).json({
            erro: "Erro no servidor"
        });
    }
});

// =========================
// LOGIN (Atualizado para Async/Await)
// =========================
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        // 1. Procura o usuário no banco usando o await do dbAsync
        const usuario = await db.get(
            `
            SELECT * FROM users
            WHERE email = ?
            `,
            [email]
        );

        // 2. Se o usuário não for encontrado
        if (!usuario) {
            return res.status(400).json({
                erro: "Usuário não encontrado"
            });
        }

        // 3. Compara a senha enviada com a criptografada
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        // 4. Se a senha estiver incorreta
        if (!senhaCorreta) {
            return res.status(400).json({
                erro: "Senha incorreta"
            });
        }

        // 5. Salva os dados do usuário na sessão
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };

        // 6. Retorna o sucesso do login
        return res.json({
            mensagem: "Login realizado com sucesso",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        // Trata erros inesperados do banco ou servidor
        console.error("Erro no login:", erro);
        return res.status(500).json({
            erro: "Erro no servidor"
        });
    }
});

// =========================
// LOGIN GOOGLE
// =========================
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// =========================
// CALLBACK GOOGLE
// =========================
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/erro"
  }),
  (req, res) => {

    console.log("USUARIO LOGADO:");
    console.log(req.user);

    res.json({
      mensagem: "Login Google realizado",
      usuario: req.user
    });

  }
);

// =========================
// LOGOUT
// =========================
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.json({
            mensagem: "Logout realizado"
        });
    });
})

// =========================
// EXPORTA ROTAS
// =========================
export default router