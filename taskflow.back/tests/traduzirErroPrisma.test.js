const traduizrErroPrisma =  require('../utils/traduzirErroPrisma');
const erroP2002 = { code: 'P2002', meta: { target: ['email'] } };
const erroP2003 = { code: 'P2003' };
describe('traduizrErroPrisma', () => { 
test ('P2025(registro não encontrado) vira 404', () => {
    const erroPrisma = { code: 'P2025' };
    const erro = traduizrErroPrisma(erroPrisma, 'PUT');
    expect (erro.status).toBe(404);
   
});
test( 'P2002(valor repetido) vira 409 e diz o campo que está duplicado', () => {
    const erro = traduizrErroPrisma(erroP2002, 'POST');
    expect (erro.status).toBe(409);
    expect (erro.detalhes).toEqual(['Valor repetido em: email']);
});

test( 'P2003 ao gravar (POST) vira 400 ', () => { 
    expect (erro.status).toBe(400);
});

});