import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BottomNavProps {
  userRole: 'customer' | 'chef' | 'driver'
}

export default function BottomNav({ userRole }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = {
    customer: [
      { href: '/dashboard/customer', icon: '🏠', label: 'Home' },
      { href: '/dashboard/customer/search', icon: '🔍', label: 'Search' },
      { href: '/dashboard/customer/cart', icon: '🛒', label: 'Cart' },
      { href: '/dashboard/customer/orders', icon: '📦', label: 'Orders' },
      { href: '/dashboard/customer/profile', icon: '👤', label: 'Profile' },
    ],
    chef: [
      { href: '/dashboard/chef', icon: '🏠', label: 'Home' },
      { href: '/dashboard/chef/menu', icon: '📋', label: 'Menu' },
      { href: '/dashboard/chef/orders', icon: '📦', label: 'Orders' },
      { href: '/dashboard/chef/earnings', icon: '💰', label: 'Earnings' },
      { href: '/dashboard/chef/profile', icon: '👤', label: 'Profile' },
    ],
    driver: [
      { href: '/dashboard/driver', icon: '🏠', label: 'Home' },
      { href: '/dashboard/driver/deliveries', icon: '🚗', label: 'Deliveries' },
      { href: '/dashboard/driver/earnings', icon: '💰', label: 'Earnings' },
      { href: '/dashboard/driver/profile', icon: '👤', label: 'Profile' },
    ],
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems[userRole].map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition ${
                isActive ? 'text-brand-teal' : 'text-gray-600'
              }`}
            >
              <span className="text-2xl mb-0.5">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


