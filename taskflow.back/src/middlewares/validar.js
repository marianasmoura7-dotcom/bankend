const criarErro = require('../utils/criarErro');
function validar(schema, origem) {
    return function (req, res, next) {
        const dados = req[origem || 'body'] || {};
        const erros = [];
        for (const campo in schema) {
            const regras = schema[campo];
            const valor = dados[campo];
            const ausente = valor === undefined || valor === null || valor === '';
            if (ausente && regras.obrigatorio) {
                erros.push(`O campo ${campo} é obrigatório.`);
                continue;
            }
            if (ausente) continue;
            if (regras.tipo === "integer") {
                const numero = typeof valor === "string"
                    ? Number(valor) : valor;
                if (!Number.isInteger(numero) || numero <= 0) {
                    erros.push(`O campo '${campo}' deve ser inteiro positivo`);
                }
                else if (regras.tipo && typeof valor !== regras.tipo) {
                    erros.push(`O campo  '${campo}' deve ser do tipo ${regras.tipo}`);
                }

                if (regras.formato === 'email') {
                    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!re.test(valor))
                        erros.push(`O campo '${campo}' deve ser um email válido`);

                }
            }
            if (erros.length > 0) {
                throw criarErro(400, "Dados inválidos", erros);
            }
            next()
        };
    }
}
module.exports = validar;