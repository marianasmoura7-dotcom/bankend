const pool = require('../database/db.js');
let proximoId = 1;
const tarefasController = require('../controllers/tarefas.controller');
module.exports = {
     listar: async () => {
        const result = await pool.query(
            'SELECT * FROM projetos ORDER BY id');
        return result.rows;
    },
    buscar: async (id) => {
        const result = await pool.query('SELECT * FROM projetos WHERE id = $1', [id]);
        return result.rows[0] || null;
    },
    adicionar: async ({ nome, descricao, usuario_id }) => {
        const result = await pool.query(
            'INSERT INTO projetos (nome, descricao, usuario_id) VALUES ($1, $2, $3) RETURNING *',
            [nome, descricao, usuario_id]
        );
        return result.rows[0];
    },
    atualizar: async (id, dados) => {
        const result = await pool.query(
            'UPDATE projetos SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
            [dados.nome, dados.descricao, id]
        );
        return result.rows[0] || null;
    },
    remover: async (id) => {
        const result = await pool.query('DELETE FROM projetos WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    }
};