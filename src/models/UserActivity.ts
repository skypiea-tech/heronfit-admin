import { UserActivitySettings } from '../utils/UserActivitySettings';

/**
 * Represents user activity status and related functionality
 */
export class UserActivity {
  /**
   * Calculates the activity status based on test_last_active timestamp
   * @param lastActive Last activity timestamp
   * @returns 'Active' if within inactivity timeout period, 'Inactive' otherwise
   */
  static calculateStatus(lastActive: string | null): string {
    if (!lastActive) return 'Inactive'
    
    const lastActiveTime = new Date(lastActive)
    const now = new Date()
    const timeoutThreshold = new Date(now.getTime() - UserActivitySettings.INACTIVITY_TIMEOUT_MS)
    
    return lastActiveTime > timeoutThreshold ? 'Active' : 'Inactive'
  }

  /**
   * Gets the CSS classes for a given activity status
   * @param status Activity status
   * @returns CSS classes for styling the status badge
   */
  static getStatusClasses(status: string): string {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }
} 