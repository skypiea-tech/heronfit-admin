<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Tabs from '../components/ui/Tabs.vue'
import TabPanel from '../components/ui/TabPanel.vue'
import Table from '../components/ui/Table.vue'
import { User } from '../models/User'
import { UserController } from '../controllers/UserController'

const showDetails = ref(false)
const currentTab = ref('profile')
const users = ref<(User & { status: string })[]>([])
const loading = ref(true)

const tabs = [
  { name: 'Profile', key: 'profile' },
  { name: 'Activity', key: 'activity' },
  { name: 'Security', key: 'security' }
]

const columns = [
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'email_address', label: 'Email' },
  { 
    key: 'status', 
    label: 'Status',
    type: 'status' as const,
    statusColors: {
      'Active': { bg: 'bg-active', text: 'text-active' },
      'Inactive': { bg: 'bg-inactive', text: 'text-inactive' }
    }
  },
  { key: 'actions', label: 'Actions', type: 'actions' as const }
]

const updateUsers = (updatedUsers: (User & { status: string })[]) => {
  users.value = updatedUsers
  loading.value = false
}

const openUserDetails = () => {
  showDetails.value = true
}

onMounted(() => {
  // Start periodic updates every 10 seconds
  UserController.startUserListUpdate(updateUsers, 10000)
})

onUnmounted(() => {
  // Clean up the interval when component is unmounted
  UserController.stopUserListUpdate()
})
</script>

<template>
  <div class="p-6">
    <div v-if="!showDetails">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-primary">User Management</h1>
        <button class="bg-primary text-text-white px-4 py-2 rounded-md hover:bg-primary-dark">
          Add New User
        </button>
      </div>

      <div class="bg-surface rounded-lg shadow">
        <div class="p-4">
          <input 
            type="text" 
            placeholder="Search users..."
            class="w-full rounded-md border-table"
          >
        </div>
        
        <div v-if="loading" class="p-4 text-center text-text-light">
          Loading users...
        </div>
        
        <Table 
          v-else
          :columns="columns" 
          :data="users"
          max-height="400px"
        >
          <template #actions>
            <button 
              @click="openUserDetails"
              class="text-primary hover:text-primary-dark"
            >
              View Details
            </button>
          </template>
        </Table>
      </div>
    </div>

    <div v-else>
      <div class="flex items-center mb-6">
        <button 
          @click="showDetails = false"
          class="text-primary hover:text-primary-dark mr-2"
        >
          ← Back
        </button>
        <h1 class="text-2xl font-bold text-primary">Profile Details</h1>
      </div>

      <Tabs
        v-model="currentTab"
        :tabs="tabs"
        class="mb-4"
      >
        <TabPanel name="profile" :selected-tab="currentTab">
          <div class="bg-surface rounded-lg shadow p-6">
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text-light">First Name</label>
                <input type="text" class="mt-1 block w-full rounded-md border-table p-2" placeholder="John">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-light">Last Name</label>
                <input type="text" class="mt-1 block w-full rounded-md border-table p-2" placeholder="John">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-light">Email</label>
                <input type="email" class="mt-1 block w-full rounded-md border-table p-2" placeholder="john@example.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-light">Phone</label>
                <input type="tel" class="mt-1 block w-full rounded-md border-table p-2" placeholder="0000000000">
              </div>
              <div class="pt-2">
                <p class="text-sm text-text-light">User ID: 1234-567</p>
                <p class="text-sm text-text-light">Registration Date: 2024-01-15</p>
                <p class="text-sm text-text-light">Gender: Male</p>
                <p class="text-sm text-text-light">Fitness Goal: Lose Weight</p>
                <p class="text-sm text-text-light">Height: 175cm</p>
                <p class="text-sm text-text-light">Weight: 75kg</p>
              </div>
              <div class="flex gap-4">
                <button type="submit" class="bg-primary text-text-white px-4 py-2 rounded-md hover:bg-primary-dark">
                  Save
                </button>
                <button type="button" class="bg-error text-text-white px-4 py-2 rounded-md hover:bg-error/80">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </TabPanel>

        <TabPanel name="activity" :selected-tab="currentTab">
          <div class="bg-surface rounded-lg shadow p-6">
            <h3 class="text-lg font-medium mb-4">Activity History</h3>
            <div class="space-y-4">
              <div class="border-l-4 border-primary pl-4">
                <p class="text-sm text-text-light">Last Session: October 15 2024</p>
                <p class="text-sm text-text-light">Status: Present</p>
              </div>
              <div class="border-l-4 border-primary pl-4">
                <p class="text-sm text-text-light">Last Session: October 19 2024</p>
                <p class="text-sm text-text-light">Status: Present</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel name="security" :selected-tab="currentTab">
          <div class="bg-surface rounded-lg shadow p-6">
            <div class="flex justify-center">
              <button type="button" class="bg-primary-light text-lazy-white px-8 py-2 rounded-md hover:bg-primary-dark">
                Reset Password
              </button>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>