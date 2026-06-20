import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// Ajustado para importar o 'db' corretamente (verifique se no seu arquivo se usa export default ou export nomeado)
import { dbAsync as db } from "../database/database.js"; 

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },

        (accessToken, refreshToken, profile, done) => {
            // Agora 'db' existe por causa do "as db" no import acima
            db.get(
                "SELECT * FROM users WHERE google_id = ?",
                [profile.id],

                (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, user);
                    }

                    db.run(
                        `
                        INSERT INTO users
                        (nome, email, google_id)
                        VALUES (?, ?, ?)
                        `,
                        [
                            profile.displayName,
                            profile.emails[0].value,
                            profile.id
                        ],

                        function(err) {
                            if (err) {
                                return done(err);
                            }

                            done(null, {
                                id: this.lastID,
                                nome: profile.displayName,
                                email: profile.emails[0].value
                            });
                        }
                    );
                }
            );
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.get(
        "SELECT * FROM users WHERE id = ?",
        [id],

        (err, user) => {
            done(err, user);
        }
    );
});