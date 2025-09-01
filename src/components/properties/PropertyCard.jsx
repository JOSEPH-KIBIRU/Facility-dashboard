// src/components/properties/PropertyCard.jsx - NEW FILE
import React, { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${property.name}"? This will also delete all associated bills and repairs.`)) return
    
    setIsDeleting(true)
    try {
      await onDelete(property.id)
    } catch (err) {
      console.error('Error deleting property:', err)
      alert('Error deleting property: ' + err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow relative">
      {isDeleting && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {property.type}
          </span>
        </div>
        
        <p className="text-sm text-gray-600">{property.address}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {property.units} unit{property.units !== 1 ? 's' : ''}
          </span>
          
          {property.contact_email && (
            <span className="text-sm text-gray-500">
              {property.contact_email}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-3 border-t border-gray-100">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(property)}
            className="flex-1"
          >
            Edit
          </Button>
          
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard