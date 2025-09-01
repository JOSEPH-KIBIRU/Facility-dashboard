// src/components/repairs/RepairForm.jsx - NEW FILE
import React, { useState, useEffect } from 'react'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import { supabase } from '../../lib/supabaseClient'

const RepairForm = ({ onSubmit, loading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    property_id: '',
    title: '',
    description: '',
    category: 'general',
    priority: 'medium'
  })
  const [properties, setProperties] = useState([])
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setPropertiesLoading(true)
      const { data, error } = await supabase
        .from('properties')
        .select('id, name, address')
        .order('name')

      if (error) throw error
      setProperties(data || [])
    } catch (err) {
      console.error('Error fetching properties:', err)
    } finally {
      setPropertiesLoading(false)
    }
  }

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        property_id: initialData.property_id || '',
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'general',
        priority: initialData.priority || 'medium'
      })
    }
  }, [initialData])

  const validateForm = () => {
    const errors = {}
    if (!formData.property_id) errors.property_id = 'Please select a property'
    if (!formData.title) errors.title = 'Please enter a title'
    if (!formData.description) errors.description = 'Please enter a description'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    onSubmit({
      ...formData,
      status: 'pending',
      requested_date: new Date().toISOString().split('T')[0]
    })
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }))
    }
  }

  const categoryOptions = [
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'structural', label: 'Structural' },
    { value: 'appliance', label: 'Appliance' },
    { value: 'general', label: 'General Maintenance' }
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'emergency', label: 'Emergency' }
  ]

  const propertyOptions = properties.map(prop => ({
    value: prop.id,
    label: `${prop.name} - ${prop.address}`
  }))

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Property *"
          name="property_id"
          value={formData.property_id}
          onChange={handleChange}
          options={propertyOptions}
          required
          disabled={propertiesLoading}
          error={formErrors.property_id}
          helperText={propertiesLoading ? 'Loading properties...' : ''}
        />

        <Input
          label="Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Leaking faucet in kitchen"
          error={formErrors.title}
        />

        <Select
          label="Category *"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={categoryOptions}
          required
        />

        <Select
          label="Priority *"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={priorityOptions}
          required
        />

        <Textarea
          label="Description *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Please describe the issue in detail..."
          error={formErrors.description}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : initialData.id ? 'Update Repair' : 'Create Repair Request'}
        </Button>
      </form>
    </Card>
  )
}

export default RepairForm