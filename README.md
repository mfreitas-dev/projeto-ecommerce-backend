# E-commerce Backend

API REST para um projeto de e-commerce, desenvolvida com **Node.js e Express**. O projeto reúne funcionalidades de gerenciamento de produtos, autenticação, criação de pedidos e integração com o Mercado Pago, utilizando MongoDB para persistência de dados.

> Projeto de estudo e portfólio, com foco no desenvolvimento backend, organização de rotas e controllers, autenticação e integração com serviços de pagamento.

## 🔗 Projeto Full Stack

Este backend faz parte de um projeto de e-commerce dividido em duas aplicações:

- **Frontend:** [projeto-ecommerce-frontend](https://github.com/mfreitas-dev/projeto-ecommerce-frontend) — interface React para navegar pelos produtos, consultar detalhes e gerenciar o carrinho.
- **Backend (este repositório):** API REST responsável pelos dados e pelas operações do lado do servidor.

A integração entre as aplicações é configurada no frontend pela variável de ambiente `VITE_API_URL`, que deve apontar para a URL da API. Consulte também o README do frontend para as instruções específicas de execução.

## ✨ Funcionalidades

- **Produtos:** listar produtos, consultar um produto por ID, cadastrar, atualizar e excluir produtos.
- **Autenticação:** endpoint de login e proteção das operações de escrita de produtos por middleware de autenticação.
- **Pedidos:** endpoint para criação de pedidos.
- **Pagamentos:** integração com o SDK do Mercado Pago e endpoint para receber notificações (webhooks).
- **Banco de dados:** conexão com MongoDB por meio do Mongoose.
- **Health check:** rota para verificar se a API está respondendo.

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) e [Mongoose](https://mongoosejs.com/)
- [Mercado Pago SDK](https://github.com/mercadopago/sdk-nodejs)
- JSON Web Token (JWT)
- bcrypt
- dotenv
- CORS
- nodemon (desenvolvimento)

## 📁 Organização do projeto

A API é inicializada em `src/server.js` e separa as rotas por domínio:

```text
.
├── config/
│   └── db.js
├── controllers/
├── middlewares/
├── routes/
│   ├── auth.routes.js
│   ├── order.routes.js
│   ├── product.routes.js
│   └── webhook.routes.js
├── src/
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

*Estrutura resumida; os controllers e middlewares implementam a lógica de cada recurso.*

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js instalado
- Uma instância MongoDB local ou um banco MongoDB acessível
- Credenciais do Mercado Pago para testar o fluxo de pagamento

### 1. Clone o repositório

```bash
git clone https://github.com/mfreitas-dev/projeto-ecommerce-backend.git
cd projeto-ecommerce-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto. Configure nele, pelo menos, as variáveis usadas pela aplicação:

```env
PORT=3000
MONGODB_URI=sua_string_de_conexao_mongodb
```

Adicione também as credenciais exigidas pela integração com o Mercado Pago, conforme a implementação local dos controllers. **Não compartilhe nem envie credenciais reais ao Git.**

### 4. Inicie o servidor

Modo de desenvolvimento, com reinicialização automática:

```bash
npm run dev
```

Ou execute:

```bash
npm start
```

O servidor usa a variável `PORT` para definir a porta. Com `PORT=3000`, o endereço local será `http://localhost:3000`.

## 🔌 Rotas disponíveis

As rotas abaixo são registradas pelo servidor em `src/server.js`.

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/health` | Verifica se a API está funcionando |
| GET | `/products` | Lista os produtos |
| GET | `/products/:id` | Busca um produto pelo ID |
| POST | `/products` | Cadastra um produto (requer autenticação) |
| PUT | `/products/:id` | Atualiza um produto (requer autenticação) |
| DELETE | `/products/:id` | Exclui um produto (requer autenticação) |
| POST | `/auth/login` | Realiza login |
| POST | `/orders` | Cria um pedido |
| POST | `/webhook/mercadopago` | Recebe notificações do Mercado Pago |

> Os formatos dos corpos das requisições, os campos obrigatórios e os exemplos de resposta dependem das implementações dos controllers. Consulte o código-fonte para esses detalhes.

## 🧪 Testes

O script de testes ainda não está configurado no `package.json`. As rotas podem ser verificadas manualmente com ferramentas como Postman ou Insomnia enquanto a suíte automatizada não é implementada.

## 🔐 Observações de segurança

- Mantenha o arquivo `.env` fora do controle de versão.
- Use credenciais de teste do Mercado Pago durante o desenvolvimento.
- Em produção, valide a autenticidade das notificações de pagamento e configure corretamente as regras de CORS e autenticação.
- Antes de disponibilizar a API publicamente, implemente testes automatizados e tratamento consistente de erros.

## 🎯 Objetivo do projeto

Este projeto faz parte da minha prática de desenvolvimento **backend com JavaScript**, com foco em APIs REST, Node.js, Express, MongoDB, autenticação e integração com pagamentos. É um projeto em evolução, voltado ao aprendizado e à construção de experiência prática.

## 👨‍💻 Autor

**Matheus Freitas**

- GitHub: [@mfreitas-dev](https://github.com/mfreitas-dev)
- [Frontend do e-commerce](https://github.com/mfreitas-dev/projeto-ecommerce-frontend)
