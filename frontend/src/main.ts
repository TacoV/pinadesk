import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const auth = useAuthStore()
auth.initialize().catch(error => {
  console.error('Auth initialization failed:', error)
})