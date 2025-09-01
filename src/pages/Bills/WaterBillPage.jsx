// src/pages/Bills/ElectricityBillPage.jsx - CORRECTED
import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import BillCard from '../../components/bills/BillCard'
import Card from '../../components/ui/Card' // ADD THIS IMPORT
import { useBills } from '../../hooks/useData'

const ElectricityBillPage = () => {
  const { bills, loading, error } = useBills('electricity')

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Electricity Bills</h1>
          <p className="text-gray-600">Manage electricity utility bills</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        <div className="space-y-4">
          {bills.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}

          {bills.length === 0 && !loading && (
            <Card className="p-12 text-center"> {/* FIXED */}
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-lg font-medium text-gray-900">No electricity bills</h3>
              <p className="text-gray-600">No electricity bills have been created yet</p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ElectricityBillPage