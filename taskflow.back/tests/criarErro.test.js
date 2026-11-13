const criarErro = require('../src/utils/criarErro')
describe('criarErro', () => {
    test('devolve erro com o status e a mensagem', () => {
        const erro = criarErro(404, 'Tarefa não encontrada');
        expect(erro.status).toBe(404);
        expect(erro.message).toBe('Tarefa não encontrada');
    });
    test(' guarda a  lista de detalhes quando informada', () => {
        const detalhes = ["o campo 'texto' é obrigatório"];
        const erro = criarErro(400, 'Dados inválidos', detalhes);
        expect(erro.detalhes[0]).toBe("o campo 'texto' é obrigatório");
    });
    test(' deixa detalhes undefined quando não informado ', () => {
        const erro = criarErro(400, 'Tarefa não encontrada');
        expect(erro.detalhes).toBeUndefined();
    });
});