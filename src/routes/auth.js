const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

const db = require("../database/database");

// =========================
// CADASTRO
// =========================

router.post("/cadastro", async (req, res) => {

    const { nome, email, senha } = req.body;

    try {

        // criptografa senha
        const senhaCriptografada =
            await bcrypt.hash(senha, 10);

        // salva usuário
        db.run(
            `
            INSERT INTO users
            (nome, email, senha)
            VALUES (?, ?, ?)
            `,
            [nome, email, senhaCriptografada],

            function(err) {

                // erro
                if (err) {

                    return res.status(400).json({
                        erro: "Email já cadastrado"
                    });

                }

                // sucesso
                res.json({
                    mensagem: "Usuário cadastrado com sucesso"
                });

            }

        );

    } catch (erro) {

        res.status(500).json({
            erro: "Erro no servidor"
        });

    }

});



// =========================
// LOGIN
// =========================

router.post("/login", (req, res) => {

    const { email, senha } = req.body;

    // procura usuário
    db.get(
        `
        SELECT * FROM users
        WHERE email = ?
        `,
        [email],

        async (err, usuario) => {

            // erro banco
            if (err) {

                return res.status(500).json({
                    erro: "Erro no servidor"
                });

            }

            // usuário não encontrado
            if (!usuario) {

                return res.status(400).json({
                    erro: "Usuário não encontrado"
                });

            }

            // compara senha
            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha
                );

            // senha errada
            if (!senhaCorreta) {

                return res.status(400).json({
                    erro: "Senha incorreta"
                });

            }

            // login sucesso
            res.json({
                mensagem: "Login realizado com sucesso",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        }

    );

});



// =========================
// LOGIN GOOGLE
// =========================

router.get(
    "/auth/google",

    passport.authenticate(
        "google",
        {
            scope: ["profile", "email"]
        }
    )
);



// =========================
// CALLBACK GOOGLE
// =========================

router.get(

    "/auth/google/callback",

    passport.authenticate(
        "google",
        {
            failureRedirect: "/erro"
        }
    ),

    (req, res) => {

        res.json({
            mensagem: "Login Google realizado"
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

});



// =========================
// EXPORTA ROTAS
// =========================

module.exports = router;