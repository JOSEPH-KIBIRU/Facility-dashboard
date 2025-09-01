// src/components/bills/BillCard.jsx - UPDATED
import React, { useState } from 'react'
import Card from '../ui/Card'
import Button from '../ui/Button'

const BillCard = ({ bill, onEdit, onDelete, onMarkAsPaid }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'Ksh'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this bill?')) return
    
    setIsDeleting(true)
    try {
      await onDelete(bill.id)
    } catch (err) {
      console.error('Error deleting bill:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="p-4 border border-gray-200 mb-3 relative">
      {isDeleting && (
        <div className="absolute inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-lg">
              {bill.properties?.name || `Bill #${bill.id.slice(0, 8)}`}
            </h3>
            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(bill.status)}`}>
              {bill.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 capitalize">
            {bill.type?.replace('_', ' ')}
          </p>
          
          <p className="text-lg font-bold text-gray-900 mt-1">
            {formatCurrency(bill.amount)}
          </p>
          
          <p className="text-sm text-gray-500">
            Due: {formatDate(bill.due_date)}
          </p>
          
          {bill.description && (
            <p className="text-sm text-gray-600 mt-1">{bill.description}</p>
          )}

          {bill.paid_date && (
            <p className="text-sm text-green-600 mt-1">
              Paid on: {formatDate(bill.paid_date)}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
        {bill.status === 'pending' && (
          <Button
            size="sm"
            variant="success"
            onClick={() => onMarkAsPaid(bill.id)}
            className="flex-1"
          >
            Mark Paid
          </Button>
        )}
        
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(bill)}
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
    </Card>
  )
}

export default BillCard