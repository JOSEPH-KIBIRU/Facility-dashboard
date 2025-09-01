// src/components/repairs/RepairCard.jsx - NEW FILE
import React, { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

const RepairCard = ({ repair, onEdit, onDelete, onUpdateStatus }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true)
    try {
      await onUpdateStatus(repair.id, newStatus)
    } catch (err) {
      console.error('Error updating status:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this repair request?')) return
    
    setIsDeleting(true)
    try {
      await onDelete(repair.id)
    } catch (err) {
      console.error('Error deleting repair:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="p-4 border-l-4 border-blue-400 relative">
      {(isDeleting || isUpdating) && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{repair.title}</h3>
            <p className="text-sm text-gray-600">{repair.property?.name || 'Unknown Property'}</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(repair.status)}`}>
              {repair.status.replace('_', ' ')}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(repair.priority)}`}>
              {repair.priority} priority
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{repair.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Category: {repair.category}</span>
            <span>•</span>
            <span>Requested: {formatDate(repair.requested_date)}</span>
            {repair.completed_date && (
              <>
                <span>•</span>
                <span className="text-green-600">Completed: {formatDate(repair.completed_date)}</span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {/* Status Update Buttons */}
          {repair.status !== 'completed' && repair.status !== 'cancelled' && (
            <>
              {repair.status === 'pending' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusUpdate('in_progress')}
                  disabled={isUpdating}
                >
                  Start Work
                </Button>
              )}
              {repair.status === 'in_progress' && (
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleStatusUpdate('completed')}
                  disabled={isUpdating}
                >
                  Mark Complete
                </Button>
              )}
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleStatusUpdate('cancelled')}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </>
          )}

          {/* Edit and Delete */}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(repair)}
            disabled={isUpdating}
          >
            Edit
          </Button>
          
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default RepairCard