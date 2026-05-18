<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePresenceStore } from '@/stores/presence'

const auth = useAuthStore()
const presence = usePresenceStore()

const today = computed(() => new Date())

const thisWeekStart = computed(() => {
  const d = new Date(today.value)
  d.setDate(d.getDate() - d.getDay()) // Start on Sunday
  d.setHours(0, 0, 0, 0)
  return d
})

const thisWeekEnd = computed(() => {
  const d = new Date(thisWeekStart.value)
  d.setDate(d.getDate() + 6) // End on Saturday
  d.setHours(23, 59, 59, 999)
  return d
})

const nextWeekStart = computed(() => {
  const d = new Date(thisWeekStart.value)
  d.setDate(d.getDate() + 7)
  d.setHours(0, 0, 0, 0)
  return d
})

const nextWeekEnd = computed(() => {
  const d = new Date(nextWeekStart.value)
  d.setDate(d.getDate() + 6)
  d.setHours(23, 59, 59, 999)
  return d
})

const thisWeekDays = computed(() => generateWeekDays(thisWeekStart.value))
const nextWeekDays = computed(() => generateWeekDays(nextWeekStart.value))

function generateWeekDays(startDate: Date): Date[] {
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    days.push(d)
  }
  return days
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6
}

function isToday(date: Date): boolean {
  const t = formatDate(today.value)
  const d = formatDate(date)
  return t === d
}

function togglePresence(date: Date) {
  if (!auth.user) return
  const dateStr = formatDate(date)
  const isPresent = presence.isPresent(dateStr)
  
  if (isPresent) {
    presence.removePresent(auth.user.email, date)
  } else {
    presence.setPresent(auth.user.email, date)
  }
}

onMounted(async () => {
  if (auth.user) {
    await presence.fetchPresence(auth.user.email, thisWeekStart.value, nextWeekEnd.value)
  }
})
</script>

<template>
  <div class="schedule-container">
    <h2>Office Schedule</h2>

    <div class="week-section">
      <h3>This Week</h3>
      <div class="week-grid">
        <div
          v-for="day in thisWeekDays"
          :key="formatDate(day)"
          class="day-cell"
          :class="{
            'is-weekend': isWeekend(day),
            'is-today': isToday(day),
            'is-present': presence.isPresent(formatDate(day))
          }"
          @click="!isWeekend(day) && togglePresence(day)"
        >
          <div class="day-name">{{ dayNames[day.getDay()] }}</div>
          <div class="day-date">{{ day.getDate() }}</div>
          <div v-if="!isWeekend(day)" class="day-status">
            {{ presence.isPresent(formatDate(day)) ? '✓ In' : 'Out' }}
          </div>
        </div>
      </div>
    </div>

    <div class="week-section">
      <h3>Next Week</h3>
      <div class="week-grid">
        <div
          v-for="day in nextWeekDays"
          :key="formatDate(day)"
          class="day-cell"
          :class="{
            'is-weekend': isWeekend(day),
            'is-present': presence.isPresent(formatDate(day))
          }"
          @click="!isWeekend(day) && togglePresence(day)"
        >
          <div class="day-name">{{ dayNames[day.getDay()] }}</div>
          <div class="day-date">{{ day.getDate() }}</div>
          <div v-if="!isWeekend(day)" class="day-status">
            {{ presence.isPresent(formatDate(day)) ? '✓ In' : 'Out' }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="presence.error" class="error-message">{{ presence.error }}</div>
  </div>
</template>

<style scoped>
.schedule-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.week-section {
  margin-bottom: 3rem;
}

.week-section h3 {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.day-cell {
  aspect-ratio: 1;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.day-cell:hover:not(.is-weekend) {
  background: #f5f5f5;
  border-color: #999;
}

.day-cell.is-weekend {
  background: #fafafa;
  color: #999;
  cursor: not-allowed;
}

.day-cell.is-today {
  border-color: #0066cc;
  background: #e6f2ff;
  font-weight: bold;
}

.day-cell.is-present {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.day-cell.is-present.is-today {
  background: #a8d9b1;
  border-color: #0066cc;
}

.day-name {
  font-size: 0.75rem;
  font-weight: bold;
  color: #666;
}

.day-date {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.25rem 0;
}

.day-status {
  font-size: 0.7rem;
  margin-top: 0.25rem;
  opacity: 0.7;
}

.error-message {
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: #ffebee;
  border-radius: 4px;
}
</style>
