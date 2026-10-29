const prisma = require('../database/prisma');

const prioridadeModel = {
    listar: async () => {
        const resultado = await prisma.prioridade.findMany({
            select: {id: true, descricao: true , cor: true},
            where: {ativo:true},
            orderBy:{id: 'asc'}
        })
        return resultado
    },
    
    buscar: async (id) => {
        const prioridade = await prisma.prioridade.findUnique({
            where: { id },

        });
        return prioridade
},
 adicionar: async (dados) => {
        const prioridade = await prisma.prioridade.create({
           data: {
                descricao: dados.descricao,
                cor: dados.cor ||'afazer',
                usuario_id: dados.usuario_id,
                idprojeto: dados.idprojeto,
                id_prioridade: dados.id_prioridade,

            },
            include: incluirNomes,
        });
        return prioridade
    }
}
module.exports = prioridadeModel
