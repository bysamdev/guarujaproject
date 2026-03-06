# Guaruja Project

Aplicativo web desenvolvido com frontend moderno e containerizado com Docker. Projeto voltado para gestão e organização de informações com interface intuitiva.

## Tecnologias

- **Frontend:** JavaScript
- **Infraestrutura:** Docker + Docker Compose
- **Servidor:** Nginx

## Estrutura do Projeto

```
guarujaproject/
├── GuarujaProject/     # Configurações do projeto
├── frontend/           # Aplicação frontend
├── docker-compose.yml  # Orquestração dos containers
└── .dockerignore
```

## Como rodar localmente

### Pré-requisitos

- Docker
- Docker Compose

### Instalação

```sh
git clone https://github.com/bysamdev/guarujaproject.git
cd guarujaproject
docker-compose up --build
```

A aplicação estará disponível em `http://localhost`.

## Licença

MIT
