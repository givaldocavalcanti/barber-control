# BarberControl 💈

Sistema web para gestão de barbearias, focado em facilitar o agendamento de serviços para clientes, organização de horários e turnos para barbeiros e controle gerencial para administradores.

Projeto desenvolvido para a disciplina de **Engenharia de Software** do curso de **Engenharia de Sistemas** da **Universidade Estadual de Montes Claros (Unimontes)**.

---

## 📌 Sobre o Projeto

O **BarberControl** busca eliminar a necessidade de ligações ou mensagens manuais para marcação de horários. Suas principais funcionalidades incluem:

- **Clientes**: consulta de horários disponíveis, escolha de barbeiros/serviços e realização de agendamentos online.
- **Barbeiros**: acompanhamento de agenda diária e controle de disponibilidade/turnos.
- **Administrador**: painel de controle para cadastro de serviços, equipe, horários de funcionamento e relatórios gerenciais.

---

## 🛠️ Tecnologias

### Frontend
- [Next.js](https://nextjs.org/) (v16)
- [React](https://react.dev/) (v19)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Ícones)

### Backend *(Pendente / Em Desenvolvimento)*
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

> **Status:** ⚠️ **Pendente / Em desenvolvimento**
> A API e a modelagem do banco de dados estão sendo estruturadas com FastAPI e SQLAlchemy. Instruções de execução serão adicionadas assim que os serviços forem implementados.

---

## 📂 Estrutura do Projeto

```text
barber-control/
├── frontend/             # Aplicação web (Next.js + TypeScript + Tailwind)
│   ├── app/              # Páginas e rotas (App Router)
│   ├── controllers/      # Lógica de controle e regras do front
│   ├── models/           # Tipagens e modelos de dados
│   └── view/             # Componentes visuais
└── backend/              # API REST (FastAPI + SQLAlchemy) [Pendente]
    └── app/
        ├── controllers/  # Endpoints e rotas da API
        ├── models/       # Modelos de dados / Tabelas ORM
        ├── views/        # Schemas / Serialização de dados (Pydantic)
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
