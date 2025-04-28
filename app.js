import express from 'express';
import knexdb from './knexfile.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.post('/jogos', async (req, res) => {
    const { nome, genero, estudio, data_lancamento } = req.body;

    console.log("Dados recebidos:", req.body);

    if (!nome || !genero || !estudio || !data_lancamento) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        await knexdb('jogos').insert({
            nome,
            genero,
            estudio,
            data_lancamento
        });
        res.status(201).send("Novo jogo cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar o jogo.");
    }
});

app.get('/jogos', async (req, res) => {
    try {
        const jogos = await knexdb('jogos').select('*');
        res.json(jogos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao recuperar a lista de jogos.");
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
