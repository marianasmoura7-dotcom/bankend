const pool = require('../database/db.js');
const prisma = require('../database/prisma')
const incluirNomes = {
    projetos: { select: { nome: true } },
    usuarios: { select: { nome: true } },
    prioridade: { select: { descricao: true, cor: true } },
}
function formatarTarefa(tarefa) {
    const { projetos, usuarios, prioridade, ...resto } = tarefa;
    return {
        ...resto,
        projeto: projetos?.nome,
        usuario: usuarios?.nome,
        prioridade: prioridade?.descricao,
        prioridade_cor: prioridade?.cor
    };
}
const TarefaModel = {

    listar: async () => {
        const resultado = await prisma.tarefas.findMany({
            select: {
                texto: true,
                coluna: true,
                usuario_id: true,
                idprojeto: true,
                iniciada_em: true,
                id_prioridade: true,
                criado_em: true,
               include: incluirNomes,
            }
        })
        return formatarTarefa(resultado)
        
  
      
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

        const atual = await prisma.tarefas.findUnique({
            where: { id }
        });
        if (!atual) return null;
        const concluidaEm = dados.coluna === 'concluido' ? new Date() : null

        const reusltado = await prisma.tarefas.update({
            where: { id },
            data: {
                texto: dados.texto,
                coluna: dados.coluna,
                usuario_id: dados.usuario_id,
                idprojeto: dados.idprojeto,
                iniciada_em: iniciada_em,
                id_prioridade: dados.id_prioridade,
                criado_em: criado_em,
            },
            include: incluirNomes,
        });
        return formatarTarefa(resultado);
    },

    remover: async (id) => {
        const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}
module.exports = TarefaModel