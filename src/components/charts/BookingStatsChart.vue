<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useBookingStore } from '../../controllers/BookingController';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const bookingStore = useBookingStore();

const chartData = computed(() => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Bookings per Month',
    data: bookingStore.stats.bookingsPerMonth,
    backgroundColor: '#4f46e5'
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>