# MoodTracker – Plataforma de Monitoramento Emocional com IA

## 1. Título e Descrição

O **MoodTracker** é uma aplicação web desenvolvida como parte da **Global Solution FIAP 2025**, integrando front-end em React com um back-end em Java + Quarkus, banco de dados Oracle e integração com a API da OpenAI.

O objetivo da solução é oferecer acompanhamento simples e visual do estado emocional dos usuários, permitindo registrar humor, energia e carga de trabalho, além de gerar análises inteligentes e dicas de bem-estar.

## 2. Status do Projeto

- Front-end: concluído e integrado.
- Back-end: concluído e publicado.
- Banco Oracle: operacional.
- IA (OpenAI): funcional.
  Estado atual: **concluído para fins acadêmicos (Global Solution)**.

## 3. Sumário

1. Título e Descrição
2. Status do Projeto
3. Sumário
4. Sobre o Projeto
5. Tecnologias Utilizadas
6. Instalação
7. Como Usar
8. Estrutura de Pastas
9. Endpoints Principais
10. Autores e Créditos
11. Contato
12. Video

## 4. Sobre o Projeto

O MoodTracker possibilita:

- Criação de usuários
- Registro de check-ins
- Análises com IA
- Visualização de risco
- Geração de dicas aleatórias
- Feedbacks
- Tema claro/escuro (Context API)
- Total responsividade

## 5. Tecnologias Utilizadas

### Front-end

React, Vite, TypeScript, TailwindCSS, Context API, Router DOM.

### Back-end

Java 17, Quarkus, JAX‑RS, JPA, JDBC, Oracle DB, OpenAI API.

### Infraestrutura

Vercel (front), Render (back), Oracle FIAP.

## 6. Instalação

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd moodtracker-frontend
npm install
```

Criar `.env`:

```env
VITE_API_BASE_URL=https://hylia-moodtracker.onrender.com
```

Rodar:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## 7. Como Usar

### URL da aplicação (Vercel)

`https://hylia-moodtracker.vercel.app/`

### URL da API (Render)

`https://hylia-moodtracker.onrender.com`

Fluxo:

1. Criar usuário
2. Registrar check-in
3. Analisar com IA
4. Visualizar risco e feedbacks

## 8. Estrutura de Pastas

```txt
.
├─ style/
│  └─ style.css
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ context/ThemeContext.tsx
   ├─ lib/api.ts
   ├─ layout/MainLayout.tsx
   ├─ pages/{HomePage,AboutPage}.tsx
   └─ assets/images/
```

## 9. Endpoints Principais

### Usuários

POST /users  
GET /users/{id}

### Check-ins

POST /users/{id}/checkins  
GET /users/{id}/checkins

### Análise IA

POST /users/checkins/{id}/analysis

### Dicas

GET /tips/random

### Feedback

POST /feedbacks  
GET /feedbacks/users/{id}

### Configurações

GET /config/users/{id}  
POST /config

## 10. Autores e Créditos

| Nome | RM  | Turma | Função | GitHub | LinkedIn |
| --- | --- | --- | --- | --- | --- |
| Gustavo Crevelari Porto | 561408 | 1TDSPO | Back-end, IA, Arquitetura | https://github.com/GusCrevelari | https://linkedin.com/in/gustavocrevelari |
| Rafaela Ferreira Santos | 561671 | 1TDSPO | Saúde, UX, Conteúdo | https://github.com/fsrafaela | https://linkedin.com/in/rafaela-ferreira-santos-8470051b7 |
| Lucca de Araujo Gomes | 561996 | 1TDSPO | Dados, Testes, Documentação | https://github.com/LuArGo | https://linkedin.com/in/luccaagomes02 |


## 11. Contato

### Gustavo Crevelari Porto

RM: 561408 — Turma: 1TDSPO  
GitHub: https://github.com/GusCrevelari  
LinkedIn: https://linkedin.com/in/gustavocrevelari

### Rafaela Ferreira Santos

RM: 561671 — Turma: 1TDSPO  
GitHub: https://github.com/fsrafaela  
LinkedIn: https://linkedin.com/in/rafaela-ferreira-santos-8470051b7

### Lucca de Araujo Gomes

RM: 561996 — Turma: 1TDSPO  
GitHub: https://github.com/LuArGo  
LinkedIn: https://linkedin.com/in/luccaagomes02

## 12. Video

### Video Pitch

https://www.youtube.com/watch?v=EjGmsHIYzlc

### Video Demo

https://www.youtube.com/watch?v=hA0fVkPOPBE
