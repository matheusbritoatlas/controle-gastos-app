function verificarAutenticacao(req, res, next) {
    // Como unificamos o login tradicional usando req.login(), 
    // req.isAuthenticated() funcionará perfeitamente para AMBOS os métodos de login.
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ erro: "Acesso negado. Faça login para continuar." });
}

export default verificarAutenticacao;