import { defineStore } from 'pinia';
import type { User, UserStats } from '../models/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      newUsersPerMonth: [65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175]
    } as UserStats
  }),

  actions: {
    async fetchUsers() {
      // Simulated API call
      this.users = [
        { id: '001', name: 'John Doe', email: 'john@example.com', role: 'User' }
      ];
    },

    async fetchStats() {
      // Simulated API call
      // Stats are already set in state for demo
    }
  }
});