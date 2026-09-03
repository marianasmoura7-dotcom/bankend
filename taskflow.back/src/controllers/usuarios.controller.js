let usuarios = [];
let proximoUsuario = 1;

const usuariosController = {
    listar(req, res) {
        const { nome } = req.query;
        let resul = usuarios;
        if (nome) resul = usuarios.filter(u => u.nome === nome);
        res.json(resul);
    },

    buscarPorId(req, res) {
        const id = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === id);
        if (!usuario) return res.status(404).json({ erro: 'usuario não encontrada' });
        res.json(usuario);
    },

    criar(req, res) {
        const { nome, email } = req.body;
        if (!nome || !email) return res.status(400).json({ erro: 'Nome e email obrigatórios' });
        if (usuarios.find(u => u.email === email))
            return res.status(400).json({ erro: 'Email já cadastrado' });
        const novo = { id: proximoId++, nome, email };
        usuarios.push(novo);
        res.status(201).json(novo);
    },

    atualizar(req, res) {
        const id = parseInt(req.params.id);
        const idx = usuarios.findIndex(u => u.id === id); // Busca o usuário na lista
        if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' }); // Retorna 404 se não achar
        usuarios[idx] = { ...usuarios[idx], ...req.body, id }; // Atualiza os dados mantendo o ID original
        res.json(usuarios[idx]); // Retorna o usuário atualizado
    },

    remover(req, res) {
        const id = parseInt(req.params.id);
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return res.status(404).json({ erro: 'usuario não encontrada' });
        const removido = tarefas.splice(idx, 1)[0];
        res.json({ mensagem: 'usuario removido', usuario: removido });
    },

}

module.exports = usuariosController;
