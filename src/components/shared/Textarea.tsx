import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export default function Textarea({ label, error, helperText, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-dark-text">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal dark:focus:ring-primary-dark focus:border-transparent transition resize-none bg-white dark:bg-dark-bg dark:text-dark-text ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {helperText && !error && <span className="text-sm text-gray-500 dark:text-dark-text-muted">{helperText}</span>}
    </div>
  )
}


