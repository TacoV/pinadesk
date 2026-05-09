# Office Presence App

Company website to manage office presence and lunch orders.

## First user stories 

- Everyone authenticates with Microsoft account
- People can mark per day whether they expect to to be in the office
- Backoffice can mark the days that lunch is provided
- People can note their default lunch order
- People can adjust their 
- Backoffice can easily see for who to order lunch
- Mark yourself as available or busy for meetings
- Telegram bot for quick status updates (`/whoisin`, `/available`, ...)
- SSO via your Microsoft (Azure AD) account — no separate login

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 + Vite + TypeScript |
| Hosting | Azure Static Web Apps |
| Backend | Node.js + Express + TypeScript |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Auth | Azure AD (Entra ID) |

---

## Prerequisites

- Node.js `>=20`
- npm `>=10`
- Docker Desktop (for backend local dev)
- _[Azure CLI — optional, needed for prod deployments]_

---

## Getting started

```bash
# 1. Clone
git clone https://github.com/your-org/office-presence.git
cd office-presence

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

---

## Telegram bot (local dev)

To test the Telegram webhook locally you need to expose your backend publicly:

```bash
ngrok http 3000
# Then register the webhook:
# https://api.telegram.org/bot<TOKEN>/setWebhook?url=<NGROK_URL>/telegram/webhook
```

---

## Environment variables

See `backend/.env.example` and `frontend/.env.example` for all variables and descriptions.

---

## Deployment

Deployments are automated via GitHub Actions on push to `main`.

| Target | Workflow | Trigger |
|---|---|---|
| Frontend | `.github/workflows/frontend.yml` | push to `main` / any PR |
| Backend | `.github/workflows/backend.yml` | push to `main` |

PRs automatically get a frontend preview URL from Azure Static Web Apps.

_[TODO: Azure setup steps — Static Web Apps resource, Container Apps, ACR — or link to internal wiki]_

---

## Contributing

1. Pick or create a GitHub issue
2. Branch off `main`: `feat/short-description` or `fix/short-description`
3. Open a PR referencing the issue number
4. CI must pass before merge

See `CLAUDE.md` for architecture decisions and coding conventions.

---

## License

_[TODO: Define — internal/private or open source]_
