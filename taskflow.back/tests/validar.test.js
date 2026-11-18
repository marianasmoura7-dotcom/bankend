const validar = require ('../src/middlewares/validar');
const schemas = require = ('../src/midlewares/schemas');
const next = jest.fn();

function pegarErro (funcao) {
    try {
        funcao();
    } catch (erro) {
        return erro;
    }
}
function tarefaValida () {
    return { texto: 'Revisar o plano de test',
        coluna: 'afazer',
        usuario_id: 1,
        idprojeto: 1,
        id_prioridade: 1,
    };
}
describe('validar', () => {
    test('chama o next quando os dados estão certos', () => {
        const middleware = validar(schemas.tarefa);
        const req = {body: tarefaValida ()};
        const next = jest.fn();
        middleware(req, {} , next) ;
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    });
    test('sem body: 400 com um detalhe por campo obrigatorio', () => {
        const middleware = validar(schemas.tarefa);
        const req =  {};
        const next = jest.fn();
        const erro = pegarErro(() => middleware(req, {}, next));
        expect(erro.status).toBe(400);
        expect(erro.mensagem).toBe('Dados inválidos');
        expect(erro.detalhes).toEqual([
            "O campo 'texto' é obrigatório",
            "O campo 'coluna' é obrigatório",
            "O campo 'usuario_id' é obrigatório",
            "O campo 'idprojeto' é obrigatório",
            "O campo 'id_prioridade' é obrigatório"
        ]);
    expect(next).not.toHaveBeenCalled();
    });
    test (' coluna fora da lista: diz os valores aceitos', () => {
        const middleware = validar(schemas.tarefa);
        const req = {body: {...tarefaValida(), coluna: 'feito'}};
        const next = jest.fn();
        const erro = pegarErro(() => middleware(req, {}, next));

        expect(erro.detalhes).toEqual([
            "O campo 'coluna' deve ser um dos seguintes valores: afazer, andamento, concluido"
        ]);
    expect(next).not.toHaveBeenCalled();
    });
    test('coluna fora da lista: diz os valores aceitos', () => {
        const middleware = validar(schemas.tarefa);
        const req = {body: {...tarefaValida(), coluna: 'feito'}};
        const next = jest.fn();
        const erro = pegarErro(() => middleware(req, {}, next));
        expect ( erro.detalhes).toEqual([
            "O campo 'coluna' deve ser um dos seguintes valores: afazer, andamento, concluido"
        ]);
        expect(next).not.toHaveBeenCalled();
    });
});
 