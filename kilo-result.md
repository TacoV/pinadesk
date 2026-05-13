Done. I've implemented Azure AD Microsoft login:

## Frontend:

* src/auth/msal.ts - MSAL configuration with client ID and tenant from env
* src/stores/auth.ts - Auth store with login/logout/handleRedirect/initialize actions
* src/views/HomeView.vue - Login UI with Microsoft button that shows user info when authenticated
* src/main.ts - Initializes auth on app mount

## Backend:

* src/middleware/auth.ts - JWT validation via jwks-rsa for Azure AD tokens
* src/routes/index.ts - Added /api/auth/user endpoint

## Env vars needed:

```bash
# Frontend (.env)
VITE_AZURE_AD_CLIENT_ID=your-app-client-id
VITE_AZURE_AD_TENANT_ID=your-tenant-id

# Backend (.env)
AZURE_AD_CLIENT_ID=your-app-client-id
AZURE_AD_TENANT_ID=your-tenant-id
AZURE_AD_CLIENT_SECRET=your-app-secret
```