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
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
      {helperText && !error && <span className="text-sm text-gray-500">{helperText}</span>}
    </div>
  )
}

