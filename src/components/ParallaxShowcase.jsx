import React, { useEffect, useRef } from 'react'

export default function ParallaxShowcase() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const handleScroll = () => {
      const y = window.scrollY
      if (!el) return
      el.style.setProperty('--parallax', Math.min(y / 500, 1))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={ref} id="features" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(56,189,248,0.12),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="[transform:translateY(calc(var(--parallax)*-20px))] transition-transform duration-300">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl shadow-cyan-400/10">
              <div className="aspect-[4/3] w-full rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(56,189,248,0.3),rgba(99,102,241,0.3),rgba(56,189,248,0.3))]" />
              <div className="mt-6 grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl bg-white/5 border border-white/10" />
                ))}
              </div>
            </div>
          </div>
          <div className="[transform:translateY(calc(var(--parallax)*20px))] transition-transform duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Paralax výber funkcií</h2>
            <p className="mt-3 text-white/70">
              Vizuálne pútavé karty a plynulé pohyby vytvárajú moderný pocit. Ideálne pre prezentáciu toho, prečo práve ty.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                {
                  t: 'Smart filtrovanie',
                  d: 'Okamžite nájdi relevantné inzeráty podľa lokality, ceny a kategórie.',
                },
                {
                  t: 'Profil reputácie',
                  d: 'Body dôveryhodnosti, recenzie a odznaky pre serióznych predajcov.',
                },
                { t: 'Turbo publikovanie', d: 'Pridaj inzerát do 60 sekúnd s AI návrhmi textu.' },
              ].map((f) => (
                <div key={f.t} className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/10 transition">
                  <div className="text-cyan-300/80 text-sm">Funkcia</div>
                  <div className="mt-1 text-white font-semibold">{f.t}</div>
                  <div className="mt-1 text-white/70">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
