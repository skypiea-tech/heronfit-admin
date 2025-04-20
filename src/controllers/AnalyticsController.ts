import { UserModel } from '../models/User'
import { UserController } from './UserController'
import { RealtimeUpdate } from '../utils/RealtimeUpdate'

interface AnalyticsStats {
  totalUsers: number
  activeUsers: number
  averageAttendance: number
  todaysBookings: number
  peakHours: number
}

export class AnalyticsController {
  private static readonly UPDATE_KEY = 'analytics-stats'
  private static stats: AnalyticsStats = {
    totalUsers: 0,
    activeUsers: 0,
    averageAttendance: 0,
    todaysBookings: 0,
    peakHours: 0
  }

  static async fetchAnalyticsStats(): Promise<AnalyticsStats> {
    try {
      // Get total users from UserModel
      const totalUsers = await UserModel.getTotalUsers()

      // Get active users count from UserController's current users
      const currentUsers = UserController.getCurrentUsers()
      const activeUsers = currentUsers.filter(user => user.status === 'Active').length

      // Calculate average attendance (placeholder for now)
      const averageAttendance = 78 // This should be calculated based on actual attendance data

      // Get today's bookings (placeholder for now)
      const todaysBookings = 48 // This should be fetched from booking data

      // Get peak hours (placeholder for now)
      const peakHours = 24 // This should be calculated based on actual usage data

      this.stats = {
        totalUsers,
        activeUsers,
        averageAttendance,
        todaysBookings,
        peakHours
      }

      return this.stats
    } catch (error) {
      console.error('Error fetching analytics stats:', error)
      return this.stats
    }
  }

  static startAnalyticsUpdate(callback: (stats: AnalyticsStats) => void, intervalMs?: number) {
    const updateStats = async () => {
      await this.fetchAnalyticsStats()
      callback(this.stats)
    }

    RealtimeUpdate.startUpdate(this.UPDATE_KEY, updateStats, intervalMs)
  }

  static stopAnalyticsUpdate() {
    RealtimeUpdate.stopUpdate(this.UPDATE_KEY)
  }

  static getCurrentStats(): AnalyticsStats {
    return this.stats
  }
} 