<template>
  <div v-if="showAuth" class="fixed inset-0 flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
      <!-- Header with logo -->
      <div class="text-center">
        <div class="bg-indigo-600 rounded-full p-4 inline-flex mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <h2 class="mt-4 text-2xl font-bold text-gray-900">HeronFit Admin Portal</h2>
      </div>
      
      <!-- Tab buttons -->
      <div class="flex space-x-4 mt-6 mb-6">
        <button 
          @click="activeTab = 'login'"
          :class="[
            'w-full py-2 px-4 font-medium rounded-md focus:outline-none',
            activeTab === 'login' 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          ]"
        >
          Login
        </button>
        <button 
          @click="activeTab = 'register'"
          :class="[
            'w-full py-2 px-4 font-medium rounded-md focus:outline-none',
            activeTab === 'register' 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          ]"
        >
          Register
        </button>
      </div>
      
      <!-- Dynamic form content based on active tab -->
      <div v-if="activeTab === 'login'" class="space-y-6">
        <div>
          <label for="email" class="block text-gray-700 text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="admin@heronfit.com"
          />
        </div>
        
        <div>
          <label for="password" class="block text-gray-700 text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="********"
          />
        </div>

        <div>
          <button
            @click="handleLogin"
            class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </div>
      
      <div v-if="activeTab === 'register'" class="space-y-6">
        <div>
          <label for="reg-name" class="block text-gray-700 text-sm font-medium">Full Name</label>
          <input
            id="reg-name"
            v-model="name"
            type="text"
            required
            class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label for="reg-email" class="block text-gray-700 text-sm font-medium">Email</label>
          <input
            id="reg-email"
            v-model="email"
            type="email"
            required
            class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label for="reg-password" class="block text-gray-700 text-sm font-medium">Password</label>
          <input
            id="reg-password"
            v-model="password"
            type="password"
            required
            class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="********"
          />
        </div>
        
        <div>
          <label for="confirm-password" class="block text-gray-700 text-sm font-medium">Confirm Password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            required
            class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="********"
          />
        </div>

        <div>
          <button
            @click="handleRegister"
            class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeronFitAuth',
  data() {
    return {
      showAuth: true,
      activeTab: 'login',
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleLogin() {
      // Hide the form when login button is clicked
      this.showAuth = false;
      
      // You would add actual authentication logic here
      console.log('Login attempted with:', this.email);
    },
    handleRegister() {
      // Validate passwords match
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      console.log('Registration attempted for:', this.name, this.email);
      
      // Switch to login tab after successful registration
      this.activeTab = 'login';
    }
  }
}
</script>