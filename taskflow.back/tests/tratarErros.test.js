const {Prisma } = require('@prisma/client');
const criarErro = require('../src/utils/criarErro');
const tartarErros = require('../src/middlewares/erro.middleware');

function criarRes() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
}

const req = { method: 'GET', url: '/tarefas/99'};
jest.spyOn(console, 'error').mockImplementation(() => {});
describe('tratarErros', () => {
    test ('erro do criarErro: envia status e a mensagem dele', () => {
        const erro = criarErro(404, 'tarefa  não encontrada');
        const res = criarRes();
        const next = jest.fn();
        tratarErros(erro, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ erro: { mensagem: 'tarefa  não encontrada', detalhes: undefined },
         });
        expect(next).not.toHaveBeenCalled();
    });
    test('erro sem status vira 500 e não mostra a mensagem técnica', () => {
        const erro = new Error ( 'Cannot read properties of undefined');
        const res = criarRes();
    
        tratarErros(erro, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ erro: { mensagem: 'Erro interno do servidor', detalhes: undefined } });
        expect(console.error).toHaveBeenCalled();
    });
    test ('erro do Prisma P2002 é traduzido para 409', () => {
        const erro = new Prisma.PrismaClientKnownRequestError('Unique constraint failed on the fields: (`email`)', {
            code: 'P2002',
            clientVersion: '6.0.0',
        });
        const res = criarRes();
        tratarErros(erro,{method: 'POST', url: '/usuarios'}, res, jest.fn());
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ erro: { mensagem: 'Já existe um registro com esse valor', detalhes: ['Valor repetido em: email'],

         },
         });
    });
});