// src/components/ui/Navbar.jsx
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from './Button'

const Navbar = ({ 
  title = "Jkibiru Facility Management",
  logo = "/logo.svg",
  userMenuItems = [],
  className = '' 
}) => {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const defaultMenuItems = [
    {
      label: 'Profile',
      onClick: () => console.log('Profile clicked'),
      icon: '👤'
    },
    {
      label: 'Settings',
      onClick: () => console.log('Settings clicked'),
      icon: '⚙️'
    },
    {
      label: 'Sign Out',
      onClick: signOut,
      icon: '🚪',
      variant: 'danger'
    }
  ]

  const menuItems = userMenuItems.length > 0 ? userMenuItems : defaultMenuItems

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-4">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-8 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        
        {/* Right side - User menu */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700 hidden sm:block">
            Welcome, {user?.email}
          </span>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600 hidden md:block">
                {user?.email}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.onClick()
                        setIsMenuOpen(false)
                      }}
                      className={`
                        w-full text-left px-4 py-2 text-sm transition-colors duration-200
                        ${item.variant === 'danger' 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                        flex items-center space-x-2
                      `}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mobile sign out button */}
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="sm:hidden"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar