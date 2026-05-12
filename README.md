# Office Presence App

Company website to manage office presence and lunch orders.

## First user stories

* Everyone authenticates with Microsoft account
* People can mark per day whether they expect to to be in the office
* Backoffice can mark the days that lunch is provided
* People can set their default lunch order
* People can adjust their lunch order per relevant day
* Backoffice can easily see for who to order lunch

## Tech stack

| Layer    | Technology                       |
| -------- | -------------------------------- |
| Frontend | Vue 3 + Vite + TypeScript        |
| Hosting  | Azure Static Web Apps            |
| Backend  | Node.js + Express + TypeScript   |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Auth     | Azure AD (Entra ID)              |

## Prerequisites

* Node.js `>=20`
* npm `>=10`
* Docker Desktop (for backend local dev)
* *[Azure CLI — optional, needed for prod deployments]*

## Getting started

```bash
# 1. Clone
git clone https://github.com/TacoV/pinadesk.git
cd pinadesk

# 2. Install dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 3. Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit both .env files — see comments inside

# 4. Set up the database
cd backend && npx prisma migrate dev

# 5. Start backend
cd backend && npm run dev

# 6. Start frontend (new terminal)
cd frontend && npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

## Data model

We have Users (all our colleagues), Lunch Options (the list from the bistro), and Lunch Days (days that lunch is provided).
Users can mark themself present any weekday, and if that day is a Lunch Day, an Lunch Order gets prepared, using their default settings.
Orders can be updated. If a Lunch Day is added, the existing present colleagues also get a Lunch Order prepared.

## Environment variables

See `backend/.env.example` and `frontend/.env.example` for all variables and descriptions.

## Deployment

Deployments are automated via GitHub Actions on push to `main`.

| Target   | Workflow                         | Trigger                 |
| -------- | -------------------------------- | ----------------------- |
| Frontend | `.github/workflows/frontend.yml` | push to `main` / any PR |
| Backend  | `.github/workflows/backend.yml`  | push to `main`          |

PRs automatically get a frontend preview URL from Azure Static Web Apps.

*[TODO: Azure setup steps — Static Web Apps resource, Container Apps, ACR — or link to internal wiki]*

## Contributing

1. Pick or create a GitHub issue
2. Branch off `main`: `feat/short-description` or `fix/short-description`
3. Open a PR referencing the issue number
4. CI must pass before merge

See `CLAUDE.md` for architecture decisions and coding conventions.

## Packages explanation

### Frontend
**Dependencies:**
- `vue`: Vue 3 framework
- `vue-router`: Vue 3 Routing
- `pinia`: Vue 3 State management
- `@azure/msal-browser`: Microsoft Authentication Library for handling Azure AD authentication

**Dev dependencies:**
- `eslint` and `eslint-plugin-vue`: [ESLint plugin](https://vuejs.org/guide/scaling-up/tooling.html#linting) for linting
- `vite` and `@vitejs/plugin-vue`: [Build tool](https://vite.dev/) and corresponding [Vite plugin](https://vuejs.org/guide/scaling-up/tooling.html#vitejs-plugin-vue)
- `typescript` and `vue-tsc`: [Vue TypeScript](https://vuejs.org/guide/typescript/overview.html#overview)

### Backend
**Dependencies:**
- `express`: [Web framework](https://expressjs.com/) for Node.js
- `helmet`: [Security](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet) middleware
- `cors`: [Cross-Origin](https://github.com/expressjs/cors#readme) middleware
- `dotenv`: [Loads environment variables](https://github.com/motdotla/dotenv#readme) from .env file
- `@prisma/adapter-better-sqlite3`: Prisma adapter for [better-sqlite3](https://www.prisma.io/docs/orm/v6/overview/databases/sqlite#using-the-better-sqlite3-driver) (SQLite)
- `@prisma/client`: [Prisma ORM client](https://www.prisma.io/docs/orm/prisma-client) for database access
- `jsonwebtoken`: [JWT implementation](https://github.com/auth0/node-jsonwebtoken#readme) for authentication
- `jwks-rsa`: [Library](https://github.com/auth0/node-jwks-rsa#readme) to retrieve RSA signing keys from JWKS endpoint

**Dev dependencies:**
- `@types/better-sqlite3`: TypeScript definitions for better-sqlite3
- `@types/express`: TypeScript definitions for Express
- `@types/jest`: TypeScript definitions for Jest
- `@types/node`: TypeScript definitions for Node.js
- `eslint`: JavaScript/TypeScript linter
- `prisma`: Prisma ORM CLI and runtime
- `ts-node`: TypeScript execution environment for Node.js
- `tsx`: TypeScript execution environment (used for dev)
- `typescript`: TypeScript compiler

## License

This project is licensed under the GNU GPL v3.0 — see the LICENSE file for details.