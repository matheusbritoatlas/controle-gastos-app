const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require("../database/database");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },

        (accessToken, refreshToken, profile, done) => {

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