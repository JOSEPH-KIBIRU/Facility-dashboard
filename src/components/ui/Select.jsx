// src/components/ui/Select.jsx
import React, { forwardRef } from 'react'

const Select = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '', 
  required = false,
  options = [],
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        ref={ref}
        className={`
          w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          text-sm transition-colors duration-200
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {(error || helperText) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select