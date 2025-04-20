<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '../components/ui/Card.vue'
import Table from '../components/ui/Table.vue'
import type { Column } from '../components/ui/Table.vue'
import { DashboardController } from '../controllers/DashboardController'
import { 
  UsersIcon, 
  UserGroupIcon, 
  CalendarDaysIcon, 
  TicketIcon 
} from '@heroicons/vue/24/outline'

const totalUsers = ref('0')

const stats = [
  { 
    label: 'Total Users', 
    value: totalUsers,
    icon: UsersIcon,
    iconClass: 'text-primary bg-primary/10 p-3 rounded-lg'
  },
  { 
    label: 'Current Occupancy', 
    value: '10/15 (65% full)',
    icon: UserGroupIcon,
    iconClass: 'text-primary bg-primary/10 p-3 rounded-lg'
  },
  { 
    label: "Today's Bookings", 
    value: '48',
    icon: CalendarDaysIcon,
    iconClass: 'text-primary bg-primary/10 p-3 rounded-lg'
  },
  { 
    label: 'Pending Tickets', 
    value: '48',
    icon: TicketIcon,
    iconClass: 'text-primary bg-primary/10 p-3 rounded-lg'
  }
]


const sessions = [
  { date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: '10/15 spots left' },
  { date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: '12/15 spots left' },
  { date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: '8/15 spots left' },
  { date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: '13/15 spots left' }
]

const bookings = [
  {
    name: 'John Case',
    date: '2024-10-15 8:00 AM',
    status: 'Pending',
    ticketId: 'Verified'
  },
  {
    name: 'John Case',
    date: '2024-10-15 8:00 AM',
    status: 'Pending',
    ticketId: 'Verified'
  },
  {
    name: 'John Case',
    date: '2024-10-15 8:00 AM',
    status: 'Pending',
    ticketId: 'Verified'
  }
]

const columns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'date', label: 'Date & Time' },
  { 
    key: 'status', 
    label: 'Booking Status',
    type: 'status',
    statusColors: {
      'Pending': { bg: 'bg-blue-100', text: 'text-blue-800' }
    }
  },
  { 
    key: 'ticketId', 
    label: 'Ticket ID',
    type: 'status',
    statusColors: {
      'Verified': { bg: 'bg-green-100', text: 'text-green-800' }
    }
  },
  { key: 'actions', label: 'Actions', type: 'actions' }
]

onMounted(() => {
  DashboardController.startUserCountUpdate((count) => {
    totalUsers.value = count
  })
})

onUnmounted(() => {
  DashboardController.stopUserCountUpdate()
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-indigo-600 mb-6">Admin Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <Card v-for="stat in stats" :key="stat.label" padding="p-4" class="bg-white rounded-lg shadow-sm">
        <div class="flex items-start space-x-4">
          <div class="p-3 rounded-lg bg-indigo-100">
            <component 
              :is="stat.icon" 
              class="w-6 h-6 text-indigo-600"
            />
          </div>
          <div>
            <span class="block text-2xl font-semibold">{{ typeof stat.value === 'string' ? stat.value : stat.value.value }}</span>
            <p class="text-gray-600 text-sm">{{ stat.label }}</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Upcoming Sessions -->
    <h2 class="text-xl font-semibold mb-4">Upcoming Sessions</h2>
    <div class="grid grid-cols-4 gap-4 mb-6">
      <Card v-for="session in sessions" :key="session.date" padding="p-4">
        <div>
          <p class="font-medium">{{ session.date }}</p>
          <p class="text-gray-600">{{ session.time }}</p>
          <p class="text-green-600 mt-2">{{ session.capacity }}</p>
        </div>
      </Card>
    </div>

    <!-- Recent Bookings -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recent Bookings</h2>
        <div class="flex gap-4">
          <select class="rounded-md border-gray-300">
            <option>Filter by Status</option>
          </select>
          <input type="date" class="rounded-md border-gray-300">
        </div>
      </div>
      <Card>
        <Table 
          :columns="columns" 
          :data="bookings"
          max-height="300px"
        >
          <template #actions="{ row }">
            <button class="text-blue-600 hover:text-blue-800 mr-2">Review</button>
            <button class="text-red-600 hover:text-red-800">Decline</button>
          </template>
        </Table>
      </Card>
    </div>

    <!-- Overview Section -->
    <div class="grid grid-cols-2 gap-6">
      <!-- User Management Overview -->
      <Card title="User Management">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span>View All Users</span>
            <span class="font-semibold">{{ totalUsers }} users</span>
          </div>
          <div class="flex justify-between items-center">
            <span>New Registrations (This Week)</span>
            <span class="font-semibold">1,234 users</span>
          </div>
          <button class="text-blue-600 hover:text-blue-800">View More →</button>
        </div>
      </Card>

      <!-- Schedule Management Overview -->
      <Card title="Schedule Management">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span>Today's Sessions</span>
            <span class="font-semibold">8 sessions</span>
          </div>
          <div class="flex justify-between items-center">
            <span>This Week's Bookings</span>
            <span class="font-semibold">123 bookings</span>
          </div>
          <button class="text-blue-600 hover:text-blue-800">View More →</button>
        </div>
      </Card>

      <!-- Recent Announcements -->
      <Card title="Recent Announcements">
        <div class="space-y-4">
          <div>
            <h4 class="font-medium">Gym Closure Notice</h4>
            <p class="text-sm text-gray-600">Sent 2 days ago</p>
          </div>
          <div>
            <h4 class="font-medium">Holiday Hours</h4>
            <p class="text-sm text-gray-600">Draft</p>
          </div>
          <button class="text-blue-600 hover:text-blue-800">Manage Announcements →</button>
        </div>
      </Card>

      <!-- Analytics Preview -->
      <Card title="Analytics Preview">
        <div class="space-y-4">
          <div>
            <h4 class="font-medium">Peak Hours</h4>
            <p class="text-lg font-semibold">3pm - 5pm</p>
          </div>
          <div>
            <h4 class="font-medium">User Retention Rate</h4>
            <p class="text-lg font-semibold">78%</p>
          </div>
          <button class="text-blue-600 hover:text-blue-800">View Analytics →</button>
        </div>
      </Card>
    </div>
  </div>
</template>