import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


import axios from 'axios';

import './listar-modulo.css';
import { Livro } from '../../models/Livro';
import { Link } from 'react-router-dom';


function ListarLivros() {
    const [livros, setLivros] = useState<Livro[]>([]);

    const API_BASE_URL = "http://localhost:5275";

    const navigate = useNavigate();

    useEffect(() => {
        carregarLivros();
    }, []);

    function carregarLivros() {
        axios.get(`${API_BASE_URL}/api/livros`)
        .then( response =>{
            setLivros(response.data);
            console.table(response.data);
        })
        .catch( () => {
            alert("Não foi possivel carregar a lista de livros ou ela está vazia.");
        });
    }

    function remover(id: string) {
        axios.delete(`${API_BASE_URL}/api/livros/${id}`)
        .then( () => {
            alert("Livro removido com sucesso!");
            carregarLivros();
        })
        .catch( () => 
            alert("Não foi possivel remover o livro.")
        )
    }

    return (
        <div>
            <h1>Lista de Livros</h1>

            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Nome</td>
                        <td>Autor</td>
                        <td>Categoria</td>
                        <td>Disponivel</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.categoria.nome}</td>
                            <td>{livro.disponivel == 1 ? "Sim" : "Não"}</td>
                            <td>
                                <button className="remover"
                                        onClick={() => remover(livro.id)}>
                                    Remover
                                </button>
                                <button className="alterar"
                                        onClick={() => navigate(`/pages/livros/alterar/${livro.id}`) }>
                                    Alterar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

};

export default ListarLivros;