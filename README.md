# Blink Backend

Blink é um encurtador de URLs desenvolvido por [@diego-aquino](https://github.com/diego-aquino) durante a disciplina de
Programação Web 2 2024.1, no curso de Ciência da Computação da UFCG. Nesse sistema, uma URL encurtada é chamada de
_blink_.

## Executando o projeto

### Pré-requisitos

- [Node v20.17.0](https://nodejs.org)
- [pnpm v9.9.0](https://pnpm.io)

> O repositório do backend deve estar clonado em `blink-backend` e configurado como descrito em
> [`blink-backend#README.md`](https://github.com/diego-aquino/blink-backend).
>
> ```
> .
> ├── blink-backend
> └── blink-frontend
> ```

1. Clone o repositório:

   ```bash
   git clone git@github.com:diego-aquino/blink-frontend.git
   cd blink-frontend
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Inicie o backend:

   ```bash
   pnpm deps:up

   ```

4. Em outro terminal, inicie o frontend:

   ```bash
   pnpm dev
   ```

A página web estará disponível em `http://localhost:3000`.
