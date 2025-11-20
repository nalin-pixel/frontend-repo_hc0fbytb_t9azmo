import React, { useEffect, useMemo, useState } from 'react'
import ListingCard from './ListingCard'

const categories = ['Elektronika', 'Šport', 'Reality', 'Autá', 'Móda', 'Tech']

export default function SearchFilters() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const base = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (category) params.set('category', category)
      if (city) params.set('city', city)
      if (priceMin) params.set('price_min', priceMin)
      if (priceMax) params.set('price_max', priceMax)
      params.set('limit', '24')
      const res = await fetch(`${base}/api/listings?${params.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const seedDemo = async () => {
    try {
      await fetch(`${base}/api/seed-demo`, { method: 'POST' })
      await fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hľadať..."
              className="rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white outline-none"
            >
              <option value="">Kategória</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mesto"
              className="rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none"
            />
            <div className="flex gap-2">
              <input
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="Cena od"
                type="number"
                className="w-1/2 rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none"
              />
              <input
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Cena do"
                type="number"
                className="w-1/2 rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={fetchData} className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-slate-900 font-semibold hover:brightness-110 transition">Filtrovať</button>
              <button onClick={seedDemo} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 hover:bg-white/10 transition">Demo</button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 text-white/60">Načítavam...</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((it) => (
              <ListingCard key={it.id} item={it} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
