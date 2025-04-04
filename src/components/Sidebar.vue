<template>
  <aside class="fixed left-0 top-0 h-screen w-[280px] bg-[#4338CA] text-white">
    <div class="p-6">
      <div class="flex items-center gap-2">
        <img src="/logo.svg" alt="HeronFit" class="h-8 w-8" />
        <h1 class="text-2xl font-bold">HeronFit</h1>
      </div>
    </div>
    
    <nav class="mt-6">
      <template v-for="item in navigation" :key="item.name">
        <router-link
          :to="item.path"
          :class="[
            'flex items-center px-6 py-3 text-white/90 hover:bg-white/10',
            $route.path === item.path ? 'bg-white/10' : ''
          ]"
        >
          <component :is="item.icon" class="h-5 w-5 mr-3" />
          {{ item.name }}
        </router-link>
      </template>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { 
  Squares2X2Icon, 
  CalendarIcon, 
  UsersIcon, 
  ClockIcon,
  BellIcon, 
  ChartBarIcon 
} from '@heroicons/vue/24/outline';

const navigation = [
  { name: 'Dashboard', icon: Squares2X2Icon, path: '/dashboard' },
  { name: 'Booking Management', icon: CalendarIcon, path: '/bookings' },
  { name: 'User Management', icon: UsersIcon, path: '/users' },
  { name: 'Schedule Management', icon: ClockIcon, path: '/sessions' },
  { name: 'Announcement', icon: BellIcon, path: '/announcements' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
];
</script>