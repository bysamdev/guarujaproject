# Guaruja Project

Aplicativo web containerizado com Docker, servidor Nginx e frontend moderno em JavaScript. Projeto voltado para gestão e organização de informações com interface intuitiva.

## Tecnologias

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

## Estrutura do Projeto

```
guaruja-project/
├── GuarujaProject/      # Configurações do projeto
├── frontend/            # Aplicação frontend
├── docker-compose.yml   # Orquestração dos containers
└── .dockerignore
```

## Como rodar localmente

### Pré-requisitos

- Docker
- Docker Compose

### Instalação

```sh
git clone https://github.com/bysamdev/guaruja-project.git
cd guaruja-project
docker-compose up --build
```

A aplicação estará disponível em `http://localhost`.

## Licença

MIT
