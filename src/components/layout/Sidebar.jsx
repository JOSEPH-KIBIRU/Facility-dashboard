// src/components/layout/Sidebar.jsx - CHECK LINKS
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/properties', label: 'Properties', icon: '🏢' },
    { path: '/bills/service-charge', label: 'Bills', icon: '💰' }, // Changed this
    { path: '/staff', label: 'Staff', icon: '👥' },
    { path: '/repairs', label: 'Repairs', icon: '🔧' },
    { path: '/reports/financial', label: 'Reports', icon: '📈' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar