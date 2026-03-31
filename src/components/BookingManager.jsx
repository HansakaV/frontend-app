import React, { useState, useEffect } from 'react'
import api from '../axiosConfig'
import { Plus, Trash2, Calendar } from 'lucide-react'

export default function BookingManager() {
  const [bookings, setBookings] = useState([])
  const [buses, setBuses] = useState([])
  const [form, setForm] = useState({ busId: '', customerName: '', seatNumber: '', journeyDate: '' })

  const fetchAll = async () => {
    try {
      const [bookData, busData] = await Promise.all([
        api.get('/bookings'),
        api.get('/buses')
      ])
      setBookings(bookData.data)
      setBuses(busData.data)
    } catch (e) { console.error('Failed to fetch', e) }
  }

  useEffect(() => { fetchAll() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/bookings', form)
      setForm({ busId: '', customerName: '', seatNumber: '', journeyDate: '' })
      fetchAll()
    } catch (e) { console.error('Failed to add booking', e) }
  }

  return (
    <div>
      <div className="header">
        <h1>Booking Management</h1>
      </div>

      <div className="card" style={{marginBottom: '2rem'}}>
        <h3>New Booking</h3>
        <form onSubmit={handleSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="form-group">
            <label>Bus</label>
            <select value={form.busId} onChange={e => setForm({...form, busId: e.target.value})} required>
              <option value="">Select a Bus</option>
              {buses.map(b => <option key={b.id} value={b.id}>{b.plateNumber} ({b.model})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Passenger Name</label>
            <input value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} placeholder="Name" required />
          </div>
          <div className="form-group">
            <label>Seat Number</label>
            <input value={form.seatNumber} onChange={e => setForm({...form, seatNumber: e.target.value})} placeholder="A1, B5, etc." required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={form.journeyDate} onChange={e => setForm({...form, journeyDate: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{gridColumn: 'span 2'}}><Plus size={18} /> Confirm Booking</button>
        </form>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Passenger</th>
            <th>Bus ID</th>
            <th>Seat</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.customerName}</td>
              <td style={{fontSize: '0.8rem', fontFamily: 'monospace'}}>{b.busId}</td>
              <td>{b.seatNumber}</td>
              <td>{b.journeyDate}</td>
              <td>
                <button className="btn btn-danger" onClick={() => api.delete(`/bookings/${b.id}`).then(fetchAll)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
