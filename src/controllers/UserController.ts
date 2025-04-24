import { UserModel, User } from '../models/User'
import { UserActivity } from '../models/UserActivity'
import { RealtimeUpdate } from '../utils/RealtimeUpdate'

/**
 * Handles all user management operations
 */
export class UserController {
  private static readonly UPDATE_KEY = 'user-list'
  private static users: (User & { status: string })[] = []
  private static searchTimeout: number | null = null

  /**
   * Fetches all users with their activity status
   * @returns Promise<Array<User & { status: string; matchConfidence: number }>> List of users with activity status
   */
  static async fetchUsers(): Promise<(User & { status: string })[]> {
    try {
      const fetchedUsers = await UserModel.getAllUsers()
      
      this.users = fetchedUsers.map(user => ({
        ...user,
        status: UserActivity.calculateStatus(user.test_last_active),
      }))
      
      return this.users
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }

  /**
   * Starts the periodic user list update
   * @param callback Function to call with the updated users
   * @param intervalMs Update interval in milliseconds
   */
  static startUserListUpdate(callback: (users: (User & { status: string })[]) => void, intervalMs?: number) {
    const updateUserList = async () => {
      await this.fetchUsers()
      callback(this.users)
    }

    RealtimeUpdate.startUpdate(this.UPDATE_KEY, updateUserList, intervalMs)
  }

  /**
   * Stops the periodic user list update
   */
  static stopUserListUpdate() {
    RealtimeUpdate.stopUpdate(this.UPDATE_KEY)
  }

  /**
   * Gets the current users list
   * @returns Array of users with their status
   */
  static getCurrentUsers(): (User & { status: string })[] {
    return this.users
  }

  /**
   * Gets a single user by their ID
   * @param id User ID
   * @returns Promise<User | null> User data or null if not found
   */
  static async getUserById(id: string): Promise<User | null> {
    try {
      return await UserModel.getUserById(id)
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  /**
   * Updates a user's information
   * @param id User ID
   * @param userData Updated user information
   * @returns Promise<User | null> Updated user data or null if failed
   */
  static async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await UserModel.updateUser(id, userData)
      await this.fetchUsers() // Refresh the users list
      return updatedUser
    } catch (error) {
      console.error('Error updating user:', error)
      return null
    }
  }

  /**
   * Deletes a user
   * @param id User ID
   * @returns Promise<boolean> True if successful, false otherwise
   */
  static async deleteUser(id: string): Promise<boolean> {
    try {
      const { error } = await UserModel.deleteUser(id)
      if (error) throw error
      await this.fetchUsers() // Refresh the users list
      return true
    } catch (error) {
      console.error('Error deleting user:', error)
      return false
    }
  }

  /**
   * Searches users by query string
   * @param query Search query
   * @param callback Function to call with the search results
   */
  static async searchUsers(query: string, callback: (users: (User & { status: string })[]) => void) {
    try {
      // Clear any existing timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      // If query is empty, show all users
      if (!query.trim()) {
        await this.fetchUsers()
        callback(this.users)
        return
      }

      // Add debounce to prevent too many API calls
      this.searchTimeout = window.setTimeout(async () => {
        const searchResults = await UserModel.searchUsers(query)
        this.users = searchResults
        callback(this.users)
      }, 300) // 300ms debounce
    } catch (error) {
      console.error('Error searching users:', error)
      callback([])
    }
  }
} 