import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  loading?: boolean
  as?: 'button' | 'span'
}

export default function Button({ 
  variant = 'primary', 
  size = 'md',
  className = '', 
  children,
  loading = false,
  disabled,
  as = 'button',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-brand-teal text-white hover:bg-teal-700 active:bg-teal-800',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
    outline: 'border-2 border-brand-teal text-brand-teal hover:bg-teal-50 active:bg-teal-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  const Component = as
  const content = loading ? (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      Loading...
    </div>
  ) : children

  if (as === 'span') {
    return (
      <span className={`inline-block ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
        {content}
      </span>
    )
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}

