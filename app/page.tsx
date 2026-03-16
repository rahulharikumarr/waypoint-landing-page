'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const G  = '#39FF14'
const BG = '#050505'
const T  = {
  high: '#f0f0f0',
  mid:  'rgba(255,255,255,0.65)',
  low:  'rgba(255,255,255,0.38)',
  dim:  'rgba(255,255,255,0.2)',
}
const CARD: React.CSSProperties = {
  background: 'rgba(10,10,10,0.92)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  backdropFilter: 'blur(20px)',
}

/* ─── Global animated gradient background (fixed, full-page) ─── */
function PageGlow() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden>
      {/* Main bottom blob */}
      <div style={{
        position: 'absolute', bottom: -300, left: '50%', marginLeft: -600,
        width: 1200, height: 1200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.18) 0%, rgba(57,255,20,0.06) 40%, transparent 70%)',
        filter: 'blur(100px)',
        animation: 'blob1 16s ease-in-out infinite',
        willChange: 'transform',
      }} />
      {/* Top-right accent */}
      <div style={{
        position: 'absolute', top: -200, right: -200,
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.14) 0%, rgba(57,255,20,0.04) 45%, transparent 70%)',
        filter: 'blur(120px)',
        animation: 'blob2 20s ease-in-out infinite',
        willChange: 'transform',
      }} />
      {/* Mid-left */}
      <div style={{
        position: 'absolute', top: '45%', left: -150,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.10) 0%, transparent 65%)',
        filter: 'blur(80px)',
        animation: 'blob3 12s ease-in-out infinite',
        willChange: 'transform',
      }} />
    </div>
  )
}

/* ─── Navbar ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 68, padding: '0 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,5,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Image src="/warp-logo.png" alt="Warp" width={76} height={22} style={{ objectFit: 'contain' }} priority />
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: T.high, letterSpacing: '-0.025em', fontFamily: 'var(--font-wordmark)' }}>Waypoint</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['Features', 'How It Works', 'Pricing'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
            style={{ fontSize: 14, color: T.low, textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = T.high)}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = T.low)}
          >{l}</a>
        ))}
      </div>
      <a href="https://warp-tms.vercel.app/signup"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(57,255,20,0.08)',
          border: '1px solid rgba(57,255,20,0.35)',
          color: G, fontWeight: 700, fontSize: 13,
          padding: '9px 20px', borderRadius: 10, textDecoration: 'none',
          letterSpacing: '-0.01em', transition: 'background 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.6)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.35)'; }}
      >Get started free <span style={{ opacity: 0.7 }}>→</span></a>
    </nav>
  )
}

/* ─── Shipment card (rich version) ─── */
function ShipmentCard() {
  return (
    <div style={{
      ...CARD, padding: '24px 26px',
      boxShadow: '0 48px 96px rgba(0,0,0,0.7), 0 0 80px rgba(57,255,20,0.1)',
      border: '1px solid rgba(57,255,20,0.15)',
    }}>
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G}, rgba(57,255,20,0.2))`, borderRadius: '20px 20px 0 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: G, fontWeight: 600, letterSpacing: '0.05em' }}>S-45189-2611</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.25)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: G }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, boxShadow: '0 0 8px rgba(57,255,20,1)', display: 'inline-block', animation: 'dotPulse 2s ease-in-out infinite' }} />
          In Transit
        </span>
      </div>
      {/* Route */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4, flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)' }} />
          <div style={{ width: 1.5, flex: 1, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(57,255,20,0.5))', margin: '4px 0' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: G, boxShadow: `0 0 10px rgba(57,255,20,0.9)` }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.high, letterSpacing: '-0.01em' }}>Los Angeles, CA</div>
            <div style={{ fontSize: 11, color: T.low, marginTop: 2 }}>Pickup: Mon Mar 17, 08:00–12:00</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.high, letterSpacing: '-0.01em' }}>Chicago, IL</div>
            <div style={{ fontSize: 11, color: T.low, marginTop: 2 }}>Est. delivery: Thu Mar 20</div>
          </div>
        </div>
      </div>
      {/* Cargo */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', marginBottom: 18, fontSize: 12, color: T.mid, display: 'flex', gap: 16 }}>
        <span>4 Pallets</span>
        <span style={{ color: T.dim }}>·</span>
        <span>Consumer Electronics</span>
        <span style={{ color: T.dim }}>·</span>
        <span>LTL</span>
      </div>
      {/* Progress */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '62%', background: `linear-gradient(90deg, rgba(57,255,20,0.5), ${G})`, borderRadius: 3, boxShadow: '0 0 12px rgba(57,255,20,0.6)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {['Booked', 'Picked Up', 'In Transit', 'Delivered'].map((s, i) => (
            <span key={s} style={{ fontSize: 10, fontWeight: i <= 2 ? 600 : 400, color: i <= 2 ? (i === 2 ? G : 'rgba(255,255,255,0.6)') : T.dim }}>{s}</span>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {[['QUOTED', '$253.24'], ['TRANSIT', '3 days'], ['CARRIER', 'Warp LTL']].map(([k, v], i) => (
          <div key={k} style={{ flex: 1, paddingLeft: i > 0 ? 16 : 0, paddingRight: i < 2 ? 16 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ fontSize: 9, color: T.dim, fontWeight: 700, letterSpacing: '0.09em', marginBottom: 5 }}>{k}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.high, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.02em' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Quote options mini card ─── */
function QuoteOptions() {
  const [selected, setSelected] = useState(0)
  const opts = [
    { name: 'Warp LTL', price: '$253.24', transit: '3 days', warp: true },
    { name: 'Estes Express', price: '$312.50', transit: '4 days', warp: false },
    { name: 'Saia Motor Freight', price: '$289.00', transit: '3 days', warp: false },
  ]
  return (
    <div style={{ ...CARD, padding: '20px', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Shared LTL · 3 options</div>
      {opts.map((o, i) => (
        <div key={o.name} onClick={() => setSelected(i)} style={{
          padding: '12px 14px', borderRadius: 12, marginBottom: 8, cursor: 'pointer',
          background: i === selected ? 'rgba(57,255,20,0.07)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${i === selected ? 'rgba(57,255,20,0.35)' : 'rgba(255,255,255,0.06)'}`,
          transition: 'all 0.15s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: o.warp ? G : T.high }}>{o.name}</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: T.high, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.03em' }}>{o.price}</span>
          </div>
          <div style={{ fontSize: 11, color: T.low, marginTop: 3 }}>{o.transit} transit</div>
        </div>
      ))}
      <button style={{ width: '100%', marginTop: 4, padding: '12px', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em', background: 'rgba(57,255,20,0.09)', border: '1px solid rgba(57,255,20,0.38)', color: G, transition: 'background 0.15s, border-color 0.15s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.16)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.6)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.09)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.38)'; }}
      >
        Book Warp LTL <span style={{ opacity: 0.65 }}>→</span>
      </button>
    </div>
  )
}

/* ─── Feature Bento: mini UI previews ─── */

function QuotingPreview() {
  const rows = [
    { name: 'Warp LTL', price: '$253', days: 3, pct: 52, green: true },
    { name: 'Estes Express', price: '$312', days: 4, pct: 64, green: false },
    { name: 'Saia LTL', price: '$289', days: 3, pct: 59, green: false },
  ]
  return (
    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rows.map((r, i) => (
        <div key={r.name} style={{ background: i === 0 ? 'rgba(57,255,20,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 0 ? 'rgba(57,255,20,0.25)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? G : T.mid }}>{r.name}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: T.high, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.03em' }}>{r.price}</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${r.pct}%`, background: i === 0 ? G : 'rgba(255,255,255,0.2)', borderRadius: 2, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 10, color: T.dim, marginTop: 5 }}>{r.days}-day transit</div>
        </div>
      ))}
    </div>
  )
}

function TrackingPreview() {
  const events = [
    { label: 'Picked up', loc: 'Los Angeles, CA', done: true, active: false },
    { label: 'Departed terminal', loc: 'Phoenix, AZ', done: true, active: false },
    { label: 'In transit', loc: 'Albuquerque, NM', done: false, active: true },
    { label: 'Delivery est.', loc: 'Chicago, IL', done: false, active: false },
  ]
  return (
    <div style={{ marginTop: 20 }}>
      {events.map((e, i) => (
        <div key={e.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < events.length - 1 ? 14 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: e.active ? G : e.done ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.1)', border: e.active ? `2px solid ${G}` : 'none', boxShadow: e.active ? '0 0 8px rgba(57,255,20,0.8)' : 'none', animation: e.active ? 'dotPulse 2s ease-in-out infinite' : 'none' }} />
            {i < events.length - 1 && <div style={{ width: 1, height: 20, background: e.done ? 'rgba(57,255,20,0.2)' : 'rgba(255,255,255,0.07)', marginTop: 3 }} />}
          </div>
          <div style={{ paddingBottom: 4 }}>
            <div style={{ fontSize: 12, fontWeight: e.active ? 700 : 500, color: e.active ? T.high : e.done ? T.mid : T.dim }}>{e.label}</div>
            <div style={{ fontSize: 10, color: T.dim, marginTop: 2 }}>{e.loc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function InvoicePreview() {
  return (
    <div style={{ marginTop: 20 }}>
      {[['Quoted rate', '$253.24', false], ['Carrier invoice', '$253.24', false], ['Variance', '$0.00', true]].map(([k, v, green]) => (
        <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: T.low }}>{k}</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: green ? G : T.high, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.02em' }}>{v}</span>
        </div>
      ))}
      <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontSize: 11, fontWeight: 700, color: G }}>Invoice auto-matched ✓</span>
      </div>
    </div>
  )
}

function AnalyticsPreview() {
  const bars = [65, 82, 48, 91, 56, 74, 88]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: `${h}%`, background: i === 4 ? G : `rgba(57,255,20,${0.15 + h/400})`, borderRadius: '3px 3px 0 0', boxShadow: i === 4 ? '0 0 10px rgba(57,255,20,0.5)' : 'none', transition: 'height 0.4s ease' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
        {days.map((d, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: T.dim }}>{d}</div>)}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
        {[['$18.4K', 'This week'], ['↓6%', 'vs last week']].map(([v, l]) => (
          <div key={l} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.high, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.03em' }}>{v}</div>
            <div style={{ fontSize: 10, color: T.dim, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderPreview() {
  const orders = [
    { id: 'PO-2041', dest: 'Chicago, IL', status: 'Ready to ship', green: true },
    { id: 'PO-2040', dest: 'Dallas, TX', status: 'In transit', green: false },
    { id: 'PO-2039', dest: 'New York, NY', status: 'Delivered', green: false },
  ]
  return (
    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
      {orders.map(o => (
        <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 9 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.high, fontFamily: 'var(--font-mono)' }}>{o.id}</div>
            <div style={{ fontSize: 10, color: T.dim, marginTop: 2 }}>{o.dest}</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: o.green ? G : T.low, background: o.green ? 'rgba(57,255,20,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${o.green ? 'rgba(57,255,20,0.2)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 6, padding: '3px 8px' }}>{o.status}</span>
        </div>
      ))}
    </div>
  )
}

const STEPS = [
  { n: '01', title: 'Create an Order', desc: 'Enter freight details or bulk import via CSV. Set pickup windows, commodity info, and service requirements in seconds.' },
  { n: '02', title: 'Get Instant Quotes', desc: 'One click. Warp and 20+ partner carriers respond in real time with live rates and transit times.' },
  { n: '03', title: 'Book in One Click', desc: 'Select your carrier and confirm. Waypoint books through Warp\'s network and returns your tracking number immediately.' },
  { n: '04', title: 'Track & Audit', desc: 'Follow your shipment live. When the invoice arrives, audit it automatically — no spreadsheets, no phone calls.' },
]

const PLANS = [
  {
    name: 'Starter', price: '$0', period: '/month', highlight: false, cta: 'Start for free', href: 'https://warp-tms.vercel.app/signup',
    desc: 'For teams getting started with freight visibility.',
    features: ['50 shipments/mo', 'Multi-carrier quotes', 'Live tracking', 'Basic analytics', '1 seat', 'Email support'],
  },
  {
    name: 'Growth', price: '$299', period: '/month', highlight: true, cta: 'Start free trial', href: 'https://warp-tms.vercel.app/signup',
    desc: 'For growing shippers who need full visibility and automation.',
    features: ['Unlimited shipments', 'Invoice auditing', 'Advanced analytics', 'Lane density maps', '10 seats', 'Priority support', 'CSV bulk import', 'API access'],
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', highlight: false, cta: 'Contact sales', href: 'mailto:hello@wearewarp.com',
    desc: 'For large shippers and 3PLs with complex requirements.',
    features: ['Unlimited everything', 'Dedicated CSM', 'Custom integrations', 'SSO / SAML', 'SLA guarantee', 'Onboarding & training', 'White-labeling', 'Custom reporting'],
  },
]

export default function Home() {
  return (
    <div style={{ background: BG, minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <PageGlow />
      <Nav />

      {/* ═══════ HERO ═══════ */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '130px 64px 80px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div>
            <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: 20, padding: '6px 16px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: G, boxShadow: '0 0 8px rgba(57,255,20,1)', display: 'inline-block', animation: 'dotPulse 2s ease-in-out infinite' }} />
              Waypoint by Warp
            </div>
            <h1 className="fade-up-2" style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.01, letterSpacing: '-0.06em', color: T.high, marginBottom: 28, fontFamily: 'var(--font-wordmark)' }}>
              Every load,<br />
              <span style={{ color: G, textShadow: '0 0 60px rgba(57,255,20,0.4)' }}>quote</span>{' '}
              to<br />delivery.
            </h1>
            <p className="fade-up-3" style={{ fontSize: 18, color: T.mid, lineHeight: 1.78, marginBottom: 48, maxWidth: 440, letterSpacing: '-0.005em' }}>
              The freight operating system for modern shippers. Multi-carrier quoting, order management, live tracking, and invoice auditing — all in one place.
            </p>
            <div className="fade-up-4" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://warp-tms.vercel.app/signup"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.09)', border: '1px solid rgba(57,255,20,0.4)', color: G, fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 13, textDecoration: 'none', letterSpacing: '-0.015em', transition: 'background 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.65)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.09)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.4)'; }}
              >Get started free <span style={{ opacity: 0.65 }}>→</span></a>
              <a href="#features" style={{ fontSize: 14, color: T.mid, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                See all features
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            {/* Stat bar */}
            <div className="fade-in" style={{ marginTop: 60, display: 'flex', gap: 36 }}>
              {[['2,400+', 'Active lanes'], ['< 2s', 'Quote time'], ['$0', 'Platform fees'], ['20+', 'Carriers']].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: T.high, letterSpacing: '-0.045em', fontFamily: 'var(--font-wordmark)' }}>{n}</div>
                  <div style={{ fontSize: 11, color: T.low, marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — floating UI cards */}
          <div style={{ position: 'relative', height: 600 }}>
            {/* Main shipment card */}
            <div className="float" style={{ position: 'absolute', top: 0, right: 0, width: 380 }}>
              <ShipmentCard />
            </div>
            {/* Quote options card */}
            <div className="float-slow" style={{ position: 'absolute', bottom: 20, left: -20, width: 300 }}>
              <QuoteOptions />
            </div>
            {/* Floating invoice badge */}
            <div className="float" style={{ position: 'absolute', top: 200, left: 20, animationDelay: '2s' }}>
              <div style={{ ...CARD, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(57,255,20,0.12)', border: '1px solid rgba(57,255,20,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.high }}>Invoice matched</div>
                  <div style={{ fontSize: 11, color: G }}>$253.24 · $0 variance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CARRIER MARQUEE ═══════ */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 160, background: 'linear-gradient(to right, #050505, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 160, background: 'linear-gradient(to left, #050505, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        {/* Label pinned left */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 160, display: 'flex', alignItems: 'center', paddingLeft: 64, zIndex: 3, pointerEvents: 'none' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: T.dim, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>20+ Carriers</span>
        </div>
        <div style={{ overflow: 'hidden', padding: '20px 0' }}>
          {/* Duplicate the list for seamless loop */}
          <div className="marquee-track" style={{ gap: 10 }}>
            {[...Array(2)].map((_, set) =>
              ['Estes Express', 'Saia LTL', 'XPO Logistics', 'FedEx Freight', 'AAA Cooper', 'Roadrunner', 'Old Dominion', 'R+L Carriers', 'Southeastern Freight', 'Forward Air', 'Dayton Freight', 'Pitt Ohio'].map((c) => (
                <div key={`${set}-${c}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, whiteSpace: 'nowrap', flexShrink: 0, marginRight: 10 }}>
                  {/* Carrier dot */}
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(57,255,20,0.35)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.01em' }}>{c}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" style={{ position: 'relative', zIndex: 1, padding: '130px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22 }}>Features</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', lineHeight: 1.04, fontFamily: 'var(--font-wordmark)', marginBottom: 20 }}>
              Everything your freight<br />team needs
            </h2>
            <p style={{ fontSize: 18, color: T.mid, maxWidth: 520, margin: '0 auto', lineHeight: 1.72 }}>
              From first quote to final invoice — Waypoint handles the full freight lifecycle so you can focus on growth.
            </p>
          </div>

          {/* Bento grid — row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            {/* Large: Multi-Carrier Quoting */}
            <div className="feature-card" style={{ ...CARD, padding: '28px 28px 24px', gridColumn: 'span 1', border: '1px solid rgba(57,255,20,0.12)', background: 'rgba(10,14,10,0.95)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', marginBottom: 8 }}>Multi-Carrier Quoting</h3>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>Live LTL rates from Warp + 20+ carriers in under 2 seconds. Compare and book in one click.</p>
              <QuotingPreview />
            </div>

            {/* Large: Live Tracking */}
            <div className="feature-card" style={{ ...CARD, padding: '28px 28px 24px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M1 3h15v13H1z" stroke={G} strokeWidth="1.8" strokeLinejoin="round"/><path d="M16 8h4l3 4v4h-7V8z" stroke={G} strokeWidth="1.8" strokeLinejoin="round"/><circle cx="5.5" cy="18.5" r="1.5" stroke={G} strokeWidth="1.8"/><circle cx="18.5" cy="18.5" r="1.5" stroke={G} strokeWidth="1.8"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', marginBottom: 8 }}>Live Tracking</h3>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>Full event timeline from tender to POD. Real-time status updates and instant BOL/POD access.</p>
              <TrackingPreview />
            </div>

            {/* Large: Invoice Auditing */}
            <div className="feature-card" style={{ ...CARD, padding: '28px 28px 24px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={G} strokeWidth="1.8"/><path d="M2 10h20" stroke={G} strokeWidth="1.8"/><path d="M7 15h3M14 15h3" stroke={G} strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', marginBottom: 8 }}>Invoice Auditing</h3>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>Auto-match invoices to quoted rates. Flag variances, surface documents, approve or dispute.</p>
              <InvoicePreview />
            </div>
          </div>

          {/* Bento grid — row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
            {/* Wide: Analytics */}
            <div className="feature-card" style={{ ...CARD, padding: '28px 28px 24px' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', marginBottom: 6 }}>Analytics & Lane Maps</h3>
                  <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>Interactive lane density maps, spend trends, carrier performance, and on-time metrics powered by your real freight data.</p>
                </div>
              </div>
              <AnalyticsPreview />
            </div>

            {/* Order Management */}
            <div className="feature-card" style={{ ...CARD, padding: '28px 24px 24px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={G} strokeWidth="1.8" strokeLinecap="round"/><rect x="9" y="3" width="6" height="4" rx="1" stroke={G} strokeWidth="1.8"/><path d="M9 12h6M9 16h4" stroke={G} strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', marginBottom: 8 }}>Order Management</h3>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>Create orders, combine into shipments, and track every unit from PO to delivery.</p>
              <OrderPreview />
            </div>

            {/* Team */}
            <div className="feature-card" style={{ ...CARD, padding: '28px 24px 24px' }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={G} strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={G} strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={G} strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', marginBottom: 8 }}>Team & Permissions</h3>
              <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>Role-based access for admins, operators, and viewers. Everyone sees exactly what they need.</p>
              {/* Avatars */}
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[['JD', 'Admin', G], ['MK', 'Operator', T.mid], ['AR', 'Viewer', T.dim]].map(([initials, role, color]) => (
                  <div key={initials as string} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: G, flexShrink: 0 }}>{initials}</div>
                    <span style={{ flex: 1, fontSize: 12, color: T.mid, fontWeight: 500 }}>Team member</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: color as string }}>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" style={{ position: 'relative', zIndex: 1, padding: '130px 64px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>How It Works</div>
            <h2 style={{ fontSize: 52, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', lineHeight: 1.05, fontFamily: 'var(--font-wordmark)', marginBottom: 20 }}>
              From order to<br />delivery in 4 steps
            </h2>
            <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.78, marginBottom: 56 }}>
              No more juggling carrier portals, spreadsheets, and email chains. Waypoint gives every load a home.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: i === 0 ? 'rgba(57,255,20,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(57,255,20,0.35)' : 'rgba(255,255,255,0.08)'}`, boxShadow: i === 0 ? '0 0 24px rgba(57,255,20,0.15)' : 'none' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: i === 0 ? G : T.dim, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.high, marginBottom: 7, letterSpacing: '-0.015em' }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: T.mid, lineHeight: 1.68 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ShipmentCard />
            {/* Invoice card */}
            <div style={{ ...CARD, padding: '20px 24px', border: '1px solid rgba(57,255,20,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.high, marginBottom: 3 }}>Invoice #INV-2026-0041</div>
                  <div style={{ fontSize: 11, color: T.low }}>Estes Express · Mar 16, 2026</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: G, background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.25)', borderRadius: 7, padding: '4px 10px' }}>Matched ✓</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[['Quoted', '$253.24', T.mid], ['Invoiced', '$253.24', T.high], ['Variance', '$0.00', G]].map(([label, val, color]) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ fontSize: 10, color: T.dim, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 5 }}>{label}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: color as string, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.02em' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ METRICS BAND ═══════ */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[['$2.4B+', 'Freight moved on Warp'], ['20+', 'Carrier partners'], ['< 2s', 'Average quote time'], ['99.9%', 'Platform uptime']].map(([v, l], i) => (
            <div key={v} style={{ textAlign: 'center', padding: '44px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontSize: 46, fontWeight: 800, color: T.high, letterSpacing: '-0.055em', lineHeight: 1, fontFamily: 'var(--font-wordmark)', marginBottom: 10 }}>{v}</div>
              <div style={{ fontSize: 13, color: T.low, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" style={{ position: 'relative', zIndex: 1, padding: '130px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22 }}>Pricing</div>
            <h2 style={{ fontSize: 56, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', lineHeight: 1.04, fontFamily: 'var(--font-wordmark)', marginBottom: 18 }}>
              Simple, honest pricing
            </h2>
            <p style={{ fontSize: 18, color: T.mid, maxWidth: 420, margin: '0 auto', lineHeight: 1.72 }}>
              No per-booking fees. No hidden markups. A flat monthly rate for your whole team.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PLANS.map(p => (
              <div key={p.name} className="plan-card" style={{
                ...CARD, padding: '40px 36px',
                borderColor: p.highlight ? 'rgba(57,255,20,0.35)' : 'rgba(255,255,255,0.08)',
                background: p.highlight ? 'rgba(57,255,20,0.04)' : 'rgba(10,10,10,0.92)',
                position: 'relative', overflow: 'hidden',
                boxShadow: p.highlight ? '0 0 80px rgba(57,255,20,0.12), 0 40px 80px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.4)',
              }}>
                {p.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${G}, rgba(57,255,20,0.3))` }} />}
                {p.highlight && <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 10, fontWeight: 800, color: '#000', background: G, borderRadius: 6, padding: '3px 9px', letterSpacing: '0.05em' }}>MOST POPULAR</div>}
                <div style={{ fontSize: 13, fontWeight: 700, color: p.highlight ? G : T.low, marginBottom: 10, letterSpacing: '0.02em' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 14 }}>
                  <span style={{ fontSize: 52, fontWeight: 800, color: T.high, letterSpacing: '-0.055em', lineHeight: 1, fontFamily: 'var(--font-wordmark)' }}>{p.price}</span>
                  {p.period && <span style={{ fontSize: 14, color: T.low }}>{p.period}</span>}
                </div>
                <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.65, marginBottom: 28, minHeight: 44 }}>{p.desc}</p>
                <a href={p.href} style={{ display: 'block', padding: '14px 0', borderRadius: 12, textAlign: 'center', textDecoration: 'none', marginBottom: 30, fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em', background: p.highlight ? 'rgba(57,255,20,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${p.highlight ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.1)'}`, color: p.highlight ? G : T.mid, transition: 'background 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = p.highlight ? 'rgba(57,255,20,0.18)' : 'rgba(255,255,255,0.08)'; el.style.borderColor = p.highlight ? 'rgba(57,255,20,0.65)' : 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = p.highlight ? 'rgba(57,255,20,0.1)' : 'rgba(255,255,255,0.04)'; el.style.borderColor = p.highlight ? 'rgba(57,255,20,0.4)' : 'rgba(255,255,255,0.1)'; }}
                >{p.cta} <span style={{ opacity: 0.6 }}>→</span></a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 26 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: 13, color: T.mid }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '120px 64px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 72, fontWeight: 800, color: T.high, letterSpacing: '-0.06em', lineHeight: 1.02, fontFamily: 'var(--font-wordmark)', marginBottom: 28 }}>
          Ready to ship<br />
          <span style={{ color: G, textShadow: '0 0 80px rgba(57,255,20,0.5)' }}>smarter?</span>
        </h2>
        <p style={{ fontSize: 18, color: T.mid, lineHeight: 1.75, marginBottom: 52, maxWidth: 440, margin: '0 auto 52px' }}>
          Join modern shippers using Waypoint to save time, cut freight costs, and gain real visibility into their operations.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://warp-tms.vercel.app/signup"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.4)', color: G, fontWeight: 700, fontSize: 16, padding: '16px 38px', borderRadius: 14, textDecoration: 'none', letterSpacing: '-0.015em', transition: 'background 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.65)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(57,255,20,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.4)'; }}
          >Get started free <span style={{ opacity: 0.6 }}>→</span></a>
          <a href="mailto:hello@wearewarp.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: T.mid, fontWeight: 600, fontSize: 16, padding: '16px 38px', borderRadius: 14, textDecoration: 'none', transition: 'background 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
          >Talk to sales</a>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '36px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Image src="/warp-logo.png" alt="Warp" width={60} height={18} style={{ objectFit: 'contain', opacity: 0.45 }} />
            <span style={{ color: T.dim, fontSize: 12 }}>·</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.dim, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.01em' }}>Waypoint</span>
          </div>
          <div style={{ fontSize: 12, color: T.dim }}>© 2026 Warp Technology, Inc.</div>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Privacy', 'Terms', 'Security'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: T.dim, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
