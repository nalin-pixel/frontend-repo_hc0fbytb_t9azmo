import React, { useState } from 'react'

export default function FeatureButton({ listingId, email='demo@inzeria.sk' }) {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const feature = async () => {
    setBusy(true)
    setMsg('')
    try {
      const res = await fetch(`${base}/api/listings/${listingId}/feature`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, days:7})})
      if (!res.ok) { const e = await res.json(); throw new Error(e.detail || 'Chyba') }
      setMsg('Inzerát bol topovaný na 7 dní!')
    } catch (e) { setMsg(e.message) }
    finally { setBusy(false) }
  }

  return (
    <div>
      <button onClick={feature} disabled={busy} className="rounded-xl bg-amber-300/90 text-slate-900 font-semibold px-3 py-1.5">{busy ? 'Prebieha...' : 'Topovať inzerát'}</button>
      {msg && <div className="text-xs mt-1 text-white/70">{msg}</div>}
    </div>
  )
}
