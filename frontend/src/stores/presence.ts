import { defineStore } from 'pinia'

export interface Presence {
  id: string
  userId: string
  date: string
}

export const usePresenceStore = defineStore('presence', {
  state: () => ({
    presences: [] as Presence[],
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    presencesByDate: (state) => {
      return Object.fromEntries(state.presences.map(p => [p.date.split('T')[0], p]))
    },
    
    isPresent: (state) => (date: string) => {
      const dateStr = new Date(date).toISOString().split('T')[0]
      return state.presences.some(p => p.date.split('T')[0] === dateStr)
    }
  },

  actions: {
    async fetchPresence(userId: string, startDate: Date, endDate: Date) {
      this.isLoading = true
      this.error = null
      try {
        const start = startDate.toISOString().split('T')[0]
        const end = endDate.toISOString().split('T')[0]
        const response = await fetch(
          `/api/presence/${userId}?startDate=${start}&endDate=${end}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          }
        )
        if (!response.ok) throw new Error('Failed to fetch presence')
        this.presences = await response.json()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error fetching presence:', err)
      } finally {
        this.isLoading = false
      }
    },

    async setPresent(userId: string, date: Date) {
      try {
        const response = await fetch(`/api/presence/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({ date: date.toISOString() })
        })
        if (!response.ok) throw new Error('Failed to set presence')
        const presence = await response.json()
        const index = this.presences.findIndex(p => p.date === presence.date)
        if (index >= 0) {
          this.presences[index] = presence
        } else {
          this.presences.push(presence)
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error setting presence:', err)
      }
    },

    async removePresent(userId: string, date: Date) {
      try {
        const response = await fetch(`/api/presence/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({ date: date.toISOString() })
        })
        if (!response.ok) throw new Error('Failed to remove presence')
        const dateStr = date.toISOString().split('T')[0]
        this.presences = this.presences.filter(p => p.date.split('T')[0] !== dateStr)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
        console.error('Error removing presence:', err)
      }
    }
  }
})
