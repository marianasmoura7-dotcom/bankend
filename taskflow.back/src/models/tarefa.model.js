const pool = require('../database/db.js');

module.exports = {

    listar: async () => {
        const result = await pool.query(
            'SELECT * FROM tarefas ORDER BY id');
        return result.rows;
    },
    buscar: async (id) => {
        const result = await pool.query('SELECT * FROM tarefas WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    },
    adicionar: async ({ texto, id_prioridade, coluna, usuario_id, idprojeto }) => {
        const result = await pool.query(
            'INSERT INTO tarefas (texto, id_prioridade, coluna, usuario_id, idprojeto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [texto, id_prioridade || 2, coluna || 'afazer', usuario_id, idprojeto]
        );
        return result.rows[0];
    },
    atualizar: async (id, dados) => {
        const { texto, id_prioridade, coluna, usuario_id } = dados;
     
        const result = await pool.query(
            'UPDATE tarefas SET texto = $1, id_prioridade = $2, coluna = $3, usuario_id = $4 WHERE id = $5 RETURNING *',
            [texto, id_prioridade, coluna, usuario_id, id]
        );
        return result.rows[0];
    },
    remover: async (id) => {
        const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}
