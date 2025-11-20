import React, { useState } from 'react'

export default function NewListing() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    title: '', description: '', price: '', category: 'Elektronika', city: '', latitude: '', longitude: '', images: '', seller_name: '', seller_email: 'demo@inzeria.sk', currency: 'EUR'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price || 0),
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        images: form.images ? form.images.split(/\s*,\s*/) : []
      }
      const res = await fetch(`${base}/api/listings`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Pridať inzerát</h1>

        <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <input required value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Názov" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            <textarea rows={5} value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Popis" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            <input required type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Cena" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            <input value={form.images} onChange={e=>setForm({...form, images:e.target.value})} placeholder="URL obrázkov (oddelené čiarkou)" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
          </div>
          <div className="space-y-3">
            <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2">
              <option>Elektronika</option>
              <option>Auto</option>
              <option>Reality</option>
              <option>Šport</option>
              <option>Nábytok</option>
            </select>
            <input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} placeholder="Mesto" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.latitude} onChange={e=>setForm({...form, latitude:e.target.value})} placeholder="Lat" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
              <input value={form.longitude} onChange={e=>setForm({...form, longitude:e.target.value})} placeholder="Lon" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input value={form.seller_name} onChange={e=>setForm({...form, seller_name:e.target.value})} placeholder="Meno predajcu" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
              <input value={form.seller_email} onChange={e=>setForm({...form, seller_email:e.target.value})} placeholder="Email" className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            </div>
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-slate-900 font-semibold">{loading ? 'Ukladám…' : 'Uložiť inzerát'}</button>
          </div>
        </form>

        {result && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-white/80">AI skóre kvality: <span className="font-semibold text-cyan-300">{result.quality_score}</span>/100</div>
            {result.quality_feedback && result.quality_feedback.length>0 && (
              <ul className="mt-2 list-disc list-inside text-white/70 text-sm">
                {result.quality_feedback.map((t,i)=>(<li key={i}>{t}</li>))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
