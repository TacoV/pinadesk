import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null as null | { name: string; email: string }
  }),
  actions: {
    setUser(userData: { name: string; email: string }) {
      this.user = userData
    }
  }
})