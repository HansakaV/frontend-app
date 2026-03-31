import React, { useState, useEffect } from 'react'
import api from '../axiosConfig'
import { Plus, Trash2, Truck, Image as ImageIcon } from 'lucide-react'

export default function BusManager() {
  const [buses, setBuses] = useState([])
  const [form, setForm] = useState({ plateNumber: '', model: '', capacity: 40 })
  const [image, setImage] = useState(null)

  const fetchBuses = async () => {
    try {
      const resp = await api.get('/buses')
      setBuses(resp.data)
    } catch (e) { console.error('Failed to fetch buses', e) }
  }

  useEffect(() => { fetchBuses() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) { alert('Please select an image!'); return; }
    
    const formData = new FormData()
    formData.append('bus', new Blob([JSON.stringify(form)], { type: 'application/json' }))
    formData.append('image', image)

    try {
      await api.post('/buses', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setForm({ plateNumber: '', model: '', capacity: 40 })
      setImage(null)
      fetchBuses()
    } catch (e) { console.error('Failed to add bus', e) }
  }

  return (
    <div>
      <div className="header">
        <h1>Fleet Management</h1>
      </div>

      <div className="card" style={{marginBottom: '2rem'}}>
        <h3>Register New Bus</h3>
        <form onSubmit={handleSubmit}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div className="form-group">
              <label>Plate Number</label>
              <input value={form.plateNumber} onChange={e => setForm({...form, plateNumber: e.target.value})} placeholder="ABC-1234" required />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input value={form.model} onChange={e => setForm({...form, model: e.target.value})} placeholder="Leyland / Isuzu" required />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input type="number" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Bus Image</label>
              <input type="file" onChange={e => setImage(e.target.files[0])} accept="image/*" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{marginTop: '1rem'}}><Plus size={18} /> Register Bus</button>
        </form>
      </div>

      <div className="card-grid">
        {buses.map(b => (
          <div className="card" key={b.id} style={{padding: 0, overflow: 'hidden'}}>
            <img src={b.imageUrl} alt={b.plateNumber} style={{width: '100%', height: '180px', objectFit: 'cover'}} />
            <div style={{padding: '1rem'}}>
              <h3 style={{margin: '0 0 0.5rem 0'}}>{b.plateNumber}</h3>
              <p style={{margin: 0, fontSize: '0.875rem', color: '#64748b'}}>{b.model} • {b.capacity} Seats</p>
              <button 
                className="btn btn-danger" 
                style={{marginTop: '1rem', width: '100%'}} 
                onClick={() => api.delete(`/buses/${b.id}`).then(fetchBuses)}
              >
                <Trash2 size={16} /> Retire Bus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
