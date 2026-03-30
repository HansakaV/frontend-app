import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Users } from 'lucide-react'

export default function LabourManager() {
  const [labours, setLabours] = useState([])
  const [form, setForm] = useState({ name: '', role: 'Driver', contact: '', email: '' })

  const fetchLabours = async () => {
    try {
      const resp = await axios.get('/api/labours')
      setLabours(resp.data)
    } catch (e) {
      console.error('Failed to fetch labours', e)
    }
  }

  useEffect(() => { fetchLabours() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/labours', form)
      setForm({ name: '', role: 'Driver', contact: '', email: '' })
      fetchLabours()
    } catch (e) { console.error('Failed to add labour', e) }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/labours/${id}`)
      fetchLabours()
    } catch (e) { console.error('Failed to delete', e) }
  }

  return (
    <div>
      <div className="header">
        <h1>Labour Management</h1>
      </div>
      
      <div className="card" style={{marginBottom: '2rem'}}>
        <h3>Add New Labour</h3>
        <form onSubmit={handleSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full name" required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
              <option>Driver</option>
              <option>Conductor</option>
              <option>Mechanic</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} placeholder="Phone number" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email address" />
          </div>
          <button type="submit" className="btn btn-primary" style={{gridColumn: 'span 2'}}><Plus size={18} /> Add Labour</button>
        </form>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {labours.map(l => (
            <tr key={l.id}>
              <td>{l.name}</td>
              <td style={{fontWeight: 500}}>{l.role}</td>
              <td>{l.contact}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(l.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
