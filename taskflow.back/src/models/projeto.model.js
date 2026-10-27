const pool = require('../database/db.js');
let proximoId = 1;
const prisma = require('../database/prisma')

module.exports = {
      listar: async () => {
        const resultado = await prisma.projetos.findMany({
            select: {
                nome: true,
                descricao: true,
                usuario_id: true,
                criado_em: true,
                usuarios: {
                    select: {
                        nome: true
                    }
                },
                tarefas:true,
            }
        })
        return prisma.projetos.findMany({
            orderby: { id: 'asc' },
        })
    },
    // buscar: async (id) => {
    //     const tarefa = await prisma.tarefas.findUnique({
    //         where: { id },
    //         include: incluirNomes,
    //     });

    //     return tarefa ? formatarTarefa(tarefa) : null;
    // },
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
    },
};
console.log(prisma.projetos.findMany)