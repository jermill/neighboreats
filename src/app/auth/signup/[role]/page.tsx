'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const params = useParams()
  const role = params.role as string
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const roleLabels: Record<string, string> = {
    customer: 'Customer',
    chef: 'Chef',
    driver: 'Driver'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const supabase = createClient()
      
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
            phone: form.phone,
            role: role
          }
        }
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: form.email,
            name: form.name,
            phone: form.phone,
            role: role
          })

        if (profileError) throw profileError

        // Create role-specific profile
        if (role === 'chef') {
          const { error: chefError } = await supabase
            .from('chefs')
            .insert({
              id: authData.user.id
            })
          if (chefError) throw chefError
        } else if (role === 'driver') {
          const { error: driverError } = await supabase
            .from('drivers')
            .insert({
              id: authData.user.id
            })
          if (driverError) throw driverError
        }

        toast.success('Account created successfully!')
        
        // Redirect based on role
        if (role === 'chef') {
          router.push('/dashboard/chef/onboarding')
        } else if (role === 'driver') {
          router.push('/dashboard/driver/onboarding')
        } else {
          router.push('/dashboard/customer')
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      toast.error(error.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Join as {roleLabels[role] || 'User'}
          </h1>
          <p className="text-gray-400 mt-2">Create your NeighborEats account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          
          <Input
            type="tel"
            label="Phone"
            placeholder="(555) 123-4567"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            helperText="At least 8 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          
          <Input
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
          
          <Button type="submit" loading={loading} className="w-full">
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-teal font-semibold hover:text-teal-400 transition">
              Log in
            </Link>
          </p>
          <p className="text-sm text-gray-400">
            <Link href="/" className="text-brand-teal hover:text-teal-400 transition">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


