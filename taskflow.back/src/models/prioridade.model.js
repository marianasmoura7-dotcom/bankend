const pool = require('../database/db.js');

module.exports = {
     listar: async () => {
        const result = await pool.query(
            'SELECT * FROM prioridade ORDER BY id');
        return result.rows;
    },
}