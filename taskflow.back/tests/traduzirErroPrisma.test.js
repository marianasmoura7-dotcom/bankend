const traduzirErroPrisma = require('../src/utils/traduzirErroPrisma');
describe('traduzirErroPrisma', () => {
    test('P2025(registro não encontrado) vira 404', () => {
        const erroPrisma = { code: 'P2025' };
        const erro = traduzirErroPrisma(erroPrisma, 'PUT');
        expect(erro.status).toBe(404);

    });
    test('P2002(valor repetido) vira 409 e diz o campo que está duplicado', () => {
        const erroPrisma = { code: 'P2002', meta: { target: ['email'] } };
        const erro = traduzirErroPrisma(erroPrisma, 'POST');
        expect(erro.status).toBe(409);
        expect(erro.mensagem).toBe('Já existe um registro com este valor');
        expect(erro.detalhes[0]).toBe('Valor repetido em: email');
    });

    test('P2003 ao gravar (POST) vira 400 ', () => {
        const erroPrisma = { code: 'P2003' };
        const erro = traduzirErroPrisma(erroPrisma, 'POST');
        expect(erro.status).toBe(400);
    });
    test('P2003 ao excluir (DELETE) vira 409 ', () => {
        const erroPrisma = { code: 'P2003' };
        const erro = traduzirErroPrisma(erroPrisma, 'DELETE');
        expect(erro.status).toBe(409);
    });
    test('codigo não tratado fica sem status (O tratarErros responde com 500)', () => {
        const erroPrisma = { code: 'P1001' };
        const erro = traduzirErroPrisma(erroPrisma, 'GET');
        expect(erro.status).toBeUndefined();
    });
});