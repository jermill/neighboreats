export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'customer' | 'chef' | 'driver' | 'admin'
          name: string
          phone: string | null
          photo_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'customer' | 'chef' | 'driver' | 'admin'
          name: string
          phone?: string | null
          photo_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'customer' | 'chef' | 'driver' | 'admin'
          name?: string
          phone?: string | null
          photo_url?: string | null
          created_at?: string
        }
      }
      chefs: {
        Row: {
          id: string
          rating: number
          categories: string[]
          latitude: number | null
          longitude: number | null
          is_live: boolean
          stripe_account_id: string | null
          account_status: 'INCOMPLETE' | 'PENDING' | 'ACTIVE' | 'SUSPENDED'
          background_check_status: 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'DENIED'
          kitchen_address: string | null
          bio: string | null
          created_at: string
        }
        Insert: {
          id: string
          rating?: number
          categories?: string[]
          latitude?: number | null
          longitude?: number | null
          is_live?: boolean
          stripe_account_id?: string | null
          account_status?: 'INCOMPLETE' | 'PENDING' | 'ACTIVE' | 'SUSPENDED'
          background_check_status?: 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'DENIED'
          kitchen_address?: string | null
          bio?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          rating?: number
          categories?: string[]
          latitude?: number | null
          longitude?: number | null
          is_live?: boolean
          stripe_account_id?: string | null
          account_status?: 'INCOMPLETE' | 'PENDING' | 'ACTIVE' | 'SUSPENDED'
          background_check_status?: 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'DENIED'
          kitchen_address?: string | null
          bio?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

