// src/pages/Properties/RegisterProperty.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useProperties } from '../../hooks/useData'

const RegisterProperty = () => {
  const navigate = useNavigate()
  const { createProperty, loading, error } = useProperties()
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'residential',
    units: '',
    contact_email: '',
    contact_phone: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    // Validation
    if (!formData.name || !formData.address) {
      setFormError('Name and address are required')
      return
    }

    try {
      await createProperty({
        ...formData,
        units: parseInt(formData.units) || 0
      })
      navigate('/properties')
    } catch (err) {
      setFormError(err.message)
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
          <h1 className="text-2xl font-bold text-gray-900">Register New Property</h1>
          <p className="text-gray-600">Add a new property to your facility management system</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {(formError || error) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {formError || error}
              </div>
            )}

            <Input
              label="Property Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Sunset Apartments"
            />

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Full property address"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="mixed-use">Mixed Use</option>
              </select>
            </div>

            <Input
              label="Number of Units"
              name="units"
              type="number"
              value={formData.units}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />

            <Input
              label="Contact Email"
              name="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="property@example.com"
            />

            <Input
              label="Contact Phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="+1-555-0123"
            />

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/properties')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Registering...' : 'Register Property'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default RegisterProperty