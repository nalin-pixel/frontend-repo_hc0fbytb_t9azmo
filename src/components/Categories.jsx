import React from 'react'
import { Car, Home, Shirt, Smartphone, Bike, Cpu } from 'lucide-react'

const cats = [
  { icon: Car, label: 'Autá' },
  { icon: Home, label: 'Reality' },
  { icon: Shirt, label: 'Móda' },
  { icon: Smartphone, label: 'Elektronika' },
  { icon: Bike, label: 'Šport' },
  { icon: Cpu, label: 'Tech' },
]

export default function Categories() {
  return (
    <section id="categories" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">Populárne kategórie</h3>
          <a href="#" className="text-cyan-300/90 hover:text-cyan-200">Zobraziť všetko →</a>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cats.map(({ icon: Icon, label }) => (
            <button key={label} className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80 hover:bg-white/10 transition">
              <div className="grid place-items-center h-14 w-14 rounded-xl bg-gradient-to-tr from-indigo-500/50 to-cyan-400/50 border border-white/20">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div className="font-semibold text-white/90">{label}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
