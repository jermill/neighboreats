import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export default function Input({ 
  label, 
  error,
  helperText,
  className = '',
  ...props 
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal dark:focus:ring-primary-dark focus:border-transparent transition bg-white dark:bg-dark-bg dark:text-dark-text ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-gray-500 dark:text-dark-text-muted">{helperText}</span>
      )}
    </div>
  )
}


