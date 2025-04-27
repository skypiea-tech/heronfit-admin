import { defineStore } from 'pinia';
import type { Booking, BookingStats } from '../models/Booking';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [] as Booking[],
    stats: {
      totalBookings: 789,
      bookingsPerMonth: [45, 52, 58, 65, 72, 78, 85, 92, 98, 105, 112, 118],
      statusDistribution: {
        confirmed: 65,
        pending: 25,
        cancelled: 10
      }
    } as BookingStats
  }),

  actions: {
    async fetchBookings() {
      // Simulated API call
      this.bookings = [
        { id: '001', userId: '001', date: '2024-03-20', status: 'confirmed' }
      ];
    },

    async fetchStats() {
      // Simulated API call
      // Stats are already set in state for demo
    }
  }
});