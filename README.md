# Projeto Boscov — Backend

API RESTful para gerenciamento de **usuários**, **filmes** e **avaliações**, desenvolvida com Node.js, Express, Prisma e JWT.
Este repositório contém apenas o **backend** do projeto.

> 🔗 Repositório oficial: [github.com/dxyrell/Projeto-Boscov](https://github.com/dxyrell/Projeto-Boscov)

---

## ✨ Tecnologias utilizadas

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Zod](https://zod.dev/) — validação de dados
* [JWT](https://jwt.io/) — autenticação
* [Swagger](https://swagger.io/tools/swagger-ui/) — documentação interativa da API
* [CORS](https://expressjs.com/en/resources/middleware/cors.html) — integração segura com o frontend

---

## ⚙️ Pré-requisitos

* Node.js instalado (v18+)
* PostgreSQL rodando localmente
* Git
* npm ou yarn

---

## 🛠️ Instalação do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/dxyrell/Projeto-Boscov.git
cd Projeto-Boscov
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bancodados"
JWT_SECRET="segredo-super-seguro"
```

Substitua com as credenciais reais do seu banco.

---

## 📆 Configuração do Prisma

### 1. Gerar o client do Prisma

```bash
npx prisma generate
```

### 2. Rodar a migration (criar tabelas)

```bash
npx prisma migrate dev --name init
```

> Isso criará as tabelas no banco e um histórico da migration.

---

## ▶️ Iniciando o Servidor

```bash
npm start
```

Servidor iniciado em: `http://localhost:3000`

---
## ▶️ Acessando prisma

```bash
npx prisma studio
```

Servidor iniciado em: `http://localhost:5555`

---


## 📒 Acessando o Swagger (Documentação)

Com o servidor rodando, acesse:

```
http://localhost:3000/api-docs
```

Nessa interface você pode:

* Testar os endpoints
* Realizar login
* Copiar o token de autenticação
* Clicar no botão 🔐 Authorize e inserir o token para acessar rotas protegidas

---

## 🔐 Autenticação com JWT

Faça login via:

```http
POST /auth/login
```

Copie o token de resposta e use nas rotas protegidas no Swagger:

```
Bearer SEU_TOKEN_AQUI
```

---

## 🧪 Funcionalidades

### 👤 Usuários

* Criar usuário (`POST /user`)
* Listar todos (admin) ou um (`GET /user/:id`)
* Editar apenas o próprio usuário
* Deletar apenas com permissão de admin

### 🎬 Filmes

* Criar filme (`admin`)
* Listar todos os filmes (`GET /movies`)

### ⭐ Avaliações

* Criar avaliação para filme
* Ver avaliação por usuário e filme
* Atualizar e deletar apenas se for o autor

---

## 📂 Estrutura de Pastas

```
Projeto-Boscov/
├── src/
│   ├── auth/               → login e geração de tokens
│   ├── middlewares/        → verificação de token e autorização
│   ├── users/
│   ├── movies/
│   ├── reviews/
│   └── prisma/             → prismaClient.js
├── prisma/                 → migrations e schema.prisma
├── .env
├── swaggerConfig.js
├── package.json
└── README.md
```

---

## ✉️ CORS habilitado para o Frontend

Para permitir a comunicação segura com o frontend, o middleware `cors` está habilitado no `app.js`. Ele aceita requisições do domínio onde o frontend estiver hospedado.

---

## 📄 Licença

Projeto desenvolvido por **Lucas Andrade Dayrell**.
Distribuído sob a licença MIT.
© 2025 - Todos os direitos reservados.

---
