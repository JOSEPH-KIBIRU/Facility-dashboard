/* eslint-disable no-unused-vars */
// src/components/repairs/EditRepairModal.jsx - NEW FILE
import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import RepairForm from './RepairForm'

const EditRepairModal = ({ repair, isOpen, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      await onUpdate(repair.id, formData)
      onClose()
    } catch (err) {
      console.error('Error updating repair:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Edit Repair Request" 
      size="lg"
    >
      <RepairForm
        initialData={repair}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Modal>
  )
}

export default EditRepairModal