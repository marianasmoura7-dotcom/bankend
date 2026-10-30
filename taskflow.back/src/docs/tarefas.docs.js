const { json, parametroId } = require('./comum')
const paths = {
    '/tarefas': {
        get: {
            tags: ['Tarefas'],
            summary: 'Lista todas as tarefas',
            responses: {
                '200': { descriptions: 'Lista de tarefas' },
                '404': {
                    description: 'Tarefa não encontrada',
                    content: json('Erro')
                },

            }
        }, post: {
            tags: ['Tarefas'], summary: 'Cria uma tarefa',
            requestBody: { required: true, content: json('TarefaEntrada') },
            responses: {
                '201': { description: 'Tarefa criada', content: json('Tarefa') },
                '400': { description: 'Dados inválidos', content: json('Erro') },
                '401': { description: 'Token ausente ou inválido', content: json('Erro') },
            },

        },
    },

    '/tarefas/{id}': {
        get: {
            tags: ['Tarefas'],
            summary: 'Busca uma tarefa pelo id',
            parameters: [parametroId],
            responses: {
                '200': { description: 'Tarefa encontrada', content: json('Tarefa') },
                '400': { description: 'Id inválido', content: json('Erro') },
                '401': { description: 'Token ausente ou inválido', content: json('Erro') },
                '404': { description: 'Tarefa não encontrada', content: json('Erro') },
            },
        }, put: {
            tags: ['Tarefas'],
            summary: 'Atualiza uma tarefa',
            parameters: [parametroId],
            requestBody: { required: true, content: json('TarefaEntrada') },
            responses: {
                '200': { description: 'Tarefa encontrada', content: json('Tarefa') },
                '400': { description: 'Id inválido', content: json('Erro') },
                '401': { description: 'Token ausente ou inválido', content: json('Erro') },
                '404': { description: 'Tarefa não encontrada', content: json('Erro') },
            },
        }, delete: {
            tags: ['Tarefas'],
            summary: 'Exclui uma tarefa',
            parameters: [parametroId],
            responses: {
                '200': { description: 'Tarefa excluída',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    mensagem: { type: 'string', example: 'Tarefa removida' },
                                    tarefa: { $ref: '#/components/schemas/Tarefa' },
                                },
                            } 
                        }
                    },
                },
                '401': {description: 'Token ausente ou inválido', content: json('Erro') },
                '404': { description: 'Tarefa não encontrada', content: json('Erro') },
            },

        },
    },
}
const schemas = {
    Tarefa: {
        type: 'object', properties: {
            id: { type: 'integer', example: 1 },
            texto: { type: 'string', example: 'Revisar layout' },
            coluna: { type: 'string', enum: ['afazer', 'andamento', 'concluido'] },
            iniciada_em: { type: 'string', format: 'date-time', nullable: true },
            usuario_id: { type: 'integer', example: 1 },
            id_prioridade: { type: 'integer', example: 2 },
            idprojeto: { type: 'integer', example: 7 },

        }
    },
    TarefaEntrada: {
        type: 'object',
        required: ['texto', 'coluna', 'usuario_id', 'projeto_id', 'idprioridade'],
        properties: {
            texto: {
                type: 'string', example: 'Revisar layout'
            },
            coluna: { type: 'string', enum: ['afazer', 'andamento', 'concluido'] },
            iniciada_em: { type: 'string', format: 'date-time', nullable: true },
            usuario_id: { type: 'integer', example: 1 },
            id_prioridade: { type: 'integer', example: 2 },
            idprojeto: { type: 'integer', example: 7 },
        },
    }

}
module.exports = { paths, schemas };