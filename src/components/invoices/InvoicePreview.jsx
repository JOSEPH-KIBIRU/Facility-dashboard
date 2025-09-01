// src/components/invoices/InvoicePreview.jsx
import React from 'react'
import Card from '../ui/Card'

const InvoicePreview = ({ invoice }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
            <p className="text-sm text-gray-600">#{invoice.invoice_number}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Date: {formatDate(invoice.issue_date)}</p>
            <p className="text-sm text-gray-600">Due: {formatDate(invoice.due_date)}</p>
          </div>
        </div>

        {/* From/To */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
            <p className="text-sm text-gray-600">Facility Management Inc.</p>
            <p className="text-sm text-gray-600">123 Management St.</p>
            <p className="text-sm text-gray-600">City, State 12345</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">To:</h3>
            <p className="text-sm text-gray-600">{invoice.property_name}</p>
            <p className="text-sm text-gray-600">{invoice.property_address}</p>
            <p className="text-sm text-gray-600">{invoice.tenant_name}</p>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Invoice Details</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Description</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 text-sm">{invoice.description}</td>
                <td className="py-3 text-sm text-right">{formatCurrency(invoice.amount)}</td>
              </tr>
              {invoice.tax > 0 && (
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-sm">Tax</td>
                  <td className="py-3 text-sm text-right">{formatCurrency(invoice.tax)}</td>
                </tr>
              )}
              <tr>
                <td className="py-3 font-semibold text-gray-900">Total</td>
                <td className="py-3 font-semibold text-gray-900 text-right">
                  {formatCurrency(invoice.total_amount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">
            Payment Terms: Due upon receipt. Please make payment within 15 days.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Payment Methods: Bank Transfer, Credit Card, or Check
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Print Invoice
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Send Email
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Download PDF
          </button>
        </div>
      </div>
    </Card>
  )
}

export default InvoicePreview