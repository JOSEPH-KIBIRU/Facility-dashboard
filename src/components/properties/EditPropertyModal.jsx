// src/components/properties/EditPropertyModal.jsx - NEW FILE
import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'

const EditPropertyModal = ({ property, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'residential',
    units: '',
    contact_email: '',
    contact_phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        address: property.address || '',
        type: property.type || 'residential',
        units: property.units || '',
        contact_email: property.contact_email || '',
        contact_phone: property.contact_phone || ''
      })
    }
  }, [property])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await onUpdate(property.id, {
        ...formData,
        units: parseInt(formData.units) || 0
      })
      onClose()
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

  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'mixed-use', label: 'Mixed Use' }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Property" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Input
          label="Property Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <Select
          label="Property Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={propertyTypeOptions}
          required
        />

        <Input
          label="Number of Units"
          name="units"
          type="number"
          value={formData.units}
          onChange={handleChange}
          min="0"
        />

        <Input
          label="Contact Email"
          name="contact_email"
          type="email"
          value={formData.contact_email}
          onChange={handleChange}
        />

        <Input
          label="Contact Phone"
          name="contact_phone"
          value={formData.contact_phone}
          onChange={handleChange}
        />

        <div className="flex space-x-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Updating...' : 'Update Property'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditPropertyModal