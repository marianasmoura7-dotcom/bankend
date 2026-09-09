
function validarContentType(req, res, next) {
    const metodoComBody = ['POST', 'PUT', 'PATH'];

    if (metodoComBody.includes(req.method)) {
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(400).json({ erro: 'Content-Type deve ser application/json' });
        }
    }
    next(); // passa para o próximo middleware ou rota
}

module.exports = validarContentType;
