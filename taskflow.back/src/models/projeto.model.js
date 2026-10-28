
const prisma = require('../database/prisma')

module.exports = {
       listar: async () => {
        const lista = await prisma.projetos.findMany({
            orderBy: { id: 'asc' },
        });
        return lista;
    },

    buscar: async (id) => {
        const projeto = await prisma.projetos.findUnique({
            where: { id },

        });
        return projeto
    },
  adicionar: async (dados) => {
        const projeto = await prisma.projetos.create({
           data: {
                nome: dados.nome,
                descricao: dados.descricao || null,
                usuario_id: dados.usuario_id,

            },
           
        });
        return projeto;
    },
    atualizar: async (id, dados) => {
          const resultado = await prisma.projetos.update({
            where: { id },
            data: {
                 nome: dados.nome,
                descricao: dados.descricao || null,
                usuario_id: dados.usuario_id,
            }
        });
        return resultado;
    },
    remover: async (id) => {
         try {
            const projeto = await prisma.projetos.delete({
                where: { id },
            
            });
            return projeto;
        } catch (erro) {
            if (erro.code === 'P2025') return null;
            throw erro
        }
    },
};
