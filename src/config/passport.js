import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { dbAsync as db } from "../database/database.js"; 

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // 1. Usa o seu dbAsync.get que retorna uma Promise (usando await)
                const user = await db.get(
                    "SELECT * FROM users WHERE google_id = ?",
                    [profile.id]
                );

                // 2. Se o usuário já existe, retorna ele
                if (user) {
                    return done(null, user);
                }

                // 3. Se não existe, cria usando o dbAsync.run
                const result = await db.run(
                    `
                    INSERT INTO users (nome, email, google_id)
                    VALUES (?, ?, ?)
                    `,
                    [
                        profile.displayName,
                        profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                        profile.id
                    ]
                );

                // No seu dbAsync, você deu "res(this)". O 'this' do sqlite no run contém o 'lastID'
                return done(null, {
                    id: result.lastID,
                    nome: profile.displayName,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null
                });

            } catch (err) {
                // Captura qualquer erro de banco de dados
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Ajustado também o deserializeUser para usar a Promise do dbAsync
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);
        done(null, user);
    } catch (err) {
        done(err);
    }
});