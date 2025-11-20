import React from 'react'

export default function CTA() {
  return (
    <section id="cta" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center shadow-2xl">
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Pripravený zažiariť so svojím inzerátom?</h3>
          <p className="mt-3 text-white/70">Publikuj dnes a zasiahni tisíce kupujúcich v štýle budúcnosti.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-slate-900 font-semibold shadow-[0_20px_60px_-15px] shadow-cyan-400/70 hover:brightness-110 transition">
              Publikovať inzerát
            </button>
            <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white/90 hover:bg-white/10 transition">
              Zistiť viac
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
