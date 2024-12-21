# Sistema de Gerenciamento de Produtos

Um aplicativo web fullstack para gerenciamento de produtos, com frontend em React e backend em Node.js. O sistema permite criar, visualizar, editar e deletar produtos (CRUD) com uma interface moderna e responsiva.

## Tecnologias utilizadas e motivos para seu uso:

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces de usuário interativas e reativas
- **TypeScript**: Adiciona tipagem estática ao JavaScript, aumentando a segurança e manutenibilidade do código
- **TailwindCSS**: Framework CSS utilitário para estilização rápida e consistente
- **React Query (TanStack Query)**: Gerenciamento de estado e cache para dados do servidor, otimizando requisições
- **Axios**: Cliente HTTP para realizar requisições à API de forma simplificada
- **React Hook Form**: Biblioteca para gerenciamento de formulários com validação e performance otimizada
- **Vite**: Ferramenta que oferece um desenvolvimento mais rápido e melhor performance

### Backend
- **Node.js**: Ambiente de execução JavaScript do lado do servidor
- **Express**: Framework web minimalista para Node.js, facilitando a criação de APIs
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional robusto e confiável
- **Cors**: Middleware para habilitar o compartilhamento de recursos entre diferentes origens

## Funcionalidades
- Cadastro de produtos
- Listagem de produtos
- Edição de produtos existentes
- Exclusão de produtos
- Validação de formulários
- Interface responsiva


## API Endpoints

A API REST possui os seguintes endpoints:

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Retorna um produto específico
- `POST /api/products` - Cria um novo produto
- `PUT /api/products/:id` - Atualiza um produto existente
- `DELETE /api/products/:id` - Remove um produto


# Instalação Rápida

## Pré-requisitos
- Node.js (https://nodejs.org)
- PostgreSQL (https://www.postgresql.org/download/)

## Passos

1. Clone o projeto e instale as dependências:
npm install
cd ../frontend e cd../backend
npm install (em ambos)

2. Crie um banco no PostgreSQL. No backend, crie arquivo .env:
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco"

3. Após, abra os dois terminais (front e back), e o sistema estará funcionando.

