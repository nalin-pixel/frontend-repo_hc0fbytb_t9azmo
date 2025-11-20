import React, { useEffect, useState } from 'react'

export default function FeatureListing() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('demo@inzeria.sk')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${base}/api/listings?seller_email=${encodeURIComponent(email)}&limit=100`)
      const data = await res.json()
      setListings(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const feature = async (id) => {
    setStatus('Topujem...')
    try {
      const res = await fetch(`${base}/api/listings/${id}/feature`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, days:7})})
      const data = await res.json()
      setStatus('Hotovo!')
      await load()
    } catch (e) { setStatus('Chyba.') }
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Moje inzeráty a topovanie</h1>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1">
              <label className="text-sm text-white/70">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            </div>
            <button onClick={load} className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-slate-900 font-semibold">Načítať</button>
          </div>
          {status && <div className="mt-2 text-white/60 text-sm">{status}</div>}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((it)=> (
            <div key={it.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">{it.title}</div>
              <div className="text-white/60 text-sm mt-1">{it.city || '—'} · {it.currency || 'EUR'} {Number(it.price).toLocaleString()}</div>
              <div className="mt-3 flex items-center gap-3">
                <span className={`text-xs rounded-full px-2 py-1 border ${it.featured ? 'border-emerald-400/50 text-emerald-300' : 'border-white/10 text-white/60'}`}>{it.featured ? 'Topované' : 'Netopované'}</span>
                <button onClick={()=>feature(it.id)} className="rounded-xl bg-amber-300/90 text-slate-900 font-semibold px-3 py-1.5">Topovať (7 dní)</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
