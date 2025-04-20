<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { AuthController } from '../controllers/AuthController'

const isLogin = ref(true)
const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')

const formData = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    // Validate fields first
    const validationError = isLogin.value 
      ? AuthController.validateLoginFields(formData.value)
      : AuthController.validateRegisterFields(formData.value)

    if (validationError) {
      error.value = validationError
      return
    }

    if (isLogin.value) {
      const { error: signInError } = await AuthController.login(formData.value)
      if (signInError) throw signInError
      authStore.login()
    } else {
      const { error: signUpError } = await AuthController.register(formData.value)
      if (signUpError) throw signUpError
      error.value = 'Please check your email for verification link'
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="bg-surface p-8 rounded-lg shadow-xl w-96">
      <div class="flex justify-center mb-6">
        <img src="" alt="HeronFit" class="h-16">
      </div>
      <h1 class="text-2xl font-bold mb-6 text-center text-text">HeronFit Admin Portal</h1>
      
      <div class="flex mb-6">
        <button 
          class="flex-1 py-2 rounded-l transition-colors"
          :class="isLogin ? 'bg-primary text-white' : 'bg-gray-200 text-text-light'"
          @click="isLogin = true"
        >
          Login
        </button>
        <button 
          class="flex-1 py-2 rounded-r transition-colors"
          :class="!isLogin ? 'bg-primary text-white' : 'bg-gray-200 text-text-light'"
          @click="isLogin = false"
        >
          Register
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <template v-if="isLogin">
          <div>
            <label class="block text-sm font-medium text-text-light">Email</label>
            <input 
              v-model="formData.email"
              type="email" 
              placeholder="admin@heronfit.com"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light">Password</label>
            <input 
              v-model="formData.password"
              type="password" 
              placeholder="••••••••"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
        </template>
        
        <template v-else>
          <div>
            <label class="block text-sm font-medium text-text-light">First Name</label>
            <input 
              v-model="formData.firstName"
              type="text" 
              placeholder="Juan"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light">Last Name</label>
            <input 
              v-model="formData.lastName"
              type="text" 
              placeholder="Dela Cruz"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light">Email</label>
            <input 
              v-model="formData.email"
              type="email" 
              placeholder="j.dcruz@example.com"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light">Password</label>
            <input 
              v-model="formData.password"
              type="password" 
              placeholder="••••••••"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-text-light">Confirm Password</label>
            <input 
              v-model="formData.confirmPassword"
              type="password" 
              placeholder="••••••••"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            >
          </div>
        </template>

        <div v-if="error" class="text-error text-sm">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : (isLogin ? 'Login' : 'Register') }}
        </button>
      </form>
    </div>
  </div>
</template>