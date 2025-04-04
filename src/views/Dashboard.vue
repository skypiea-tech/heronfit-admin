<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Admin Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.title" 
           class="bg-white rounded-lg p-4 flex items-start gap-4">
        <div class="p-2 bg-indigo-600 rounded-lg">
          <component :is="stat.icon" class="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 class="text-sm text-gray-600">{{ stat.title }}</h3>
          <p class="text-xl font-semibold">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Upcoming Sessions -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Upcoming Sessions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="session in upcomingSessions" :key="session.id" 
             class="bg-white rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <CalendarIcon class="h-5 w-5 text-gray-500" />
            <span>{{ session.date }}</span>
          </div>
          <div class="flex items-center gap-2">
            <ClockIcon class="h-5 w-5 text-gray-500" />
            <span>{{ session.time }}</span>
          </div>
          <div class="mt-2 text-sm text-green-600">
            {{ session.capacity }}
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Bookings -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recent Bookings</h2>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg">
            Filter by Status
          </button>
          <button class="px-4 py-2 bg-white border rounded-lg flex items-center gap-2">
            <CalendarIcon class="h-5 w-5" />
            dd/mm/yy
          </button>
        </div>
      </div>

      <div class="bg-white rounded-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-indigo-600 text-white">
            <tr>
              <th class="px-6 py-3 text-left">NAME</th>
              <th class="px-6 py-3 text-left">DATE & TIME</th>
              <th class="px-6 py-3 text-left">BOOKING STATUS</th>
              <th class="px-6 py-3 text-left">TICKET ID</th>
              <th class="px-6 py-3 text-left">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in recentBookings" :key="booking.id" class="border-b">
              <td class="px-6 py-4">{{ booking.name }}</td>
              <td class="px-6 py-4">{{ booking.datetime }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-sm',
                  booking.status === 'Pending' ? 'bg-indigo-600 text-white' : ''
                ]">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-sm',
                  booking.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ booking.verified ? 'Verified' : 'Unverified' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button class="px-3 py-1 bg-indigo-600 text-white rounded">Review</button>
                  <button class="px-3 py-1 bg-red-100 text-red-600 rounded">Decline</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Overview Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- User Management -->
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <UsersIcon class="h-6 w-6 text-gray-600" />
            <h2 class="text-xl font-semibold">User Management</h2>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">View All Users</span>
            <span class="font-semibold">1,234 users</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">New Registrations (This Week)</span>
            <span class="font-semibold">1,234 users</span>
          </div>
          <button class="text-indigo-600 hover:text-indigo-800">View More →</button>
        </div>
      </div>

      <!-- Schedule Management -->
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <ClockIcon class="h-6 w-6 text-gray-600" />
            <h2 class="text-xl font-semibold">Schedule Management</h2>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Today's Sessions</span>
            <span class="font-semibold">8 sessions</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">This Week's Bookings</span>
            <span class="font-semibold">123 bookings</span>
          </div>
          <button class="text-indigo-600 hover:text-indigo-800">View More →</button>
        </div>
      </div>

      <!-- Recent Announcements -->
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <BellIcon class="h-6 w-6 text-gray-600" />
            <h2 class="text-xl font-semibold">Recent Announcements</h2>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold">Gym Closure Notice</h3>
            <p class="text-sm text-gray-600">Sent 2 days ago</p>
          </div>
          <div>
            <h3 class="font-semibold">Holiday Hours</h3>
            <p class="text-sm text-gray-600">Draft</p>
          </div>
          <button class="text-indigo-600 hover:text-indigo-800">Manage Announcements →</button>
        </div>
      </div>

      <!-- Analytics Preview -->
      <div class="bg-white rounded-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <ChartBarIcon class="h-6 w-6 text-gray-600" />
            <h2 class="text-xl font-semibold">Analytics Preview</h2>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <h3 class="text-gray-600">Peak Hours</h3>
            <p class="font-semibold">3pm - 5pm</p>
          </div>
          <div>
            <h3 class="text-gray-600">User Retention Rate</h3>
            <p class="font-semibold">78%</p>
          </div>
          <button class="text-indigo-600 hover:text-indigo-800">View Analytics →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  UsersIcon, 
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  BellIcon,
  ChartBarIcon 
} from '@heroicons/vue/24/outline';

const stats = [
  { title: 'Total Users', value: '1,234', icon: UsersIcon },
  { title: 'Current Occupancy', value: '10/15 (65% full)', icon: UserGroupIcon },
  { title: "Today's Bookings", value: '48', icon: CalendarIcon },
  { title: 'Pending Tickets', value: '48', icon: CalendarIcon },
];

const upcomingSessions = [
  { id: 1, date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: 'Capacity: 0/15 spots left' },
  { id: 2, date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: 'Capacity: 12/15 spots left' },
  { id: 3, date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: 'Capacity: 0/15 spots left' },
  { id: 4, date: 'Tuesday - October 8, 2024', time: '8:00 am - 10:00 am', capacity: 'Capacity: 12/15 spots left' },
];

const recentBookings = [
  { id: 1, name: 'John Case', datetime: '2024-10-15 | 8:00 AM', status: 'Pending', verified: true },
  { id: 2, name: 'John Case', datetime: '2024-10-15 | 8:00 AM', status: 'Pending', verified: true },
  { id: 3, name: 'John Case', datetime: '2024-10-15 | 8:00 AM', status: 'Pending', verified: true },
  { id: 4, name: 'John Case', datetime: '2024-10-15 | 8:00 AM', status: 'Pending', verified: false },
  { id: 5, name: 'John Case', datetime: '2024-10-15 | 8:00 AM', status: 'Pending', verified: false },
];
</script>