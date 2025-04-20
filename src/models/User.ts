import { supabase } from '../lib/supabase'

/**
 * Represents a user in the system with their profile information
 */
export interface User {
  id: string
  created_at: string
  first_name: string | null
  last_name: string | null
  email_address: string | null
  birthday: string | null
  gender: string | null
  weight: string | null
  height: string | null
  goal: string | null
  contact: string | null
  has_session: boolean | null
  last_activity: string | null
  test_last_active: string | null
}

/**
 * Handles all user-related database operations
 */
export class UserModel {
  /**
   * Retrieves the total count of users in the system
   * @returns Promise<number> Total number of users
   */
  static async getTotalUsers(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error fetching user count:', error)
      return 0
    }
  }

  /**
   * Creates a new user in the database
   * @param userData User information to be saved
   * @returns Promise<User> Created user data
   */
  static async createUser(userData: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  /**
   * Updates an existing user's information
   * @param id User ID
   * @param userData Updated user information
   * @returns Promise<User> Updated user data
   */
  static async updateUser(id: string, userData: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  /**
   * Fetches all users with their activity status
   * @returns Promise<Array<User & { status: string }>> List of users with activity status
   */
  static async getAllUsers(): Promise<Array<User & { status: string }>> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return data.map(user => {
        const lastActivity = user.last_activity ? new Date(user.last_activity) : null
        const now = new Date()
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
        
        const status = lastActivity && lastActivity > oneHourAgo ? 'Active' : 'Inactive'
        
        return {
          ...user,
          status
        }
      })
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }
}