## Trabalho Final – Sistema de Cadastro de Livros

Este repositório contém o projeto final de uma aplicação web desenvolvida com ASP.NET Core no back-end e React no front-end. O sistema permite o cadastro e a listagem de livros, com funcionalidades básicas de integração entre as duas partes via API RESTful.

- Funcionalidades

Cadastro de livros com título, autor, categoria e disponibilidade
Comunicação entre front-end e back-end via API
Navegação de páginas com React Router
Validação e organização dos dados do formulário

- Pré-requisitos

Para executar o projeto corretamente, você precisa ter instalado:

- Visual Studio (com suporte a ASP.NET)
- .NET SDK (versão compatível com o projeto)
- Node.js e npm (para rodar o front-end)
- React Router (instalado via npm)

### Como executar o projeto

1. Rodar o back-end (ASP.NET Core)

- Abra o Visual Studio.
- Vá até a pasta backend (biblioteca REST).
- Dentro dela, abra o projeto que está na subpasta BibliotecaRest.
- Localize e abra o arquivo Program.cs para revisar a configuração se necessário.
- Execute o aplicativo (Ctrl + F5 ou botão de play).
- O back-end será iniciado, normalmente acessível via https://localhost:xxxx (a porta depende da configuração do projeto).

2. Rodar o front-end (React)
- Abra um terminal e navegue até a pasta frontend:
cd frontend
- Instale as dependências:
npm install
- Instale o React Router:
npm install react-router-dom
- Execute a aplicação:
npm start

A aplicação será iniciada normalmente em http://localhost:3000.


