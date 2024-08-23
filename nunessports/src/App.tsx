import { useState, useEffect } from 'react';

import axios from 'axios';

import "./App.css";

interface Produto {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    preco: number;
}

export function App()  {

    const [ produtos, setProdutos ] = useState<Produto[]>([]);
    const [ nome, setNome ] = useState('');
    const [ codigo, setCodigo ] = useState('');
    const [ descricao, setDescricao ] = useState('');
    const [ preco, setPreco ] = useState<number>();
    const [ editId, setEditId ] = useState<number | null>(null);


    async function fetchProdutos () {

        const response = await axios.get('http://localhost:3001/produtos');
        setProdutos(response.data);
    };

    async function handleCreateOrUpdate() {

        if (editId) {
            await axios.put(`http://localhost:3001/produtos/${editId}`, {
                nome,
                codigo,
                descricao,
                preco,
            });
        } else {
            await axios.post('http://localhost:3001/produtos', {
                nome,
                codigo,
                descricao,
                preco,
            });
        }
        fetchProdutos();
        resetForm();
    };

    function handleEdit(produto: Produto) {
        setNome(produto.nome);
        setCodigo(produto.codigo);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setEditId(produto.id);
    };

    async function handleDelete(id: number)  {
        await axios.delete(`http://localhost:3001/produtos/${id}`);
        fetchProdutos();
    };

    function resetForm() {
        setNome('');
        setCodigo('');
        setDescricao('');
        setPreco(0);
        setEditId(null);
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <div>
            <h1>Produtos Nunes Sports</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateOrUpdate() }}>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome do produto"
                    required
                />

                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Código do produto"
                    required
                />

                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição do produto"
                />

                <input
                    type="number"
                    value={preco}
                    min={0}
                    onChange={(e) => setPreco(Number(e.target.value))}
                    placeholder="Preço do produto"
                    required
                />

                <button type="submit">
                    {editId ? 'Atualizar Produto' : 'Adicionar Produto'}
                </button>

            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto) => (
                            <tr key={ produto.id }>
                                <td>{ produto.nome }</td>
                                <td>{ produto.codigo }</td>
                                <td>{ produto.descricao }</td>
                                <td>{ produto.preco } R$</td>
                                <td>
                                    <button onClick={() => handleEdit(produto)}>Editar</button>
                                    <button onClick={() => handleDelete(produto.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};