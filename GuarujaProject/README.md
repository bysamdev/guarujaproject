# Sistema de Gerenciamento - Projeto Acadêmico

Sistema web desenvolvido para disciplina de programação web, com funcionalidades de cadastro de usuários e controle de transações financeiras.

## Tecnologias Utilizadas

- Backend: C# com ASP.NET Core
- Frontend: React
- Banco de Dados: SQL Server
- ORM: Entity Framework Core

## Requisitos

- .NET 8.0 SDK
- SQL Server (LocalDB ou Express)
- Node.js (para o frontend)

## Como Executar

### Backend

1. Abra o terminal na pasta GuarujaProject
2. Configure a connection string no appsettings.json se necessário
3. Execute as migrations:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```
4. Execute o projeto:
```bash
dotnet run
```

A API estará disponível em: http://localhost:5000

### Frontend

1. Entre na pasta frontend
2. Instale as dependências:
```bash
npm install
```
3. Execute o projeto:
```bash
npm start
```

O frontend estará disponível em: http://localhost:3000

## Funcionalidades

- CRUD completo de usuários (Create, Read, Update, Delete)
- Cadastro e listagem de transações
- Relacionamento entre usuários e transações
- Interface web responsiva

## Estrutura do Projeto

```
GuarujaProject/
├── Controllers/          # Controllers da API
├── Models/              # Modelos de dados
├── Data/                # Contexto do banco de dados
├── frontend/            # Aplicação React
└── README.md
```

## Autor

Projeto desenvolvido para disciplina de programação web
