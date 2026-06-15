import app from './routes/financeiro.js'

const PORT = 3000

// escutar porta 300
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
})