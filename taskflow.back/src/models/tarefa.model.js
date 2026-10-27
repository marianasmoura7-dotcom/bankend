const pool = require('../database/db.js');
const prisma = require('../database/prisma')
const incluirNomes = {
    projetos: { select: { nome: true } },
    usuarios: { select: { nome: true } },
    // prioridade:{ select: {descricao: }}
}
module.exports = {

    listar: async () => {
        const resultado = await prisma.prioridade.findMany({
            select: {
                texto: true,
                coluna: true,
                usuario_id: true,
                idprojeto: true,
                iniciada_em: true,
                id_prioridade: true,
                criado_em: true,
                prioridade: {
                    select: {
                        descricao: true,
                        cor: true,
                    }
                },
                usuarios: {
                    select: {
                        nome: true
                    }
                }
            }
        })
        return prisma.tarefas.findMany({
            include: incluirNomes,
            orderby: { id: 'asc' },
        })
    },

    buscar: async (id) => {
        const tarefa = await prisma.tarefas.findUnique({
            where: { id },
            include: incluirNomes,
        });

        return tarefa ? formatarTarefa(tarefa) : null;
    },
    adicionar: async ({ texto, id_prioridade, coluna, usuario_id, idprojeto }) => {
        const result = await pool.query(
            'INSERT INTO tarefas (texto, id_prioridade, coluna, usuario_id, idprojeto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [texto, id_prioridade || 2, coluna || 'afazer', usuario_id, idprojeto]
        );
        return result.rows[0];
    },
    atualizar: async (id, dados) => {
        // const resultadoAtual
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
