// src/components/ui/Card.jsx
import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const classes = `
    bg-white rounded-lg border border-gray-200
    ${paddingClasses[padding]}
    ${hover ? 'hover:shadow-lg transition-shadow duration-200' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card