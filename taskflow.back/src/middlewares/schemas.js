const schemas = {
    id: { id: { obrigatorio: true, tipo: 'inteiro' } },
    tarefa: {
        texto: { obrigatorio: true, tipo: 'string' },
        id_prioridade: { obrigatorio: true, tipo: "inteiro" },
        coluna: { obrigatorio: true, tipo: "string", enum: ['afazer', 'andamento', 'concluido'] },
        usuarioId: { obrigatorio: true, tipo: 'inteiro' },
        idprojeto: { obrigatorio: true, tipo: 'inteiro' },
    },
    usuario: {
        nome: { obrigatorio: true, tipo: 'string', minLength: 3 },
        email: { obrigatorio: true, tipo: 'string', formato: "email" },
        senha: { obrigatorio: true, tipo: 'string', minLength: 6 },
    },

    projeto: {
        nome: { obrigatorio: true, tipo: 'string' },
        descricao: { obrigatorio: false, tipo: 'string', maxLength: 200 },
    },
    filtroTarefas: {
        usuarioId: {
            obrigatorio: false, tipo: "inteiro"
        },
    }
};

module.exports = schemas;