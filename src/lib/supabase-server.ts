import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

// Helper to get current user with role checking
export async function getCurrentUser() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return null
  }

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return user
}

// Role guard helper
export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized - No user session')
  }

  if (!allowedRoles.includes(user.role)) {
    throw new Error(`Forbidden - Role ${user.role} not allowed`)
  }

  return user
}
