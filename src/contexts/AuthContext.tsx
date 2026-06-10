'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useStore } from '@/lib/store'
import { User } from '@/types'

function mapProfile(row: any): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    role: row.role,
    photoUrl: row.photo_url || undefined,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setCurrentUser = useStore((s) => s.setCurrentUser)
  const clearCart = useStore((s) => s.clearCart)

  useEffect(() => {
    const supabase = createClient()

    const loadProfile = async (userId: string) => {
      const { data } = await supabase
        .from('users')
        .select('id, name, email, phone, role, photo_url')
        .eq('id', userId)
        .single()
      setCurrentUser(data ? mapProfile(data) : null)
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) loadProfile(user.id)
      else setCurrentUser(null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        loadProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null)
        clearCart()
      }
    })

    return () => subscription.unsubscribe()
  }, [setCurrentUser, clearCart])

  return <>{children}</>
}
