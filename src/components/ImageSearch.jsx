import React, { useState } from 'react'
import ListingCard from './ListingCard'

export default function ImageSearch() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [imageUrl, setImageUrl] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const search = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${base}/api/ai/image-search`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({image_url: imageUrl, limit: 12})})
      if (!res.ok) {
        const e = await res.json()
        throw new Error(e.detail || 'Chyba vyhľadávania')
      }
      const data = await res.json()
      setResults(data.results || [])
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Vyhľadávanie podľa obrázka</h1>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="text-sm text-white/70">URL obrázka</label>
              <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="https://...jpg" className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            </div>
            <button onClick={search} className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-slate-900 font-semibold">Hľadať</button>
          </div>
          {error && <div className="mt-3 text-rose-400 text-sm">{error}</div>}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((it)=> (
            <ListingCard key={it.id} item={it} />
          ))}
        </div>
      </div>
    </div>
  )
}
