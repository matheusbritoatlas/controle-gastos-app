const sqlite3 = require("sqlite3").verbose(); //Importa sqlite e permite usar SQLite no Node.

const db = new sqlite3.Database("./users.db"); //Cria ou abre user.db, que é o arquivo do banco de dados.

db.serialize(() => {

   db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT UNIQUE,
        senha TEXT,
        google_id TEXT
    )
`);
});

module.exports = db; //Exporta o objeto db para que possa ser usado em outros arquivos, como auth.js.