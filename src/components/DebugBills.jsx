// src/components/DebugBills.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const DebugBills = () => {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBills = async () => {
      try {
        console.log('🔍 Debug: Fetching bills from Supabase...')
        
        const { data, error } = await supabase
          .from('bills')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('❌ Supabase error:', error)
          setError(error.message)
          return
        }

        console.log('✅ Bills data received:', data)
        setBills(data || [])
        
      } catch (err) {
        console.error('❌ Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBills()
  }, [])

  if (loading) return <div>Loading debug info...</div>

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h2 className="text-lg font-bold mb-2">🔧 Debug Information</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3">
          <strong>Error:</strong> {error}
        </div>
      )}
      <p><strong>Bills count:</strong> {bills.length}</p>
      <p><strong>Connection:</strong> {supabase ? 'Connected' : 'Disconnected'}</p>
      
      {bills.length > 0 && (
        <div className="mt-3">
          <h3 className="font-semibold">Sample Bill:</h3>
          <pre className="bg-white p-2 rounded text-xs">
            {JSON.stringify(bills[0], null, 2)}
          </pre>
        </div>
      )}
      
      <button 
        onClick={() => console.log('All bills:', bills)}
        className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Log Bills to Console
      </button>
    </div>
  )
}

export default DebugBills