<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
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
      <p>Welcome, {{ auth.user?.name }}</p>
      <p>Email: {{ auth.user?.email }}</p>
      <button @click="auth.logout">Logout</button>
    </div>
  </main>
</template>