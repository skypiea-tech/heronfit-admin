import { UserModel } from '../models/User'
import { RealtimeUpdate } from '../utils/RealtimeUpdate'

/**
 * Handles all dashboard-related operations
 */
export class DashboardController {
  private static readonly UPDATE_KEY = 'dashboard-stats'
  private static userCount: string = '0'

  static async fetchUserCount(): Promise<string> {
    try {
      const count = await UserModel.getTotalUsers()
      this.userCount = count.toString()
      return this.userCount
    } catch (error) {
      console.error('Error fetching user count:', error)
      return this.userCount
    }
  }

  /**
   * Starts the periodic user count update
   * @param callback Function to call with the updated count
   * @param intervalMs Update interval in milliseconds (default: 30000 = 30 seconds )
   */
  static startUserCountUpdate(callback: (count: string) => void, intervalMs?: number) {
    const updateCount = async () => {
      await this.fetchUserCount()
      callback(this.userCount)
    }

    RealtimeUpdate.startUpdate(this.UPDATE_KEY, updateCount, intervalMs)
  }

  /**
   * Stops the periodic user count update
   */
  static stopUserCountUpdate() {
    RealtimeUpdate.stopUpdate(this.UPDATE_KEY)
  }

  static getCurrentUserCount(): string {
    return this.userCount
  }
} 