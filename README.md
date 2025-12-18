# 🔐 API de Autenticação em TypeScript

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/) 
[![Prisma](https://img.shields.io/badge/Prisma-0C344B?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/) 
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JSON Web Token](https://img.shields.io/badge/JSON_Web_Token-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---

## Índice
- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Endpoints](#endpoints)
- [Como Rodar](#como-rodar)
- [Colaboradores](#colaboradores)

---

## Descrição
Sistema de autenticação backend (API REST) desenvolvido com **TypeScript**, **Express** e **Prisma**. O projeto implementa as melhores práticas de segurança para gerenciamento de usuários, incluindo:

- **Hashing de Senhas**: Utilização de `bcrypt` para armazenamento seguro.
- **Autenticação Stateless**: Geração e verificação de tokens **JWT**.
- **Persistência**: Modelagem de usuários com **PostgreSQL**.

---

## Tecnologias
- **TypeScript** – tipagem estática e moderna
- **Node.js** – runtime do servidor
- **Express** – framework web
- **Prisma** – ORM
- **PostgreSQL** – banco relacional
- **Bcrypt** – criptografia de senhas
- **JWT** – tokens de acesso

---

## Endpoints

| Método | Endpoint    | Descrição                         | Corpo (JSON)                                     |
|--------|------------|-----------------------------------|--------------------------------------------------|
| POST   | `/register`| Criar uma nova conta de usuário   | `{ "name": "...", "email": "...", "password": "..." }` |
| POST   | `/login`   | Autenticar e receber o Token JWT | `{ "email": "...", "password": "..." }`          |

---

## Como Rodar

1. **Clone o repositório:**

```bash
git clone <URL_DO_REPOSITORIO>
cd Api-Sistema-login-Generico
```

3. **Instale as dependências:**

```bash
npm install
```


4. **Configure o Banco de Dados e JWT:**
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
SECRET="sua_chave_secreta_aqui"
```

5. **Gere o Prisma Client e rode a migration:**

```bash
npx prisma migrate dev --name init
```

6. **Inicie o servidor:**

```bash
npm run dev
```

---

## Colaboradores
- **Pedro Da Cunha** – Desenvolvedor principal  
  [![Pedro Da Cunha](https://github.com/pedro-dev15.png?size=100)](https://github.com/pedro-dev15)
