// src/pages/Staff/StaffList.jsx - UPDATED
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useStaff } from '../../hooks/useData'

const StaffList = () => {
  const { staff, loading, error, refetch } = useStaff()
  // eslint-disable-next-line no-unused-vars
  const [forceUpdate, setForceUpdate] = useState(0) // Add force update

  // Debug effect
  useEffect(() => {
    console.log('📊 StaffList: staff=', staff)
    console.log('📊 StaffList: loading=', loading)
    console.log('📊 StaffList: error=', error)
    console.log('📊 StaffList: staff count=', staff.length)
  }, [staff, loading, error])

  const handleRetry = () => {
    console.log('🔄 Manual refetch triggered')
    refetch()
    setForceUpdate(prev => prev + 1) // Force re-render
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64 flex-col space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading staff data...</p>
          <Button onClick={handleRetry} variant="secondary" size="sm">
            Retry
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error loading staff:</strong> {error}
        </div>
        <Button onClick={handleRetry} variant="secondary">
          Retry Loading
        </Button>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {/* Add key to force re-render */}
<div key={staff.length} className="space-y-6">
        {/* Debug Info */}
        <Card className="p-4 bg-green-50">
          <h3 className="font-semibold mb-2">✅ Hook is Working!</h3>
          <p>Staff count: <strong>{staff.length}</strong></p>
          <p>Check browser console for details</p>
        </Card>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Members</h1>
            <p className="text-gray-600">
              {staff.length} staff member{staff.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/staff/register">
            <Button>Add Staff Member</Button>
          </Link>
        </div>

        {/* Staff Grid - SIMPLIFIED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((staffMember) => (
            <Card key={staffMember.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {staffMember.name}
                </h3>
                <p className="text-sm text-gray-600">{staffMember.email}</p>
                <p className="text-sm text-gray-500">{staffMember.role}</p>
                {staffMember.phone && (
                  <p className="text-sm text-gray-500">📞 {staffMember.phone}</p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {staff.length === 0 && !loading && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-6xl">👥</div>
              <h3 className="text-lg font-medium text-gray-900">No staff members</h3>
              <p className="text-gray-600">Get started by adding your first staff member</p>
              <Link to="/staff/register">
                <Button>Add Staff</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default StaffList