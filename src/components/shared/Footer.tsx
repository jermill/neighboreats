import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-dark-bg border-t border-gray-800 dark:border-dark-border text-gray-300 dark:text-dark-text-secondary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="NeighborEats"
                width={100}
                height={30}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-gray-400 dark:text-dark-text-muted hidden sm:block">
              © {currentYear} NeighborEats
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <Link href="/explore" className="hover:text-brand-teal dark:hover:text-primary-dark transition">
              Browse
            </Link>
            <Link href="/apply/chef" className="hover:text-brand-teal dark:hover:text-primary-dark transition">
              Become a Chef
            </Link>
            <Link href="/apply/driver" className="hover:text-brand-teal dark:hover:text-primary-dark transition">
              Drive
            </Link>
            <Link href="/about" className="hover:text-brand-teal dark:hover:text-primary-dark transition">
              About
            </Link>
            <Link href="/privacy" className="hover:text-brand-teal dark:hover:text-primary-dark transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-teal dark:hover:text-primary-dark transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

