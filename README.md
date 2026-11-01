# BarberControl 💈

Sistema web para gestão de barbearias, focado em facilitar o agendamento de serviços para clientes, organização de horários e turnos para barbeiros e controle gerencial para administradores.

Projeto desenvolvido para a disciplina de **Engenharia de Software** do curso de **Engenharia de Sistemas** da **Universidade Estadual de Montes Claros (Unimontes)**.

---

## 📌 Sobre o Projeto

O **BarberControl** busca eliminar a necessidade de ligações ou mensagens manuais para marcação de horários. Suas principais funcionalidades incluem:

- **Clientes**: consulta de horários disponíveis, escolha de barbeiros/serviços e realização de agendamentos online.
- **Barbeiros**: acompanhamento de agenda diária e controle de disponibilidade/turnos.
- **Administrador**: painel de controle para cadastro de serviços, equipe, horários de funcionamento e relatórios gerenciais.

## 📍 Estágio atual

O projeto está na etapa inicial de integração entre frontend e backend.

### Implementado

- Frontend Next.js executando em `http://localhost:3000`.
- Login e cadastro de clientes integrados à API FastAPI.
- Backend com autenticação por JWT em cookie `httpOnly`.
- Cadastro de cliente, login, logout e consulta do usuário autenticado.
- Cadastro e listagem de barbeiros.
- CRUD de serviços, com operações administrativas protegidas.
- Banco SQLite com dados de desenvolvimento e usuários de teste.
- Proxy do frontend para as rotas `/api/*` do backend.

### Ainda não implementado

- A tela inicial está vazia; ainda não há dashboards separados para cliente, barbeiro e administrador.
- O cliente ainda não consegue marcar, consultar, cancelar ou acompanhar agendamentos pela interface.
- O barbeiro ainda não possui agenda, disponibilidade ou gerenciamento de atendimentos pela interface.
- O administrador ainda não possui painel completo, relatórios ou configuração visual de horários.
- Agendamentos e turnos existem apenas como modelos iniciais no backend, sem endpoints ou regras de negócio.
- Não há cálculo de horários disponíveis, bloqueio de conflitos, notificações ou recuperação de senha funcional.

Portanto, o sistema atualmente deve ser considerado uma **base funcional de autenticação e cadastro**, e não uma aplicação de gestão de barbearia concluída.

---

## 🛠️ Tecnologias

### Frontend
- [Next.js](https://nextjs.org/) (v16)
- [React](https://react.dev/) (v19)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Ícones)

### Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- Python 3

---

## 🚀 Como Executar

### 1. Frontend

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

```bash
# Acesse o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### 2. Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

O frontend encaminha as chamadas `/api/*` para `http://localhost:8000` por padrão.
Para usar outra URL, defina `API_URL` antes de iniciar o Next.js.

---

## 🔌 Backend

Documentação interativa: [http://localhost:8000/docs](http://localhost:8000/docs).

O banco SQLite `backend/barber.db` é criado e populado automaticamente em desenvolvimento. O seed é idempotente e cadastra os usuários abaixo quando eles ainda não existem.

| Tipo | E-mail | Senha |
|---|---|---|
| Administrador | `breno@barber.com` | `123456` |
| Barbeiro | `julio@barber.com` | `123456` |
| Barbeiro | `richard@barber.com` | `123456` |
| Cliente | `jhonatan@user.com` | `123456` |
| Cliente | `bruno@user.com` | `123456` |

### Endpoints disponíveis

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `POST` | `/api/cadastro` | Público | Cria sempre um cliente |
| `POST` | `/api/login` | Público | Valida credenciais e cria sessão |
| `POST` | `/api/logout` | Qualquer sessão | Encerra a sessão |
| `GET` | `/api/me` | Autenticado | Retorna o usuário atual |
| `GET` | `/api/servicos` | Autenticado | Lista serviços ativos |
| `POST` | `/api/servicos` | Administrador | Cadastra um serviço |
| `PATCH` | `/api/servicos/{id}` | Administrador | Atualiza um serviço |
| `DELETE` | `/api/servicos/{id}` | Administrador | Desativa um serviço |
| `GET` | `/api/barbeiros` | Autenticado | Lista barbeiros ativos |
| `POST` | `/api/barbeiros` | Administrador | Cadastra um barbeiro |

Agendamentos, turnos e relatórios ainda não possuem endpoints.

### Integração com o frontend

O frontend encaminha automaticamente chamadas `/api/*` para `http://localhost:8000`. Para usar outra URL:

```bash
API_URL=http://localhost:8000 npm run dev
```

Os erros da API seguem o formato `{ "error": "mensagem" }`, e os campos principais seguem o contrato do frontend, como `dataNascimento`, `tempoEstimado` e `type`.

## 🧭 Próximos passos sugeridos

- Criar endpoints e telas de agendamento: criar, listar, cancelar, confirmar e concluir consultas.
- Implementar turnos, horário de funcionamento e cálculo de horários disponíveis.
- Bloquear conflitos de agenda considerando a duração dos serviços.
- Criar dashboards distintos para cliente, barbeiro e administrador.
- Implementar recuperação de senha, notificações e relatórios.
- Adicionar migrations com Alembic, limite de tentativas de login e pipeline de testes.

---

## 📂 Estrutura do Projeto

```text
barber-control/
├── frontend/             # Aplicação web (Next.js + TypeScript + Tailwind)
│   ├── app/              # Páginas e rotas (App Router)
│   ├── controllers/      # Lógica de controle e regras do front
│   ├── models/           # Tipagens e modelos de dados
│   └── view/             # Componentes visuais
└── backend/              # API REST (FastAPI + SQLAlchemy)
    └── app/
        ├── controllers/  # Endpoints e rotas da API
        ├── models/       # Modelos de dados / Tabelas ORM
        ├── schemas/      # Validação e serialização de dados (Pydantic)
        └── database/     # Configuração e sessão do banco de dados
```

---

## 👥 Equipe & Colaboradores

- **Felipe Monteiro**
- **Heytor Pereira**
- **Edilson Soares**
- **Givaldo**
- **João Carlos**
- **Gabriel Soares de Freitas**

**Orientação:** Prof. Allysson Costa e Silva  
**Instituição:** Universidade Estadual de Montes Claros (Unimontes)
