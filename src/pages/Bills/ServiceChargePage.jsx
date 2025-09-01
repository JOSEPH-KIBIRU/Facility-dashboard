// src/pages/Bills/ServiceChargePage.jsx - UPDATED
import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import BillCard from '../../components/bills/BillCard'
import BillForm from '../../components/bills/BillForm'
import EditBillModal from '../../components/bills/EditBillModal'
import Card from '../../components/ui/Card'
import Toast from '../../components/ui/Toast'
import { useBills } from '../../hooks/useData'

const ServiceChargePage = () => {
  const { bills, loading, error, createBill, updateBill, deleteBill, markAsPaid } = useBills('service_charge')
  const [showForm, setShowForm] = useState(false)
  const [editingBill, setEditingBill] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const handleCreateBill = async (formData) => {
    setFormLoading(true)
    try {
      await createBill(formData)
      setShowForm(false)
      setToast({
        show: true,
        message: 'Bill created successfully!',
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

  const handleUpdateBill = async (billId, updates) => {
    try {
      await updateBill(billId, updates)
      setEditingBill(null)
      setToast({
        show: true,
        message: 'Bill updated successfully!',
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

  const handleDeleteBill = async (billId) => {
    try {
      await deleteBill(billId)
      setToast({
        show: true,
        message: 'Bill deleted successfully!',
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

  const handleMarkAsPaid = async (billId) => {
    try {
      await markAsPaid(billId)
      setToast({
        show: true,
        message: 'Bill marked as paid!',
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

        {/* Edit Bill Modal */}
        <EditBillModal
          bill={editingBill}
          isOpen={!!editingBill}
          onClose={() => setEditingBill(null)}
          onUpdate={handleUpdateBill}
        />

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Charges</h1>
            <p className="text-gray-600">
              {bills.length} bill{bills.length !== 1 ? 's' : ''} • 
              {' '}{bills.filter(b => b.status === 'pending').length} pending
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Service Charge'}
          </button>
        </div>

        {showForm && (
          <BillForm onSubmit={handleCreateBill} loading={formLoading} />
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        <div className="space-y-4">
          {bills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              onEdit={setEditingBill}
              onDelete={handleDeleteBill}
              onMarkAsPaid={handleMarkAsPaid}
            />
          ))}

          {bills.length === 0 && !loading && (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-lg font-medium text-gray-900">No service charges</h3>
                <p className="text-gray-600">Get started by adding your first service charge bill</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create First Bill
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ServiceChargePage