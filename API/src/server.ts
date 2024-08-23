import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// CRUD operations -->

app.post('/produtos', async (req: Request, res: Response) => {
    const { nome, codigo, descricao, preco } = req.body;
    try {
        const produto = await prisma.produto.create({
            data: { nome, codigo, descricao, preco }
        });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/produtos', async (req: Request, res: Response) => {

    try {

        const produtos = await prisma.produto.findMany();

        res.json(produtos);

    } catch (error) { res.status(500).json({ error: 'Internal Server Error' }) }
});

app.put('/produtos/:id', async (req: Request, res: Response) => {

    const { id } = req.params;
    const { nome, codigo, descricao, preco } = req.body;

    try {
        const produto = await prisma.produto.update({

            where: { id: Number(id) },
            data: { nome, codigo, descricao, preco }

        });

        res.json(produto);

    } catch (error) { res.status(500).json({ error: 'Internal Server Error' }) }
});

app.delete('/produtos/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        await prisma.produto.delete({
            where: { id: Number(id) }
        });

        res.status(204).send();

    } catch (error) { res.status(500).json({ error: 'Internal Server Error' }) }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});