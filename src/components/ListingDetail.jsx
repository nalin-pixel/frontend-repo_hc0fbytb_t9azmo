import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'

function StaticMap({ lat, lon, label }) {
  if (lat == null || lon == null) return null
  const url = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=12&size=800x400&markers=${lat},${lon},lightblue1` 
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <img src={url} alt={label || 'Mapa'} className="w-full h-auto object-cover" />
    </div>
  )
}

export default function ListingDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/listings/${id}`)
        const data = await res.json()
        setItem(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="min-h-screen text-white p-8">Načítavam...</div>
  if (!item) return <div className="min-h-screen text-white p-8">Inzerát sa nenašiel</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Späť
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-800 to-slate-900" />
            </div>
            <StaticMap lat={item.latitude} lon={item.longitude} label={item.city} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <div className="mt-2 text-white/70">{item.description}</div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
              <span className="text-white/80">Cena:</span>
              <span className="font-semibold">{item.currency || 'EUR'} {Number(item.price).toLocaleString()}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">Kategória: {item.category}</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-2"><MapPin className="h-4 w-4" /> Mesto: {item.city || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
