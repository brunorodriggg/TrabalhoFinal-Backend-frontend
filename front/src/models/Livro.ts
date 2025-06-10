import { Categoria } from "./Categoria";

export interface Livro
{
    id: string;
    titulo: string;
    autor: string;
    disponivel: number;
    criadoEm: Date;
    categoria: Categoria;
    categoriaId: number;
}
