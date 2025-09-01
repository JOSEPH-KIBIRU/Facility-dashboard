// src/components/ui/Input.jsx
import React, { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '', 
  required = false,
  leftIcon,
  rightIcon,
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
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            ${leftIcon ? 'pl-10' : 'pl-3'}
            ${rightIcon ? 'pr-10' : 'pr-3'}
            py-2.5 text-sm transition-colors duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={`mt-1.5 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input