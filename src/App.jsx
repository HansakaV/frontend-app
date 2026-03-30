import React, { useState } from 'react'
import { Users, Truck, Calendar, LayoutDashboard } from 'lucide-react'
import LabourManager from './components/LabourManager'
import BusManager from './components/BusManager'
import BookingManager from './components/BookingManager'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'labours': return <LabourManager />
      case 'buses': return <BusManager />
      case 'bookings': return <BookingManager />
      default: return (
        <div>
          <div className="header">
            <h1>Dashboard</h1>
            <p style={{color: '#64748b'}}>Welcome to Bus Depot Management System</p>
          </div>
          <div className="card-grid">
            <div className="card" onClick={() => setActiveTab('labours')}>
              <Users size={32} color="#2563eb" />
              <h3>Labour Management</h3>
              <p>Manage drivers, mechanics and conductors</p>
            </div>
            <div className="card" onClick={() => setActiveTab('buses')}>
              <Truck size={32} color="#2563eb" />
              <h3>Fleet Management</h3>
              <p>Register and track all buses in the depot</p>
            </div>
            <div className="card" onClick={() => setActiveTab('bookings')}>
              <Calendar size={32} color="#2563eb" />
              <h3>Bookings</h3>
              <p>Schedule trips and handle passenger bookings</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <Truck size={28} />
          <span>BusDepot v1.0</span>
        </div>
        <div className="nav-links">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div className={`nav-item ${activeTab === 'labours' ? 'active' : ''}`} onClick={() => setActiveTab('labours')}>
            <Users size={20} />
            <span>Labours</span>
          </div>
          <div className={`nav-item ${activeTab === 'buses' ? 'active' : ''}`} onClick={() => setActiveTab('buses')}>
            <Truck size={20} />
            <span>Buses</span>
          </div>
          <div className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <Calendar size={20} />
            <span>Bookings</span>
          </div>
        </div>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}
