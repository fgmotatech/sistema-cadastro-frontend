# Sistema de Cadastro — Frontend

Interface web para cadastro, login e gerenciamento de conta, construída em HTML, CSS e JavaScript puro, consumindo uma API REST própria.

**Demo:** [crud-cadastro-frontend.netlify.app](https://crud-cadastro-frontend.netlify.app/)
**Backend deste projeto:** [sistema-cadastro-backend](https://github.com/fgmotatech/sistema-cadastro-backend)

> ⚠️ O backend está hospedado no plano gratuito do Render e pode levar até **50 segundos** para responder à primeira requisição após um período de inatividade.

## Tecnologias

- HTML5 / CSS3
- JavaScript (vanilla)
- [SweetAlert2](https://sweetalert2.github.io/) para modais de confirmação
- Fetch API para consumo da API REST

## Funcionalidades

- **Cadastro** com validação em tempo real (nome, celular com máscara automática, e-mail, senha forte)
- **Login** com token JWT armazenado na sessão
- **Dashboard** com dados do usuário logado
- **Exclusão de conta** com confirmação por e-mail (via SweetAlert2)
- Feedback de erro por campo, incluindo tratamento de conflitos vindos da API (e-mail ou celular já cadastrados)

## Estrutura do projeto

```
├── index.html                        # página inicial
├── pages/
│   ├── register/                     # tela de cadastro
│   │   ├── index.html
│   │   ├── register.js
│   │   └── style.css
│   ├── login/                        # tela de login
│   │   ├── index.html
│   │   ├── login.js
│   │   └── style.css
│   ├── dashboard/                    # área logada
│   │   ├── index.html
│   │   ├── dashboard.js
│   │   └── style.css
│   └── politica-de-privacidade/
│       └── index.html
└── assets/
    └── img/
```

## Como executar localmente

Este projeto é um site estático — não requer build nem instalação de dependências.

1. Clone o repositório:

   ```bash
   git clone https://github.com/fgmotatech/sistema-cadastro-frontend.git
   cd sistema-cadastro-frontend
   ```

2. Abra `index.html` diretamente no navegador, ou sirva a pasta com uma extensão como **Live Server** (VS Code).

3. Por padrão, o frontend consome a API já publicada em produção (`https://sistema-cadastro-backend-9csb.onrender.com`). Para rodar contra o backend local, ajuste a constante `API_URL` em:

   - `pages/register/register.js`
   - `pages/login/login.js`
   - `pages/dashboard/dashboard.js`

   ```js
   const API_URL = "http://localhost:5000";
   ```

## Fluxo de uso

1. Acesse a tela de **cadastro** e crie uma conta.
2. Faça **login** com o e-mail e senha cadastrados.
3. Acesse o **dashboard** para visualizar seus dados ou excluir a conta.

## Validações no cadastro

| Campo   | Regra                                                              |
| ------- | ------------------------------------------------------------------- |
| Nome    | Mínimo de 3 caracteres, apenas letras e espaços                    |
| Celular | 10 ou 11 dígitos, com máscara automática `(XX) XXXXX-XXXX`         |
| E-mail  | Formato válido de e-mail                                           |
| Senha   | Mínimo 7 caracteres, 1 letra maiúscula, 1 número, 1 caractere especial |

## Próximos passos

- [ ] Migrar para um framework (React/Vue) para facilitar manutenção
- [ ] Adicionar tela de recuperação de senha
- [ ] Adicionar testes end-to-end (Cypress/Playwright)