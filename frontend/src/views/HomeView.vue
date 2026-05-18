<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await auth.logout()
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Office Presence App</h1>
    <div v-if="!auth.isAuthenticated">
      <button @click="auth.login" :disabled="auth.isLoading">
        {{ auth.isLoading ? 'Logging in...' : 'Login with Microsoft' }}
      </button>
    </div>
    <div v-else>
      <div class="welcome-section">
        <p>Welcome, {{ auth.user?.name }}</p>
        <p class="email">{{ auth.user?.email }}</p>
      </div>
      <div class="actions">
        <router-link to="/schedule" class="btn btn-primary">View Schedule</router-link>
        <button @click="handleLogout" class="btn btn-secondary">Logout</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.welcome-section {
  margin-bottom: 2rem;
}

.email {
  color: #666;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #0066cc;
  color: white;
}

.btn-primary:hover {
  background: #0052a3;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #e0e0e0;
}
</style>
