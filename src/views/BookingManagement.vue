<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '../components/ui/Tabs.vue'
import TabPanel from '../components/ui/TabPanel.vue'
import Table from '../components/ui/Table.vue'
import { Column } from '../components/ui/Table.vue'

const currentTab = ref('dashboard')
const tabs = [
  { name: 'Dashboard', key: 'dashboard' },
  { name: 'Verification', key: 'verification' },
  { name: 'Settings', key: 'settings' },
  { name: 'History', key: 'history' }
]

const bookings = [
  {
    name: 'John Case',
    date: '2024-10-15 8:00 AM',
    status: 'Pending',
    ticketStatus: 'Verified',
  },
  {
    name: 'Jane Smith',
    date: '2024-10-15 9:00 AM',
    status: 'Approved',
    ticketStatus: 'Verified',
  },
  {
    name: 'Mike Johnson',
    date: '2024-10-15 8:30 AM',
    status: 'Declined',
    ticketStatus: 'Unverified',
  }
]

// Your columns definition using the imported type
const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'date', label: 'Date & Time' },
  { 
    key: 'status', 
    label: 'Booking Status',
    type: 'status',
    statusColors: {
      'Pending': { bg: 'bg-pending', text: 'text-pending' },
      'Approved': { bg: 'bg-verified', text: 'text-verified' },
      'Declined': { bg: 'bg-declined', text: 'text-declined' }
    }
  },
  { 
    key: 'ticketStatus', 
    label: 'Ticket Status',
    type: 'status',
    statusColors: {
      'Verified': { bg: 'bg-verified', text: 'text-verified' },
      'Unverified': { bg: 'bg-unverified', text: 'text-unverified' }
    }
  },
  { key: 'actions', label: 'Actions', type: 'actions' }
]
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-primary">Booking Management</h1>
    
    <Tabs
      v-model="currentTab"
      :tabs="tabs"
    >
      <TabPanel name="dashboard" :selected-tab="currentTab">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-text">Morning Session (8:00 am - 10:00 am)</h2>
          <div class="flex gap-4">
            <select class="rounded-md border-table">
              <option>Filter by Status</option>
            </select>
            <input type="date" class="rounded-md border-table">
          </div>
        </div>

        <Table 
          :columns="columns" 
          :data="bookings"
          max-height="400px"
        >
          <template #actions>
            <button class="text-review hover:text-review/80 mr-2">Review</button>
            <button class="text-decline hover:text-decline/80">Decline</button>
          </template>
        </Table>
      </TabPanel>

      <TabPanel name="verification" :selected-tab="currentTab">
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4 text-text">Verification Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-text">Enable Automatic Verification</span>
              <button class="bg-primary text-text-white px-4 py-2 rounded">Configure</button>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel name="settings" :selected-tab="currentTab">
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4 text-text">Booking Settings</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-light">Maximum Bookings per Session</label>
              <input type="number" class="mt-1 block w-full rounded-md border-table">
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel name="history" :selected-tab="currentTab">
        <div class="bg-surface p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4 text-text">Booking History</h3>
          <Table 
            :columns="columns" 
            :data="bookings"
            max-height="400px"
          >
            <template #actions>
              <button class="text-primary hover:text-primary-dark">View Details</button>
            </template>
          </Table>
        </div>
      </TabPanel>
    </Tabs>
  </div>
</template>