<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Tabs from '../components/ui/Tabs.vue'
import TabPanel from '../components/ui/TabPanel.vue'
import Table from '../components/ui/Table.vue'
import ActivityStatus from '../components/ui/ActivityStatus.vue'
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
      'Active': { bg: 'bg-green-100', text: 'text-green-800' },
      'Inactive': { bg: 'bg-red-100', text: 'text-red-800' }
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
        <h1 class="text-2xl font-bold">User Management</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add New User
        </button>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-4">
          <input 
            type="text" 
            placeholder="Search users..."
            class="w-full rounded-md border-gray-300"
          >
        </div>
        
        <div v-if="loading" class="p-4 text-center text-gray-500">
          Loading users...
        </div>
        
        <Table 
          v-else
          :columns="columns" 
          :data="users"
          max-height="400px"
        >
          <template #actions="{ row }">
            <button 
              @click="openUserDetails"
              class="text-blue-600 hover:text-blue-800"
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
          class="text-blue-600 hover:text-blue-800 mr-2"
        >
          ← Back
        </button>
        <h1 class="text-2xl font-bold">Profile Details</h1>
      </div>

      <Tabs
        v-model="currentTab"
        :tabs="tabs"
      >
        <TabPanel name="profile" :selected-tab="currentTab">
          <div class="bg-white rounded-lg shadow p-6">
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <div class="flex gap-4">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save
                </button>
                <button type="button" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </TabPanel>

        <TabPanel name="activity" :selected-tab="currentTab">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium mb-4">Activity History</h3>
            <div class="space-y-4">
              <div class="border-l-4 border-blue-500 pl-4">
                <p class="text-sm text-gray-600">Last Session: October 15 2024</p>
                <p class="text-sm text-gray-500">Status: Present</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel name="security" :selected-tab="currentTab">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium mb-4">Security Settings</h3>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" class="mt-1 block w-full rounded-md border-gray-300">
              </div>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Update Password
              </button>
            </form>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  </div>
</template>