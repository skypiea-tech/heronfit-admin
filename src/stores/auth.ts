import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
  const lastActivity = ref(Date.now())
  const inactivityTimeout = 30 * 60 * 1000 // 30 minutes

  watch(isAuthenticated, (newValue) => {
    localStorage.setItem('isAuthenticated', newValue.toString())
  })

  const login = () => {
    isAuthenticated.value = true
    lastActivity.value = Date.now()
    router.push('/dashboard')
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    router.push('/authentication')
  }

  const updateActivity = () => {
    lastActivity.value = Date.now()
  }

  const checkInactivity = () => {
    const now = Date.now()
    if (now - lastActivity.value > inactivityTimeout) {
      logout()
    }
  }

  // Set up activity monitoring
  if (typeof window !== 'undefined') {
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      window.addEventListener(event, updateActivity)
    })

    setInterval(checkInactivity, 60000) // Check every minute
  }

  return {
    isAuthenticated,
    login,
    logout,
    updateActivity
  }
})