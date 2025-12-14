import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
  userRole?: 'customer' | 'chef' | 'driver' | 'admin'
  userName?: string
}

export default function Navbar({ userRole, userName }: NavbarProps) {
  const pathname = usePathname()

  const navItems = {
    customer: [
      { href: '/dashboard/customer', label: 'Home' },
      { href: '/dashboard/customer/search', label: 'Find Chefs' },
      { href: '/dashboard/customer/orders', label: 'Orders' },
      { href: '/dashboard/customer/subscriptions', label: 'Subscriptions' },
    ],
    chef: [
      { href: '/dashboard/chef', label: 'Home' },
      { href: '/dashboard/chef/menu', label: 'Menu' },
      { href: '/dashboard/chef/orders', label: 'Orders' },
      { href: '/dashboard/chef/earnings', label: 'Earnings' },
    ],
    driver: [
      { href: '/dashboard/driver', label: 'Home' },
      { href: '/dashboard/driver/deliveries', label: 'Deliveries' },
      { href: '/dashboard/driver/earnings', label: 'Earnings' },
    ],
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            🍽️ Neighbor<span className="text-teal-600">Eats</span>
          </Link>

          {userRole && (
            <>
              <div className="hidden md:flex items-center gap-6">
                {navItems[userRole]?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-medium transition ${
                      pathname === item.href
                        ? 'text-teal-600'
                        : 'text-gray-700 hover:text-teal-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">{userName}</span>
                <Link
                  href={`/dashboard/${userRole}/profile`}
                  className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold"
                >
                  {userName?.charAt(0) || 'U'}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

