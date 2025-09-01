// src/pages/Repairs/RepairList.jsx - NEW FILE
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import RepairCard from '../../components/repairs/RepairCard'
import RepairForm from '../../components/repairs/RepairForm'
import EditRepairModal from '../../components/repairs/EditRepairModal'
import Toast from '../../components/ui/Toast'
import { useRepairs } from '../../hooks/useData'

const RepairList = () => {
  const { repairs, loading, error, createRepair, updateRepair, deleteRepair, updateRepairStatus } = useRepairs()
  const [showForm, setShowForm] = useState(false)
  const [editingRepair, setEditingRepair] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const handleCreateRepair = async (formData) => {
    setFormLoading(true)
    try {
      await createRepair(formData)
      setShowForm(false)
      setToast({
        show: true,
        message: 'Repair request created successfully!',
        type: 'success'
      })
    } catch (err) {
      setToast({
        show: true,
        message: `Error: ${err.message}`,
        type: 'error'
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateRepair = async (repairId, updates) => {
    try {
      await updateRepair(repairId, updates)
      setEditingRepair(null)
      setToast({
        show: true,
        message: 'Repair request updated successfully!',
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

  const handleDeleteRepair = async (repairId) => {
    try {
      await deleteRepair(repairId)
      setToast({
        show: true,
        message: 'Repair request deleted successfully!',
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

  const handleStatusUpdate = async (repairId, status) => {
    try {
      await updateRepairStatus(repairId, status)
      setToast({
        show: true,
        message: `Repair marked as ${status.replace('_', ' ')}!`,
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}

        {/* Edit Modal */}
        <EditRepairModal
          repair={editingRepair}
          isOpen={!!editingRepair}
          onClose={() => setEditingRepair(null)}
          onUpdate={handleUpdateRepair}
        />

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Repair Requests</h1>
            <p className="text-gray-600">Manage maintenance and repair requests</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'New Repair Request'}
          </button>
        </div>

        {showForm && (
          <RepairForm onSubmit={handleCreateRepair} loading={formLoading} />
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{repairs.length}</div>
            <p className="text-sm text-gray-600">Total</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {repairs.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {repairs.filter(r => r.status === 'in_progress').length}
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {repairs.filter(r => r.status === 'completed').length}
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </Card>
        </div>

        {/* Repairs List */}
        <div className="space-y-4">
          {repairs.map((repair) => (
            <RepairCard
              key={repair.id}
              repair={repair}
              onEdit={setEditingRepair}
              onDelete={handleDeleteRepair}
              onUpdateStatus={handleStatusUpdate}
            />
          ))}

          {repairs.length === 0 && !loading && (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl">🔧</div>
                <h3 className="text-lg font-medium text-gray-900">No repair requests</h3>
                <p className="text-gray-600">No repair requests have been submitted yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit First Request
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RepairList