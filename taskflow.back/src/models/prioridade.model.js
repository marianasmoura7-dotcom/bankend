const prisma = require('../database/prisma');

const prioridadeModel = {
    listar: async () => {
        const resultado = await prisma.prioridade.findMany({
            select: {id: true, descricao: true , cor: true},
            where: {ativo:true},
            orderBy:{id: 'asc'}
        })
        return resultado
    }
}
module.exports = prioridadeModel
