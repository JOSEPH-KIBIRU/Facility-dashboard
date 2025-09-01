// src/pages/Reports/FinancialReport.jsx
import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const FinancialReport = () => {
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  })

  // Mock financial data
  const financialData = {
    totalRevenue: 12500,
    totalExpenses: 8500,
    netProfit: 4000,
    revenueByCategory: [
      { category: 'Rent', amount: 8000, percentage: 64 },
      { category: 'Service Charges', amount: 3000, percentage: 24 },
      { category: 'Other', amount: 1500, percentage: 12 }
    ],
    expensesByCategory: [
      { category: 'Maintenance', amount: 3000, percentage: 35 },
      { category: 'Utilities', amount: 2500, percentage: 29 },
      { category: 'Staff', amount: 2000, percentage: 24 },
      { category: 'Other', amount: 1000, percentage: 12 }
    ]
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'Ksh'
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600">View and analyze financial performance</p>
          </div>
          <Button>Export PDF</Button>
        </div>

        {/* Date Range Selector */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <Button className="self-end">Apply Filter</Button>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(financialData.totalRevenue)}
            </div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(financialData.totalExpenses)}
            </div>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(financialData.netProfit)}
            </div>
            <p className="text-sm text-gray-600">Net Profit</p>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Revenue by Category</h3>
            <div className="space-y-3">
              {financialData.revenueByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Expenses by Category</h3>
            <div className="space-y-3">
              {financialData.expensesByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Report */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Detailed Transaction Report</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Description</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-sm">2024-01-15</td>
                  <td className="py-3 text-sm">January Rent - Unit 101</td>
                  <td className="py-3 text-sm">Rent</td>
                  <td className="py-3 text-sm text-right text-green-600">$1,200.00</td>
                  <td className="py-3 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-sm">2024-01-10</td>
                  <td className="py-3 text-sm">Maintenance - Plumbing</td>
                  <td className="py-3 text-sm">Maintenance</td>
                  <td className="py-3 text-sm text-right text-red-600">$250.00</td>
                  <td className="py-3 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default FinancialReport