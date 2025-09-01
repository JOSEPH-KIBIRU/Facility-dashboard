// src/components/layout/DashboardLayout.jsx
import React from 'react'
import Navbar from '../ui/Navbar'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout