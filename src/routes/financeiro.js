const express = require('express');
const { dbAsync } = require('../database/database.js'); // Ajustado para require

const router = express.Router();

function formatarData(dataInput) {
    
    if (!dataInput || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataInput)){
        throw new Error("Formato de data inválido. Use DD/MM/AAAA");
    }

    const [dia, mes, ano] = dataInput.split('/');
    
    return `${ano}-${mes}-${dia}`;
}

router.get('/consultar_movimentacoes', async (req, res) => {
    const { tipo_movimentacao, data_inicio, data_final } = req.body;

    if (!data_inicio || !data_final) {
        return res.status(400).json({ error: "Parâmetros data_inicio e data_final são obrigatórios." });
    }

    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        let query = "SELECT * FROM movimentacoes WHERE data BETWEEN ? AND ?";
        const params = [dataInicioFormatada, dataFinalFormatada];

        if (tipo_movimentacao === "entrada" || tipo_movimentacao === "saída") {
            query += " AND tipo_movimentacao = ?";
            params.push(tipo_movimentacao); 
        }

        const resultado = await dbAsync.all(query, params); 
        return res.json(resultado);
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados.", detalhe: erro.message });
    }
});

router.get('/consultar_saldo', async (req, res) => {
    try {
        const resultado = await dbAsync.get('SELECT SUM(valor) AS total FROM movimentacoes', []);
        return res.json(resultado);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/consultar_total_saidas_entradas', async (req, res) => {
    const { tipo_movimentacao, data_inicio, data_final } = req.body;

    if (!data_inicio || !data_final) {
        return res.status(400).json({ error: "Parâmetros data_inicio e data_final são obrigatórios." });
    }

    if (tipo_movimentacao !== "entrada" && tipo_movimentacao !== "saída") {
        return res.status(400).json({ error: "O parâmetro tipo_movimentacao é obrigatório e deve ser 'entrada' ou 'saída'." });
    }

    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        const query = "SELECT SUM(valor) AS total FROM movimentacoes WHERE data BETWEEN ? AND ? AND tipo_movimentacao = ?";
        const params = [dataInicioFormatada, dataFinalFormatada, tipo_movimentacao];

        const resultado = await dbAsync.get(query, params); 
        const total = resultado.total || 0;

        return res.json({ tipo: tipo_movimentacao, total: total });
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados.", detalhe: erro.message });
    }
});


router.get('/consultar_registros_categorias', async (req, res) => {
    const { categoria, data_inicio, data_final } = req.body;

    if (!data_inicio || !data_final || !categoria) {
        return res.status(400).json({ error: "Parâmetros categoria, data_inicio e data_final são obrigatórios." });
    }

    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        const query = "SELECT * FROM movimentacoes WHERE categoria = ? AND data BETWEEN ? AND ?";
        const params = [categoria, dataInicioFormatada, dataFinalFormatada];

        const resultado = await dbAsync.all(query, params); 
        return res.json({ categoria, resultado });
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados.", detalhe: erro.message });
    }
});

router.get('/consultar_total_por_categoria', async (req, res) => {
    const { categoria, data_inicio, data_final } = req.body;

    if (!data_inicio || !data_final || !categoria) {
        return res.status(400).json({ error: "Parâmetros categoria, data_inicio e data_final são obrigatórios." });
    }

    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        const query = "SELECT SUM(valor) AS total FROM movimentacoes WHERE data BETWEEN ? AND ? AND categoria = ?";
        const params = [dataInicioFormatada, dataFinalFormatada, categoria]; // Corrigido aqui de tipo_movimentacao para categoria

        const resultado = await dbAsync.get(query, params); 
        const total = resultado.total || 0;

        return res.json({ categoria: categoria, total: total });
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados.", detalhe: erro.message });
    }
});

router.post('/registrar_movimentacao', async (req, res) => {

    const { titulo, valor, data, tipo_movimentacao, categoria } = req.body; 
    
    if (!titulo || !valor || !data || !tipo_movimentacao || !categoria) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    let valorFinal = Math.abs(Number(valor));
    if (isNaN(valorFinal)) {
        return res.status(400).json({ error: 'Valor inválido' });
    }

    try {
        const dataFormatada = formatarData(data);
        const tipoMovimentacaoNormalizado = tipo_movimentacao.toLowerCase();

        if (tipoMovimentacaoNormalizado === 'saída' || tipoMovimentacaoNormalizado === 'saida') {
            valorFinal = valorFinal * -1;
        }

        const sql = 'INSERT INTO movimentacoes (titulo, valor, data, tipo_movimentacao, categoria) VALUES (?,?,?,?,?)';
        const resultado = await dbAsync.run(sql, [titulo, valorFinal, dataFormatada, tipoMovimentacaoNormalizado, categoria]);
        
        return res.status(201).json({
            id: resultado.lastID,
            titulo,
            valor: valorFinal,
            data: dataFormatada,
            tipo_movimentacao: tipoMovimentacaoNormalizado,
            categoria
        });
    
    } catch (erro) {
        return res.status(500).json({ error: erro.message });
    }
});

// Mudamos de '/deletar_movimentacao' para '/movimentacoes/:id' (padrão REST)
router.delete('/movimentacoes/:id', async (req, res) => {
    // Pegamos o ID dos parâmetros da URL
    const { id } = req.params;

    // 1. Validação básica de entrada
    if (!id) {
        return res.status(400).json({ erro: "O ID da movimentação é obrigatório." });
    }

    const query = "DELETE FROM movimentacoes WHERE id = ?";

    try {
        const resultado = await dbAsync.run(query, [id]);

        if (resultado.changes === 0) {
            return res.status(404).json({ erro: "Movimentação não encontrada." });
        }

        return res.status(200).json({ mensagem: "Movimentação deletada com sucesso." });

    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro ao deletar a movimentação no banco de dados.", 
            detalhe: error.message 
        });
    }
});

module.exports = router;