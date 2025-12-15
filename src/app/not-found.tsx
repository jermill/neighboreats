import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg-elevated flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-brand-teal dark:text-primary-dark mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold rounded-xl shadow-md transition"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
