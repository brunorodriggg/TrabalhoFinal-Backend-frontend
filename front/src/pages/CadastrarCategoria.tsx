import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Categoria } from '../models/Categoria';
import './livros/cadastrar-modulo.css';

function CadastrarCategoria() {
    const { id } = useParams();

    const [nome, setNome] = useState("");

    const API_BASE_URL = "http://localhost:5275";

    useEffect(() => {
    }, []);

    function salvar (e: any) {
        e.preventDefault();
        const p = {
            nome: nome
        }
        
        if (id == null) {
            cadastrar(p);
        }
        
    }

    function cadastrar(categoria: any) {
        axios.post(`${API_BASE_URL}/api/categorias`, categoria)
        .then(response => {
            console.log(response);
            alert("Categoria cadastrada com sucesso!");
        })
        .catch( error => {
            alert("Ocorreu um erro ao cadastrar a categoria.");
        })
    }

    return (
        <div className='cad'>
            <h1>Cadastrar Categoria</h1>
            <form onSubmit={salvar}>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input
                        onChange={(e: any) => setNome(e.target.value)}
                        value={nome}
                        type="text"
                        id="nome"
                        placeholder="Digite o nome da categoria"
                        required/>
                </div>
                
                <button type="submit">
                    Salvar
                </button>
            </form>
        </div>
    );

}

export default CadastrarCategoria;