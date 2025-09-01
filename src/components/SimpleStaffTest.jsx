// src/components/SimpleStaffTest.jsx - NEW FILE
import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Card from './ui/Card'
import Button from './ui/Button'

const SimpleStaffTest = () => {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debug, setDebug] = useState('')

  const testConnection = async () => {
    setLoading(true)
    setError(null)
    setDebug('Starting test...')
    
    try {
      setDebug('Testing Supabase connection...')
      
      // Test 1: Basic connection
      // eslint-disable-next-line no-unused-vars
      const { data: testData, error: testError } = await supabase
        .from('staff')
        .select('count')
        .single()
      
      setDebug(`Connection test: ${testError ? 'FAILED' : 'SUCCESS'}`)
      if (testError) throw testError

      // Test 2: Get actual data
      setDebug('Fetching staff data...')
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false })

      setDebug(`Data fetch: ${error ? 'FAILED' : 'SUCCESS'}`)
      if (error) throw error

      console.log('🧪 SIMPLE TEST - Staff data:', data)
      setStaff(data || [])
      setDebug(`Found ${data?.length || 0} staff members`)
      
    } catch (err) {
      console.error('❌ SIMPLE TEST - Error:', err)
      setError(err.message)
      setDebug(`ERROR: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="p-6 bg-yellow-50">
      <h2 className="text-xl font-bold mb-4">🧪 SIMPLE STAFF TEST</h2>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span>Status:</span>
          <span className="font-medium">{loading ? 'Loading...' : 'Complete'}</span>
          <span>Staff Count:</span>
          <span className="font-medium">{staff.length}</span>
          <span>Error:</span>
          <span className="font-medium">{error || 'None'}</span>
        </div>

        <div className="bg-white p-3 rounded border">
          <p className="text-sm font-mono text-gray-700">{debug}</p>
        </div>

        <Button onClick={testConnection} disabled={loading}>
          {loading ? 'Testing...' : 'Run Test Again'}
        </Button>

        {staff.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Staff Found:</h3>
            {staff.map(person => (
              <div key={person.id} className="bg-green-50 p-2 rounded mb-2">
                <p className="text-sm">👤 {person.name} - {person.email}</p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-3 rounded">
            <h3 className="font-semibold text-red-800">Error Details:</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default SimpleStaffTest