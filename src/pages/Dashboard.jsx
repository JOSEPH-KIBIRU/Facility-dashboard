// src/pages/Dashboard.jsx
import React from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/ui/Card'

const Dashboard = () => {
  const stats = [
    { label: 'Total Properties', value: '12', change: '+2', changeType: 'positive' },
    { label: 'Active Bills', value: '8', change: '-1', changeType: 'negative' },
    { label: 'Pending Repairs', value: '3', change: '+1', changeType: 'negative' },
    { label: 'Total Staff', value: '5', change: '+0', changeType: 'neutral' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your facility management dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-800' :
                  stat.changeType === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {stat.change}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New property registered</span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Bill payment received</span>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Repair request submitted</span>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard