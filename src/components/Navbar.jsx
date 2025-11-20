import React from 'react'
import { Menu, Plus, Search, User, Camera, Star, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_40px_-10px] shadow-cyan-400/50" />
              <Link to="/" className="text-white/90 text-lg font-semibold tracking-tight">Inzeria</Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link className="text-white/80 hover:text-white transition inline-flex items-center gap-1" to="/image-search"><Camera className="h-4 w-4"/> Obrázkové</Link>
              <Link className="text-white/80 hover:text-white transition inline-flex items-center gap-1" to="/feature"><Star className="h-4 w-4"/> Topovanie</Link>
              <Link className="text-white/80 hover:text-white transition inline-flex items-center gap-1" to="/admin"><Shield className="h-4 w-4"/> Admin</Link>
              <Link className="text-white/80 hover:text-white transition inline-flex items-center gap-1" to="/profile"><User className="h-4 w-4"/> Profil</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link to="/" className="hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10 transition">
                <Search className="h-4 w-4" />
                Hľadať
              </Link>
              <Link to="/new" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-slate-900 font-semibold shadow-[0_10px_40px_-10px] shadow-cyan-400/70 hover:brightness-110 transition">
                <Plus className="h-4 w-4" /> Pridať inzerát
              </Link>
              <button className="md:hidden grid place-items-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
