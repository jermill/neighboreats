'use client'

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'avatar' | 'image' | 'stat'
  count?: number
  className?: string
}

export default function SkeletonLoader({ 
  variant = 'text', 
  count = 1,
  className = '' 
}: SkeletonLoaderProps) {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded'

  const variants = {
    text: `${baseClass} h-4 w-full mb-2`,
    card: `${baseClass} h-48 w-full`,
    avatar: `${baseClass} h-12 w-12 rounded-full`,
    image: `${baseClass} aspect-video w-full`,
    stat: `${baseClass} h-24 w-full rounded-lg`
  }

  const skeletonClass = `${variants[variant]} ${className}`

  if (variant === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} p-6 space-y-4`}>
            <div className={variants.image} />
            <div className="space-y-2">
              <div className={`${variants.text} w-3/4`} />
              <div className={`${variants.text} w-1/2`} />
            </div>
          </div>
        ))}
      </>
    )
  }

  if (variant === 'stat') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${baseClass} p-4 space-y-2`}>
            <div className={`${variants.text} w-1/3`} />
            <div className={`${baseClass} h-8 w-1/2`} />
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={skeletonClass} />
      ))}
    </>
  )
}

// Specialized skeleton loaders
export function ChefCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
        </div>
      ))}
    </>
  )
}

export function MenuItemCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export function OrderCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-28" />
          </div>
        </div>
      ))}
    </>
  )
}

export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        </div>
      ))}
    </>
  )
}
