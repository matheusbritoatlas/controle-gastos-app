import express from "express"
import { dbAsync } from '../database/database.js'; // Ajustado para require

const router = express.Router();

function formatarData(dataInput) {
    
    if (!dataInput || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataInput)){
        throw new Error("Formato de data inválido. Use DD/MM/AAAA");
    }

    const [dia, mes, ano] = dataInput.split('/');
    
    return `${ano}-${mes}-${dia}`;
}

router.get('/consultar_movimentacoes', async (req, res) => {
    const { tipo_movimentacao, data_inicio, data_final } = req.query;

    if (!data_inicio || !data_final) {
        return res.status(400).json({ error: "Parâmetros data_inicio e data_final são obrigatórios." });
    }

    const userId = req.user ? req.user.id : req.session.usuario.id;

    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        let query = "SELECT * FROM movimentacoes WHERE user_id = ? AND data BETWEEN ? AND ?";
        const params = [userId, dataInicioFormatada, dataFinalFormatada];

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
    const userId = req.user ? req.user.id : req.session.usuario.id;
    try {
        const resultado = await dbAsync.get('SELECT SUM(valor) AS total FROM movimentacoes WHERE user_id = ?', [userId]);
        return res.json(resultado);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/consultar_total_saidas_entradas', async (req, res) => {
    const { tipo_movimentacao, data_inicio, data_final } = req.query;

    
    if (!data_inicio || !data_final) {
        return res.status(400).json({ error: "Parâmetros data_inicio e data_final são obrigatórios." });
    }

    if (tipo_movimentacao !== "Entrada" && tipo_movimentacao !== "Saída") {
        return res.status(400).json({ error: "O parâmetro tipo_movimentacao é obrigatório e deve ser 'entrada' ou 'saída'." });
    }
    const userId = req.user ? req.user.id : req.session.usuario.id;
    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        const query = "SELECT SUM(valor) AS total FROM movimentacoes WHERE user_id = ? AND data BETWEEN ? AND ? AND tipo_movimentacao = ?";
        const params = [userId, dataInicioFormatada, dataFinalFormatada, tipo_movimentacao];

        const resultado = await dbAsync.get(query, params); 
        const total = resultado.total || 0;

        return res.json({ tipo: tipo_movimentacao, total: total });
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados.", detalhe: erro.message });
    }
});


router.get('/consultar_registros_categorias', async (req, res) => {
    const { categoria, data_inicio, data_final } = req.query;

    if (!data_inicio || !data_final || !categoria) {
        return res.status(400).json({ error: "Parâmetros categoria, data_inicio e data_final são obrigatórios." });
    }

    const userId = req.user ? req.user.id : req.session.usuario.id;
    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        // CORRIGIDO: Adicionado "user_id = ? AND"
        const query = "SELECT * FROM movimentacoes WHERE user_id = ? AND categoria = ? AND data BETWEEN ? AND ?";
        const params = [userId, categoria, dataInicioFormatada, dataFinalFormatada];

        const resultado = await dbAsync.all(query, params); 
        return res.json({ categoria, resultado });
    } catch (erro) {
        return res.status(500).json({ error: "Erro ao consultar o banco de dados.", detalhe: erro.message });
    }
});

router.get('/consultar_total_por_categoria', async (req, res) => {
    const { categoria, data_inicio, data_final } = req.query;

    if (!data_inicio || !data_final || !categoria) {
        return res.status(400).json({ error: "Parâmetros categoria, data_inicio e data_final são obrigatórios." });
    }
    const userId = req.user ? req.user.id : req.session.usuario.id;
    try {
        const dataInicioFormatada = formatarData(data_inicio);
        const dataFinalFormatada = formatarData(data_final);

        // CORRIGIDO: Adicionado "user_id = ? AND"
        const query = "SELECT SUM(valor) AS total FROM movimentacoes WHERE user_id = ? AND data BETWEEN ? AND ? AND categoria = ?";
        const params = [userId, dataInicioFormatada, dataFinalFormatada, categoria]; 

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

    const userId = req.user ? req.user.id : req.session.usuario.id;

    let valorFinal = Math.abs(Number(valor));
    if (isNaN(valorFinal)) {
        return res.status(400).json({ error: 'Valor inválido' });
    }

    try {
        const dataFormatada = formatarData(data);

        if (tipo_movimentacao === 'Saída' || tipo_movimentacao === 'Saida') {
            valorFinal = valorFinal * -1;
        }

        const sql = 'INSERT INTO movimentacoes (user_id, titulo, valor, data, tipo_movimentacao, categoria) VALUES (?,?,?,?,?,?)';
        const resultado = await dbAsync.run(sql, [userId,titulo, valorFinal, dataFormatada, tipo_movimentacao, categoria]);
        
        return res.status(201).json({
            id: resultado.lastID,
            titulo: titulo,
            valor: valorFinal,
            data: dataFormatada,
            tipo_movimentacao: tipo_movimentacao,
            categoria: categoria
        });
    
    } catch (erro) {
        return res.status(500).json({ error: erro.message });
    }
});


router.delete('/movimentacoes/:id', async (req, res) => {
   
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ erro: "O ID da movimentação é obrigatório." });
    }

    const userId = req.user ? req.user.id : req.session.usuario.id;

    const query = "DELETE FROM movimentacoes WHERE id = ? and user_id = ?";

    try {
        const resultado = await dbAsync.run(query, [id, userId]);

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

export default router;