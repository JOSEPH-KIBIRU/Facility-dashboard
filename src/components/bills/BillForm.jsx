// src/components/bills/BillForm.jsx - IMPROVED
import React, { useState, useEffect } from 'react'
import Card from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { supabase } from '../../lib/supabaseClient'

const BillForm = ({ onSubmit, loading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    property_id: initialData.property_id || '',
    type: initialData.type || 'service_charge',
    amount: initialData.amount || '',
    due_date: initialData.due_date || '',
    description: initialData.description || ''
  })
  const [properties, setProperties] = useState([])
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
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

  const validateForm = () => {
    const errors = {}
    
    if (!formData.property_id) errors.property_id = 'Please select a property'
    if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Please enter a valid amount'
    if (!formData.due_date) errors.due_date = 'Please select a due date'
    if (!formData.description) errors.description = 'Please enter a description'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      status: 'pending'
    })
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error when field is changed
    if (formErrors[e.target.name]) {
      setFormErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }))
    }
  }

  const billTypeOptions = [
    { value: 'service_charge', label: 'Service Charge' },
    { value: 'water', label: 'Water Bill' },
    { value: 'electricity', label: 'Electricity Bill' },
    { value: 'maintenance', label: 'Maintenance Fee' }
  ]

  const propertyOptions = properties.map(prop => ({
    value: prop.id,
    label: `${prop.name} - ${prop.address}`
  }))

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Bill Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={billTypeOptions}
          required
          error={formErrors.type}
        />

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
          label="Amount *"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={handleChange}
          required
          placeholder="0.00"
          error={formErrors.amount}
        />

        <Input
          label="Due Date *"
          name="due_date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          required
          error={formErrors.due_date}
        />

        <Input
          label="Description *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Bill description and details"
          error={formErrors.description}
        />

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full"
        >
          {loading ? 'Creating Bill...' : 'Create Bill'}
        </Button>
      </form>
    </Card>
  )
}

export default BillForm