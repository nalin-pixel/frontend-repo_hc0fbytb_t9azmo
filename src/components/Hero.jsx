import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden pt-28">
      {/* Parallax background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_60%)] blur-3xl" />
      </div>

      {/* Spline 3D object */}
      <div className="absolute inset-0 -z-0">
        <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" />
      </div>

      {/* Foreground content with subtle glass panel */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Supermoderná platforma pre inzerciu
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_10px_60px_rgba(56,189,248,0.25)]">
            Predávaj a nakupuj s futuristickým dotykom
          </h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-white/70">
            Vytvor si inzerát za pár sekúnd, oslň kupujúcich 3D vizuálmi a moderným dizajnom. Rýchle, bezpečné a elegantné.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-slate-900 font-semibold shadow-[0_20px_60px_-15px] shadow-cyan-400/70 hover:brightness-110 transition">
              Začať pridávať inzerát
            </button>
            <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10 transition">
              Prezrieť si ponuky
            </button>
          </div>

          {/* Parallax badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'Overené profily',
              'Bezpečné platby',
              'AI odporúčania',
              'Okamžité správy',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/80 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade at bottom for smooth transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-slate-950" />
    </section>
  )
}
