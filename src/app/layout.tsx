import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/shared/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeighborEats | Local Food, Fair Economics',
  description: 'Discover neighborhood chefs. Support local. Eat fresh.',
  applicationName: 'NeighborEats',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'NeighborEats',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
  themeColor: '#026181',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NeighborEats" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-dark-bg text-foreground dark:text-dark-text transition-colors`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-center"
            toastOptions={{
              style: {
                padding: '16px',
                fontSize: '16px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}


