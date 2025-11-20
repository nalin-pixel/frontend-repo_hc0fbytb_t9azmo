import React, { useEffect, useRef, useState } from 'react'
import ListingCard from './ListingCard'
import { MessageCircle, Send, X } from 'lucide-react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{
    role: 'assistant',
    text: 'Ahoj! Povedz, čo hľadáš. Napr.: "Hľadám byt v Bratislave do 100000 €" alebo pošli URL fotky do sekcie Vyhľadávanie podľa fotky.',
  }])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, results, open])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${base}/api/ai/chat-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text, limit: 12 }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', text: data.message || 'Tu sú výsledky.' }])
      setResults(data.results || [])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Ups, niečo sa pokazilo. Skús to znova.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 p-4 text-slate-900 shadow-[0_10px_40px_-10px] shadow-cyan-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          aria-label="Otvoriť chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed inset-x-2 bottom-2 z-50 sm:right-4 sm:left-auto sm:w-[380px] rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur p-3 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">AI Chat vyhľadávač</div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10" aria-label="Zavrieť"><X className="h-4 w-4" /></button>
          </div>

          <div className="max-h-64 overflow-auto pr-1 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
                <span className={`inline-block rounded-xl px-3 py-2 ${m.role === 'user' ? 'bg-indigo-600/80' : 'bg-white/10'}`}>{m.text}</span>
              </div>
            ))}
            {loading && <div className="text-white/60 text-xs">Vyhľadávam…</div>}
            <div ref={endRef} />
          </div>

          <div className="mt-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Napíš, čo hľadáš"
              className="flex-1 rounded-xl bg-slate-800/80 border border-white/10 px-3 py-2 text-sm outline-none"
              aria-label="Správa pre chat"
            />
            <button onClick={send} className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-2 text-slate-900 font-semibold" aria-label="Odoslať">
              <Send className="h-4 w-4" />
            </button>
          </div>

          {results.length > 0 && (
            <div className="mt-3 grid grid-cols-1 gap-3 max-h-80 overflow-auto pr-1">
              {results.map((it) => (
                <ListingCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
