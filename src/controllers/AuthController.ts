import { supabase } from '../lib/supabase'
import { UserModel } from '../models/User'

/**
 * Data structure for login requests
 */
interface LoginData {
  email: string
  password: string
}

/**
 * Extended data structure for registration requests
 */
interface RegisterData extends LoginData {
  firstName: string
  lastName: string
  confirmPassword: string
}

/**
 * Handles all authentication-related operations
 */
export class AuthController {
  /**
   * Validates login form data
   * @param data Login form data
   * @returns string|null Error message if validation fails, null if successful
   */
  static validateLoginFields(data: LoginData): string | null {
    if (!data.email.trim()) return 'Email is required'
    if (!data.password.trim()) return 'Password is required'
    if (!this.isValidEmail(data.email)) return 'Invalid email format'
    return null
  }

  /**
   * Validates registration form data
   * @param data Registration form data
   * @returns string|null Error message if validation fails, null if successful
   */
  static validateRegisterFields(data: RegisterData): string | null {
    if (!data.firstName.trim()) return 'First name is required'
    if (!data.lastName.trim()) return 'Last name is required'
    if (!data.email.trim()) return 'Email is required'
    if (!data.password.trim()) return 'Password is required'
    if (!data.confirmPassword.trim()) return 'Please confirm your password'
    if (!this.isValidEmail(data.email)) return 'Invalid email format'
    if (data.password !== data.confirmPassword) return 'Passwords do not match'
    if (data.password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

  /**
   * Validates email format
   * @param email Email to validate
   * @returns boolean True if email is valid
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Handles user login
   * @param data Login credentials
   * @returns Promise with login result
   */
  static async login(data: LoginData) {
    // Development credentials check
    if (data.email === 'admin@heronfit.com' && data.password === 'admin123') {
      return { data: true, error: null }
    }

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) throw error

    return { data: authData, error: null }
  }

  /**
   * Handles user registration
   * @param data Registration data
   * @returns Promise with registration result
   */
  static async register(data: RegisterData) {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        }
      }
    })

    if (signUpError) throw signUpError

    // Create user profile in our database
    if (authData.user) {
      await UserModel.createUser({
        id: authData.user.id,
        email_address: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
      })
    }

    return { data: authData, error: null }
  }
}