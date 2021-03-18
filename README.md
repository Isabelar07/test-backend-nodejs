<h1 align="center">
    Teste de candidato ao analista backend
</h1>

# Índice

- [Descrição](#-descrição-do-teste)
- [Endpoints criados](#-endpoints-criados)
- [Endpoints que ainda falta criar](#-endpoints-que-ainda-falta-criar)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-como-baixar-o-projeto)

## 🖋 Descrição do teste

O teste tem como desafio desenvolver uma API, usando o Node.JS, para um aplicativo de gerenciamento de catálogo de produtos. Assim, você deve analisar e converter as histórias do usuário abaixo em rotas de um aplicativo.

Histórias de usuários:

- Como usuário eu gostaria de registrar um produto para que eu possa ter acesso aos dados deste produto no futuro (Título, descrição, preço, categoria)
- Eu, como usuário, gostaria de poder associar e editar uma categoria de produto;
- Como usuário, gostaria de poder acessar a lista de todos os produtos;
- Como usuário, gostaria de poder filtrar produtos por nome ou categoria;
- Eu, como usuário, gostaria de poder atualizar os dados do produto;
- Eu, como usuário, gostaria de poder excluir um produto do meu catálogo;

---

## Endpoints criados

- Cadastrar usuário;
- Fazer login;
- Criar e listar categoria;
- Cadastrar produtos

## Endpoints que ainda falta criar

- Lista de produtos;
- Filtrar produtos por nome ou categoria;
- Atualizar dados do produto;
- Excluir um produto

---

## 🚀 Tecnologias utilizadas

o projeto foi desenvolvido usando as seguintes tecnologias:

- [Node.js](https://nodejs.org/pt-br/docs/)
- [Express.js](http://expressjs.com/pt-br/)
- [Knex](http://knexjs.org/)
- Typescript
- Cors
- MySQL
- UUID
- JSON Web Tokens 
- Bcryptjs

---

## 💾 Como baixar o projeto

- Primeiro instale o [Git](https://git-scm.com/), [Node.jS](https://nodejs.org/pt-br/download/) + [npm](https://www.npmjs.com/get-npm)
```bash
# Clonar o repositório
git clone https://github.com/Isabelar07/test-backend-nodejs.git

# Entrar no diretório
cd cookenu-Backend-NodeJs

# Instalar as dependências
yarn add

# Rodar o projeto
yarn run dev
```
---

## Tabelas criadas no Workbench

### Usuários
```sql
CREATE TABLE Test_Anotaai_User (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    email VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL
);
```

### Produtos
```sql
CREATE TABLE Test_Anotaai_Products (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Test_Anotaai_User(id) 
);
```

### Categorias
```sql
CREATE TABLE Test_Anotaai_Category (
    id varchar(255) PRIMARY KEY,
    category varchar(80) NOT NULL
);
```

### Relação de produtos e categorias
```sql
CREATE TABLE Test_Anotaai_Products_Category (
    products_id VARCHAR(255) PRIMARY KEY,
    category_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(products_id) REFERENCES Test_Anotaai_Products(id),
    FOREIGN KEY(category_id) REFERENCES Test_Anotaai_Category(id)
);
```

---

Desenvolvido com 🧡 por Isabela Rocha Silveira
