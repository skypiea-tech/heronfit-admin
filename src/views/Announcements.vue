<script setup lang="ts">
import { ref } from 'vue'
import Card from '../components/ui/Card.vue'
import Table from '../components/ui/Table.vue'

interface Announcement {
  title: string
  target: string
  status: 'Sent' | 'Draft' | 'Scheduled'
  date: string
}

interface Column {
  key: string
  label: string
  type?: 'text' | 'status' | 'date' | 'actions'
  statusColors?: Record<string, { bg: string; text: string }>
}

const announcements = ref<Announcement[]>([
  {
    title: 'Gym Closure Notice',
    target: 'All Users',
    status: 'Sent',
    date: '2024-10-15'
  },
  // ...other announcements
])

const columns: Column[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'target', label: 'Target', type: 'text' },
  { 
    key: 'status', 
    label: 'Status',
    type: 'status',
    statusColors: {
      'Sent': { bg: 'bg-green-100', text: 'text-green-800' },
      'Draft': { bg: 'bg-gray-100', text: 'text-gray-800' },
      'Scheduled': { bg: 'bg-blue-100', text: 'text-blue-800' }
    }
  },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'actions', label: 'Actions', type: 'actions' }
]
</script>

<template>
  <div class="p-6" v-if="announcements">
    <h1 class="text-2xl font-bold mb-6">Announcement</h1>

    <Card>
      <h2 class="text-xl font-semibold mb-4">Create New Announcement</h2>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" placeholder="Enter Announcement Title" class="mt-1 block w-full rounded-md border-gray-300">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Message</label>
          <textarea placeholder="Enter Announcement Message" rows="4" class="mt-1 block w-full rounded-md border-gray-300"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Target Audience</label>
          <select class="mt-1 block w-full rounded-md border-gray-300">
            <option>All Users</option>
          </select>
        </div>
        <div class="flex gap-4">
          <button type="button" class="bg-gray-600 text-white px-4 py-2 rounded">Save as Draft</button>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Send Announcement</button>
        </div>
      </form>
    </Card>

    <Card class="mt-6">
      <Table 
        :columns="columns" 
        :data="announcements"
        max-height="400px"
      >
        <template #actions="{ row }">
          <button class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
          <button class="text-red-600 hover:text-red-800">Delete</button>
        </template>
      </Table>
    </Card>
  </div>
</template>