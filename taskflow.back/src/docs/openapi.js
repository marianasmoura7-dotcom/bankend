const tarefas =require ('./tarefas.docs');
const comum = require('./comum' )
module.exports = {
    openapi: "3.0.3",
    info: {
        title: 'Taskflow API ',
        version: '1.0.0',
        description: 'API do TaskFlow · PROGRAMADOR FULL STACK',

    },
    serves: [{url: '/' , description: 'Este Servidor'}],
    security: [{bearerAuth: [] }],
    paths : {...tarefas.paths},
    
    components: {
        securitySchemes :{
            bearerAuth:{
                type:'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                schemas:{...comum.schemas, ...tarefas.schemas}
            },
        },
    },
};

