// src/components/bills/EditBillModal.jsx
import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'
// eslint-disable-next-line no-unused-vars
import { supabase} from '../../lib/supabaseClient'

const EditBillModal = ({ bill, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    amount: '',
    due_date: '',
    description: '',
    status: 'pending'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (bill) {
      setFormData({
        amount: bill.amount,
        due_date: bill.due_date,
        description: bill.description,
        status: bill.status
      })
    }
  }, [bill])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await onUpdate(bill.id, formData)
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

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Bill" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Input
          label="Amount"
          name="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <Input
          label="Due Date"
          name="due_date"
          type="date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
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
            {loading ? 'Updating...' : 'Update Bill'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditBillModal