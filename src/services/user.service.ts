import { supabase } from './supabase'

export class UserService {
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
}