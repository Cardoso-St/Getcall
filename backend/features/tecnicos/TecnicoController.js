import jwt from 'jsonwebtoken'

export const criarTecnico = async (req, res) => {
    const { nome, email, telefone, senha, formaçao, especialidade, horarioDeAtendimento, } = req.body;
    try {
        console.log('Tentativa de criar cliente:', { email, role });

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        }

        const emailExistente = await Cliente.findOne({ where: { email } });
        if (emailExistente)
            return res.status(400).json({ error: 'E-mail já cadastrado.' });

        const newCliente = await Cliente.create({ nome, email, senha, role: role || 'cliente' });
        res.status(201).json({ message: 'cliente criado com sucesso.', cliente: { nome, email, role } });

    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};