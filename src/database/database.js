import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("./financas.db");

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

    // Alterado o nome de 'financas' para 'movimentacoes' para bater com as rotas
    db.run(`
        CREATE TABLE IF NOT EXISTS movimentacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            titulo TEXT NOT NULL,
            valor REAL NOT NULL,
            data TEXT NOT NULL,
            tipo_movimentacao TEXT NOT NULL,
            categoria TEXT NOT NULL 
        )
    `);
});

// Helper simples para transformar as funções de callback do sqlite3 em Promises (para usar async/await)
export const dbAsync = {
    all: (query, params) => new Promise((res, rej) => db.all(query, params, (err, rows) => err ? rej(err) : res(rows))),
    get: (query, params) => new Promise((res, rej) => db.get(query, params, (err, row) => err ? rej(err) : res(row))),
    run: (query, params) => new Promise((res, rej) => db.run(query, params, function(err) { err ? rej(err) : res(this) }))
};

export default db;