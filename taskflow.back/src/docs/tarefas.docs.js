const paths ={
    '/tarefas': {
        get: {
            tags: ['Tarefas'],
            summary: 'Lista todas as tarefas',
            responses: {
                '200': {descriptions: 'Lista de tarefas'},
            
            }
        }
    }
};
module.exports = {paths};