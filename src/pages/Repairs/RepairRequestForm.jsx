// src/pages/Repairs/RepairRequestForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

const RepairRequestForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    property_id: '',
    description: '',
    priority: 'medium',
    category: 'plumbing'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Here you would typically make an API call to submit repair request
      console.log('Submitting repair request:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/repairs')
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
          <h1 className="text-2xl font-bold text-gray-900">Submit Repair Request</h1>
          <p className="text-gray-600">Request maintenance or repairs for your property</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Input
              label="Request Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="Property ID/Unit"
              name="property_id"
              value={formData.property_id}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="structural">Structural</option>
                <option value="appliance">Appliance</option>
                <option value="general">General Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/repairs')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default RepairRequestForm