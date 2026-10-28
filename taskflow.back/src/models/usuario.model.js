const pool = require('../database/db.js');
const prisma = require('../database/prisma')


const UsuarioModel = {
    listar: async () => {
        const lista = await prisma.usuarios.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
            },
            orderBy: { id: 'asc' },

        });
        return lista
    },

    buscar: async (id) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });

        return usuario ? (usuario) : null;
    },


    buscarPorEmail: async (email) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                email: true,

            },
        });
        return usuario
    },

    buscarPorEmailAuth: async (email) => {
        const usuario = await prisma.usuarios.findUnique({
            where: { email },
            select: {
                id: true,
                nome: true,
                email: true,
                senha_hash: true
            },
        });
        return usuario
    },

    adicionar: async (dados) => {
        const usuario = await prisma.usuarios.create({
            data: {
                nome: dados.nome,
                email: dados.email,
                senha_hash: dados.senha_hash,
            }
        });
        return usuario;
    },
    atualizar: async (id, dados) => {
        const resultado = await prisma.usuarios.update({
            where: { id },
            data: {
                nome: dados.nome,
                email: dados.email,
                senha_hash: dados.senha_hash,
            },
        });
        const exibir = {
            id,
            nome: dados.nome,
            email: dados.email,
        }
        return exibir

    },
    remover: async (id) => {
       try {
            const usuario = await prisma.usuarios.delete({
                where: { id },
    
            });
            return usuario;
        } catch (erro) {
            if (erro.code === 'P2025') return null;
            throw erro
        }
    },
};

module.exports = UsuarioModel
