// src/routes/AppRoutes.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Auth Pages
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

// Main Pages
import Dashboard from '../pages/Dashboard'

// Properties Pages
import PropertyList from '../pages/Properties/PropertyList'
import RegisterProperty from '../pages/Properties/RegisterProperty'

// Bills Pages
import ServiceChargePage from '../pages/Bills/ServiceChargePage'
import WaterBillPage from '../pages/Bills/WaterBillPage'
import ElectricityBillPage from '../pages/Bills/ElectricityBillPage'

// Staff Pages
import RegisterStaff from '../pages/Staff/RegisterStaff'
import StaffList from '../pages/Staff/StaffList'

// Repairs Pages
import RepairRequestForm from '../pages/Repairs/RepairRequestForm'
import RepairList from '../pages/Repairs/RepairList'

// Reports Pages
import FinancialReport from '../pages/Reports/FinancialReport'


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

const PublicRoute = ({ children }) => {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/dashboard" />
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />g

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Properties Routes */}
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/register"
        element={
          <ProtectedRoute>
            <RegisterProperty />
          </ProtectedRoute>
        }
      />

      {/* Bills Routes */}
      <Route
        path="/bills/service-charge"
        element={
          <ProtectedRoute>
            <ServiceChargePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bills/water"
        element={
          <ProtectedRoute>
            <WaterBillPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bills/electricity"
        element={
          <ProtectedRoute>
            <ElectricityBillPage />
          </ProtectedRoute>
        }
      />

      {/* Staff Routes */}
      <Route
        path="/staff/register"
        element={
          <ProtectedRoute>
            <RegisterStaff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <ProtectedRoute>
            <StaffList />
          </ProtectedRoute>
        }
      />

      {/* Repairs Routes */}
      <Route
        path="/repairs/request"
        element={
          <ProtectedRoute>
            <RepairRequestForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/repairs"
        element={
          <ProtectedRoute>
            <RepairList />
          </ProtectedRoute>
        }
      />

      {/* Reports Routes */}
      <Route
        path="/reports/financial"
        element={
          <ProtectedRoute>
            <FinancialReport />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default AppRoutes