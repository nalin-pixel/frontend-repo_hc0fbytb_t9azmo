import React from 'react'
import { MapPin, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ListingCard({ item }) {
  return (
    <Link to={`/listing/${item.id}`} className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition">
      <div className="aspect-[16/10] w-full bg-gradient-to-br from-slate-800 to-slate-900 relative">
        {item.images && item.images[0] ? (
          <img src={item.images[0]} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/30 text-xs">No image</div>
        )}
        {item.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-2.5 py-1 text-[10px] font-semibold text-slate-900 shadow shadow-cyan-400/40">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-white font-semibold leading-tight line-clamp-2">{item.title}</h4>
          <div className="shrink-0 rounded-lg bg-white/5 px-2 py-1 text-xs text-white/80 border border-white/10">{item.currency || 'EUR'} {Number(item.price).toLocaleString()}</div>
        </div>
        <div className="mt-2 text-white/60 text-sm line-clamp-2">{item.description}</div>
        <div className="mt-3 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {item.city || '—'}
          </div>
          <div className="inline-flex items-center gap-1 text-cyan-300/90 group-hover:translate-x-0.5 transition-transform">
            Detail <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
