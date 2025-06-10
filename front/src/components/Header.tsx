import {Link} from 'react-router-dom';
import './styles.css';

function Header() {

    return (
        <header>
            <nav className="navbar">
                <div className="logo">Livros</div>
                    <ul className="nav-links">
                        <li>
                            <Link to="/pages/livros/listar">
                                Listar livros da Biblioteca
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/livros/cadastrar">
                                Cadastro de novos livros
                            </Link>
                        </li>
                        <li>
                            <Link to="/pages/categorias/cadastrar">
                                Cadastro de novas categorias
                            </Link>
                        </li>
                    </ul>
                </nav>
        </header>
    )
}

export default Header;