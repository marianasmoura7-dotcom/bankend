function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173', 'https://taskflow-beta-dun.vercel.app'); // Permitir apenas a origem específica
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400'); // Cache de 24 horas para pré-voo
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Responder imediatamente a requisições OPTIONS
    }
    next();
}

module.exports = corsMiddleware;