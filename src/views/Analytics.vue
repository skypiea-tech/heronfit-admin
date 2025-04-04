<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Analytics</h1>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">User Growth</h2>
        <div class="h-64">
          <UserGrowthChart />
        </div>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Booking Statistics</h2>
        <div class="h-64">
          <BookingStatsChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserGrowthChart from '../components/charts/UserGrowthChart.vue';
import BookingStatsChart from '../components/charts/BookingStatsChart.vue';
import { useUserStore } from '../controllers/UserController';
import { useBookingStore } from '../controllers/BookingController';
import { onMounted } from 'vue';

const userStore = useUserStore();
const bookingStore = useBookingStore();

onMounted(() => {
  userStore.fetchStats();
  bookingStore.fetchStats();
});
</script>