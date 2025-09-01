// src/pages/Properties/PropertyList.jsx - UPDATED
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import PropertyCard from '../../components/properties/PropertyCard' // ADD
import EditPropertyModal from '../../components/properties/EditPropertyModal' // ADD
import Toast from '../../components/ui/Toast' // ADD
import { useProperties } from '../../hooks/useData'

const PropertyList = () => {
  // eslint-disable-next-line no-unused-vars
  const { properties, loading, error, createProperty, updateProperty, deleteProperty } = useProperties() // UPDATED
  const [editingProperty, setEditingProperty] = useState(null) // ADD
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' }) // ADD

  // ADD THESE HANDLERS:
  const handleUpdateProperty = async (propertyId, updates) => {
    try {
      await updateProperty(propertyId, updates)
      setEditingProperty(null)
      setToast({
        show: true,
        message: 'Property updated successfully!',
        type: 'success'
      })
    } catch (err) {
      setToast({
        show: true,
        message: `Error: ${err.message}`,
        type: 'error'
      })
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    try {
      await deleteProperty(propertyId)
      setToast({
        show: true,
        message: 'Property deleted successfully!',
        type: 'success'
      })
    } catch (err) {
      setToast({
        show: true,
        message: `Error: ${err.message}`,
        type: 'error'
      })
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ADD TOAST */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}

        {/* ADD EDIT MODAL */}
        <EditPropertyModal
          property={editingProperty}
          isOpen={!!editingProperty}
          onClose={() => setEditingProperty(null)}
          onUpdate={handleUpdateProperty}
        />

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
            <p className="text-gray-600">Manage your facility properties</p>
          </div>
          <Link to="/properties/register">
            <Button>Add New Property</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard // CHANGED FROM Card to PropertyCard
              key={property.id}
              property={property}
              onEdit={setEditingProperty} // ADD
              onDelete={handleDeleteProperty} // ADD
            />
          ))}
        </div>

        {properties.length === 0 && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-6xl">🏢</div>
              <h3 className="text-lg font-medium text-gray-900">No properties yet</h3>
              <p className="text-gray-600">Get started by adding your first property</p>
              <Link to="/properties/register">
                <Button>Add Property</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default PropertyList