import React, { useEffect, useState } from 'react'

export default function Profile() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('demo@inzeria.sk')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [coinsToBuy, setCoinsToBuy] = useState(50)

  const load = async () => {
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch(`${base}/api/users/me?email=${encodeURIComponent(email)}`)
      if (res.status === 404) {
        // create default user
        const up = await fetch(`${base}/api/users/upsert`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, name:'Demo používateľ', coins: 100})})
        const data = await up.json()
        setUser(data)
      } else {
        const data = await res.json()
        setUser(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const purchase = async () => {
    try {
      const res = await fetch(`${base}/api/coins/purchase`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, amount: Number(coinsToBuy)})})
      const data = await res.json()
      setUser(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Môj profil</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <label className="text-sm text-white/70">Prihlasovací email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2" />
              <button onClick={load} className="mt-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-slate-900 font-semibold">Načítať profil</button>
            </div>

            {user && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white/80">Mince: <span className="font-semibold text-cyan-300">{user.coins}</span></div>
                <div className="mt-3 flex items-center gap-2">
                  <input type="number" min={1} value={coinsToBuy} onChange={(e)=>setCoinsToBuy(e.target.value)} className="rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 w-32" />
                  <button onClick={purchase} className="rounded-xl bg-emerald-400/90 text-slate-900 font-semibold px-4 py-2">Kúpiť mince</button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-white/80">Stav: {loading ? 'Načítavam...' : 'Pripravené'}</div>
              <div className="mt-2 text-white/60 text-sm">Zadaj e‑mail a načítaj alebo vytvor profil. Mince sa ukladajú v účte.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
