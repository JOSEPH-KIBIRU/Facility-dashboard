// src/pages/Staff/RegisterStaff.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const RegisterStaff = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'maintenance',
    department: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Here you would typically make an API call to register staff
      console.log('Registering staff:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/staff')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Register Staff Member</h1>
          <p className="text-gray-600">Add a new staff member to your facility</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="manager">Manager</option>
                <option value="maintenance">Maintenance</option>
                <option value="administrator">Administrator</option>
                <option value="security">Security</option>
              </select>
            </div>

            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/staff')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Registering...' : 'Register Staff'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default RegisterStaff