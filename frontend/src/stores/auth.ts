import { defineStore } from 'pinia'
import { msalInstance, loginRequest } from '../auth/msal'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { name: string; email: string },
    isAuthenticated: false,
    isLoading: false
  }),
  actions: {
    async login() {
      this.isLoading = true
      try {
        const response = await msalInstance.loginPopup(loginRequest)
        this.user = {
          name: response.account.name,
          email: response.account.username
        }
        this.isAuthenticated = true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      try {
        await msalInstance.logoutPopup()
        this.user = null
        this.isAuthenticated = false
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    async handleRedirect() {
      try {
        const response = await msalInstance.handleRedirectPromise()
        if (response) {
          this.user = {
            name: response.account.name,
            email: response.account.username
          }
          this.isAuthenticated = true
        }
      } catch (error) {
        console.error('Redirect handling failed:', error)
      }
    },
    async initialize() {
      await msalInstance.initialize()
      await this.handleRedirect()
      const accounts = msalInstance.getAllAccounts()
      if (accounts.length > 0) {
        const account = accounts[0]
        this.user = {
          name: account.name,
          email: account.username
        }
        this.isAuthenticated = true
      }
    }
  }
})