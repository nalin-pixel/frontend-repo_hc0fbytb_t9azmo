import React, { useEffect, useState } from 'react'

export default function Admin() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('admin@inzeria.sk')
  const [overview, setOverview] = useState(null)
  const [status, setStatus] = useState('')

  const ensureAdmin = async () => {
    try {
      await fetch(`${base}/api/users/upsert`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, name:'Admin', admin:true, coins:1000})})
    } catch (e) { console.error(e) }
  }

  const load = async () => {
    setStatus('Načítavam...')
    try {
      await ensureAdmin()
      const res = await fetch(`${base}/api/admin/overview?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      setOverview(data)
      setStatus('')
    } catch (e) { setStatus('Chyba pri načítaní') }
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="pt-24 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Admin panel</h1>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="text-sm text-white/70">Admin email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
            </div>
            <button onClick={load} className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-slate-900 font-semibold">Načítať prehľad</button>
          </div>
          {status && <div className="mt-3 text-white/60 text-sm">{status}</div>}
        </div>

        {overview && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-white/60 text-sm">Používatelia</div><div className="text-2xl font-bold">{overview.total_users}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-white/60 text-sm">Inzeráty</div><div className="text-2xl font-bold">{overview.total_listings}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-white/60 text-sm">Topované</div><div className="text-2xl font-bold">{overview.featured_active}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-white/60 text-sm">Príjmy (mince)</div><div className="text-2xl font-bold">{overview.revenue}</div></div>
          </div>
        )}
      </div>
    </div>
  )
}
