function verificarAutenticacao(req, res, next) {
    // Verifica se existe uma sessão de usuário (Login Local) 
    // OU se o usuário foi autenticado pelo Passport (Login Google)
    if ((req.session && req.session.usuario) || (req.isAuthenticated && req.isAuthenticated())) {
        return next(); // Usuário autenticado, pode continuar para a rota financeira
    }

    // Se não estiver logado, bloqueia o acesso
    return res.status(401).json({ erro: "Acesso negado. Faça login para continuar." });
}

export default verificarAutenticacao;