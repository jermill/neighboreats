'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

interface DashboardLayoutProps {
  children: ReactNode
  userRole: 'customer' | 'chef' | 'driver'
  userName?: string
}

export default function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={userRole} userName={userName} />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {children}
      </main>
      <BottomNav userRole={userRole} />
    </div>
  )
}


