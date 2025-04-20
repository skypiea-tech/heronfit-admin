<script setup lang="ts">
import { ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Table from '../components/ui/Table.vue'
import Tabs from '../components/ui/Tabs.vue'
import TabPanel from '../components/ui/TabPanel.vue'

const currentTab = ref('sessions')
const tabs = [
  { name: 'Sessions', key: 'sessions' },
  { name: 'Waitlist', key: 'waitlist' },
  { name: 'Attendance', key: 'attendance' }
]

const sessions = [
  {
    name: 'Morning Session',
    time: '8:00 AM - 10:00 AM',
    capacity: '15/20',
    status: 'Active'
  },
  {
    name: 'Morning Session',
    time: '8:00 AM - 10:00 AM',
    capacity: '15/20',
    status: 'Active'
  },
  {
    name: 'Morning Session',
    time: '8:00 AM - 10:00 AM',
    capacity: '15/20',
    status: 'Active'
  }
]

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'time', label: 'Time' },
  { key: 'capacity', label: 'Capacity' },
  { 
    key: 'status', 
    label: 'Status',
    type: 'status' as const, // Add type assertion here
    statusColors: {
      'Active': { bg: 'bg-green-100', text: 'text-green-800' }
    }
  },
  { key: 'actions', label: 'Actions', type: 'actions' as const } // Add type assertion here
]
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Session Management</h1>

    <Tabs
      v-model="currentTab"
      :tabs="tabs"
    >
      <TabPanel name="sessions" :selected-tab="currentTab">
        <Card>
          <Table 
            :columns="columns" 
            :data="sessions"
            max-height="400px"
          >
            <template #actions="{ row }">
              <button class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
              <button class="text-red-600 hover:text-red-800">Cancel</button>
            </template>
          </Table>
        </Card>
      </TabPanel>

      <TabPanel name="waitlist" :selected-tab="currentTab">
        <Card title="Waitlist Control">
          <!-- Waitlist content -->
        </Card>
      </TabPanel>

      <TabPanel name="attendance" :selected-tab="currentTab">
        <Card title="Session Attendance">
          <!-- Attendance content -->
        </Card>
      </TabPanel>
    </Tabs>
  </div>
</template>