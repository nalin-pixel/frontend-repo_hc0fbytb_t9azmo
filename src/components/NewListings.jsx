import React, { useEffect, useState } from 'react'
import ListingCard from './ListingCard'

export default function NewListings() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/listings?limit=12`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Najnovšie inzeráty</h3>
          <a href="#" className="text-cyan-300/90 hover:text-cyan-200">Všetky ponuky →</a>
        </div>
        {loading ? (
          <div className="mt-10 text-white/60">Načítavam...</div>
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
