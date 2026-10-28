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
        const lista = await prisma.tarefas.findMany({
            include: incluirNomes,
            orderBy: { id: 'asc' },
        });

        return lista.map(formatarTarefa);



    },

    buscar: async (id) => {
        const tarefa = await prisma.tarefas.findUnique({
            where: { id },
            include: incluirNomes,
        });

        return tarefa ? formatarTarefa(tarefa) : null;
    },
    adicionar: async (dados) => {
        const tarefa = await prisma.tarefas.create({
           data: {
                texto: dados.texto,
                coluna: dados.coluna ||'afazer',
                usuario_id: dados.usuario_id,
                idprojeto: dados.idprojeto,
                id_prioridade: dados.id_prioridade,

            },
            include: incluirNomes,
        });
        return formatarTarefa(tarefa);
    },
    atualizar: async (id, dados) => {

        const atual = await prisma.tarefas.findUnique({
            where: { id }
        });
        if (!atual) return null;
        const concluidaEm = dados.coluna === 'concluido' ? new Date() : null

        const resultado = await prisma.tarefas.update({
            where: { id },
            data: {
                texto: dados.texto,
                coluna: dados.coluna,
                usuario_id: dados.usuario_id,
                idprojeto: dados.idprojeto,

                id_prioridade: dados.id_prioridade,

            },
            include: incluirNomes,
        });
        return formatarTarefa(resultado);
    },

    remover: async (id) => {
        try {
            const tarefa = await prisma.tarefas.delete({
                where: { id },
                include: incluirNomes,
            });
            return formatarTarefa(tarefa);
        } catch (erro) {
            if (erro.code === 'P2025') return null;
            throw erro
        }
    },
}
module.exports = TarefaModel