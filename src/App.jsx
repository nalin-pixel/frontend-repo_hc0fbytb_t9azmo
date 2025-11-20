import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ParallaxShowcase from './components/ParallaxShowcase'
import Categories from './components/Categories'
import NewListings from './components/NewListings'
import SearchFilters from './components/SearchFilters'
import ChatWidget from './components/ChatWidget'
import CTA from './components/CTA'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(2,6,23,0.6),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(2,6,23,0.8),transparent_60%)]" />

      <Navbar />
      <main>
        <Hero />
        <SearchFilters />
        <NewListings />
        <Categories />
        <ParallaxShowcase />
        <CTA />
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white/60 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Inzeria — všetky práva vyhradené.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Podmienky</a>
            <a href="#" className="hover:text-white">Súkromie</a>
            <a href="#" className="hover:text-white">Kontakt</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}

export default App
