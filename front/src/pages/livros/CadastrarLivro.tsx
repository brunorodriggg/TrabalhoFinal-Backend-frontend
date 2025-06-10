import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Categoria } from '../../models/Categoria';
import './cadastrar-modulo.css';

function CadastrarLivro() {
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] =  useState("");
    const [disponivel, setDisponivel] = useState<number>(0);
    const [categoriaId, setCategoriaId] = useState<any>();
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const API_BASE_URL = "http://localhost:5275";

    useEffect(() => {
        carregarCategorias();
        buscarLivroPorId(id);
    }, []);

    function buscarLivroPorId(id: any) {
        if (id == null) {
            return;
        }

        axios.get(`${API_BASE_URL}/api/livros/${id}`)
        .then( response =>{
            var livro = response.data;
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setDisponivel(livro.disponivel);
            setCategoriaId(livro.categoriaId);
        })
        .catch( (error) => {
            console.log(error)
            alert("Erro ao carregar o livro.");
        });
    }

    function carregarCategorias() {
        axios.get(`${API_BASE_URL}/api/categorias`)
        .then( response =>{
            setCategorias(response.data);
            setCategoriaId(response.data[0]?.id);
        })
        .catch( () => {
            alert("Erro ao carregar as categorias.");
        });
    }

    function salvar (e: any) {
        e.preventDefault();
        const p = {
            titulo: titulo,
            autor: autor,
            disponivel: Number(disponivel),
            categoriaId: categoriaId
        }
        
        if (id == null) {
            cadastrar(p);
        } else {
            alterar(id, p);
        }
        
    }

    function cadastrar(livro: any) {
        axios.post(`${API_BASE_URL}/api/livros`, livro)
        .then(response => {
            console.log(response);
            alert("Livro cadastrado com sucesso!");
        })
        .catch( error => {
            alert("Ocorreu um erro ao cadastrar o livro.");
        })
    }

    function alterar(id: any, livro: any) {
        axios.put(`${API_BASE_URL}/api/livros/${id}`, livro)
        .then(response => {
            console.log(response);
            alert("Livro alterado com sucesso!");
        })
        .catch( error => {
            alert("Ocorreu um erro ao alterar o livro.");
        })
    }

    return (
        <div className='cad'>
            <h1>Cadastrar Livro</h1>
            <form onSubmit={salvar}>
                <div>
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        onChange={(e: any) => setTitulo(e.target.value)}
                        value={titulo}
                        type="text"
                        id="titulo"
                        placeholder="Digite o titulo do livro"
                        required/>
                </div>

                <div>
                    <label htmlFor="autor">Autor</label>
                    <textarea
                        onChange={(e: any) => setAutor(e.target.value)}
                        value={autor}
                        id="autor"
                        placeholder="Digite o autor do livro"
                        required/>
                </div>

                <div>
                    <label htmlFor="disponivel">Disponível</label>
                    <input
                        onChange={(e: any) => setDisponivel(e.target.value ? 1 : 0)}
                        type="checkbox"
                        id="disponivel"
                        placeholder="Digite a se o livro está disponível ou não"/>
                </div>

                <div>
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria"
                        onChange={(e: any) => setCategoriaId(e.target.value)}
                        value={categoriaId} >
                        {categorias.map( (item) => (
                            <option key={item.id} value={item.id} >
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </div>
                
                <button type="submit">
                    Salvar
                </button>
            </form>
        </div>
    );

}

export default CadastrarLivro;