# CLAUDE.md — Office Presence App

This file is context for Claude Code. It describes architecture decisions, conventions, and workflow rules — not how to run the project (see README.md).

## Architecture

Single repo, two deployable units:

- **Frontend:** Vue 3 + Vite + TypeScript → Azure Static Web Apps
- **Backend:** Node.js + Express + TypeScript → Docker → Azure Container Apps
- **Database:** SQLite (dev) / Azure Database for PostgreSQL (prod) — swapped via `DATABASE_URL`
- **Auth:** Azure AD (Entra ID), MSAL.js on frontend, JWT validation via `jwks-rsa` on backend

## Repo Structure

```
/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── stores/         # Pinia
│   │   └── main.ts
│   ├── staticwebapp.config.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── modules/
│   │   │   ├── presence/
│   │   │   ├── orders/
│   │   ├── middleware/     # auth, error handling
│   │   ├── db/             # Prisma client
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       ├── frontend.yml    # Azure Static Web Apps deploy
│       └── backend.yml     # build → ACR → Container Apps
│
├── README.md
└── CLAUDE.md
```

## Database Rules

- Use Prisma for **all** DB access — no raw SQL
- Keep schema compatible with both SQLite and PostgreSQL — avoid Postgres-only column types
- Migrations: `prisma migrate dev` locally, `prisma migrate deploy` in CI
- Migrations live in `backend/prisma/migrations/` and are committed to the repo

## Code Conventions

- TypeScript strict mode in both frontend and backend
- ESLint + Prettier enforced — don't leave lint errors
- Vue components use `<script setup>` style only
- Pinia for all frontend state
- Express routes stay thin — logic lives in module files under `modules/`
- Error responses always: `{ error: string, code?: string }`
- All timestamps in UTC, ISO 8601 format
- Environment variables documented in `.env.example` — never hardcode secrets

## Auth Rules

- Frontend: PKCE flow via `@azure/msal-browser` — no client secret in browser
- Backend: validate Azure AD JWTs on every protected route via middleware

## CI/CD

- `frontend.yml`: triggers on push to `main` or PR touching `frontend/` — installs, builds, deploys to Azure Static Web Apps. PRs get a preview URL.
- `backend.yml`: triggers on push to `main` touching `backend/` — builds, runs tests, builds Docker image, pushes to ACR, deploys to Container Apps
- `main` branch must always be deployable

## Workflow

- **Issues:** created in GitHub with labels (`feature`, `bug`, `chore`)
- **Branches:** `feat/short-description` or `fix/short-description`
- **PRs:** reference the issue number, CI must pass before merge
- **Claude Code:** reference the issue number in your prompt for traceability

## Key Commands

```bash
# Frontend
cd frontend && npm run dev
cd frontend && npm run build

# Backend
cd backend && npm run dev
cd backend && npm run build
cd backend && npm test

# Database
cd backend && npx prisma migrate dev --name <name>
cd backend && npx prisma studio
```
