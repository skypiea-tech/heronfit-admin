import { supabase } from './supabase'

interface LoginData {
  email: string
  password: string
}

interface RegisterData extends LoginData {
  firstName: string
  lastName: string
  confirmPassword: string
}

export class AuthService {
  static validateLoginFields(data: LoginData): string | null {
    if (!data.email.trim()) return 'Email is required'
    if (!data.password.trim()) return 'Password is required'
    if (!this.isValidEmail(data.email)) return 'Invalid email format'
    return null
  }

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

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static async login(data: LoginData) {
    // Check for tempDev credentials
    if (data.email === 'admin@heronfit.com' && data.password === 'admin123') {
      return { data: true, error: null }
    }

    return await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
  }

  static async register(data: RegisterData) {
    return await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        }
      }
    })
  }
}