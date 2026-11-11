const formatarTarefa = require('../utils/formatarTarefa');

function tarefaDoPrisma(tarefa) {
    return {
        id: 1, texto: "Definir TAbelas do banco", coluna: "afazer",
        projetos: { nome: "TaskFlow" }, usuarios: { nome: "João" }, prioridade: { descricao: "Alta", cor: "#FF0000" }
    }
}
test('achata as relaçoes no formato que o front espera', () => {
    const resultado = formatarTarefa(tarefaDoPrisma());
    expect(resultado).toEqual({
        id: 1, texto: "Definir Tabelas do banco", coluna: "afazer",
        projeto: "TaskFlow", usuario: "João", prioridade: "Alta", prioridade_cor: "#FF0000"
    });
}); 
test ('deixa o campo undefined quando a relação não veio', () => {
    const tarefa = tarefaDoPrisma();
    delete tarefa.prioridade;
    const resultado = formatarTarefa(tarefa);
    expect(resultado.prioridade).toBeUndefined();
    expect(resultado.prioridade_cor).toBeUndefined();
}); 
test ( 'não altera  a tarefa original', () => {
    const tarefa = tarefaDoPrisma();
    const resultado = formatarTarefa(tarefa);
    expect(resultado).not.toBe(tarefa);
    expect(tarefa).toHaveProperty('projetos', {nome: 'TaskFlow'});
});