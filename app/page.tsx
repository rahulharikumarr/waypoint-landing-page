'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const G = '#39FF14'
const BG = '#050505'
const CARD = { background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20 } as const
const T = {
  high: '#f0f0f0',
  mid: 'rgba(255,255,255,0.65)',
  low: 'rgba(255,255,255,0.4)',
  dim: 'rgba(255,255,255,0.22)',
}

/* ── Animated green gradient background ── */
function GradientBg({ intensity = 1 }: { intensity?: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <style>{`
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(40px,-30px) scale(1.06)}66%{transform:translate(-25px,20px) scale(0.96)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-50px,35px) scale(1.1)}70%{transform:translate(30px,-20px) scale(0.94)} }
        @keyframes blobFloat3 { 0%,100%{transform:translate(0,0)}50%{transform:translate(20px,40px) scale(1.07)} }
      `}</style>
      {/* Main blob */}
      <div style={{ position: 'absolute', bottom: -200, left: '50%', marginLeft: -500, width: 1000, height: 1000, borderRadius: '50%', background: `radial-gradient(circle at center, rgba(57,255,20,${0.18*intensity}) 0%, rgba(57,255,20,${0.06*intensity}) 40%, transparent 70%)`, filter: 'blur(80px)', animation: 'blobFloat1 14s ease-in-out infinite', willChange: 'transform' }} />
      {/* Top right */}
      <div style={{ position: 'absolute', top: -150, right: -150, width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle at center, rgba(57,255,20,${0.12*intensity}) 0%, rgba(57,255,20,${0.04*intensity}) 45%, transparent 70%)`, filter: 'blur(90px)', animation: 'blobFloat2 18s ease-in-out infinite', willChange: 'transform' }} />
      {/* Mid left */}
      <div style={{ position: 'absolute', top: '40%', left: -100, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle at center, rgba(57,255,20,${0.1*intensity}) 0%, transparent 65%)`, filter: 'blur(60px)', animation: 'blobFloat3 10s ease-in-out infinite', willChange: 'transform' }} />
    </div>
  )
}

/* ── Navbar ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Image src="/warp-logo.png" alt="Warp" width={72} height={21} style={{ objectFit: 'contain' }} />
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: T.high, letterSpacing: '-0.02em', fontFamily: 'var(--font-wordmark)' }}>Waypoint</span>
      </div>
      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'How It Works', 'Pricing'].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} style={{ fontSize: 14, color: T.mid, textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = T.high)}
            onMouseLeave={e => (e.currentTarget.style.color = T.mid)}
          >{l}</a>
        ))}
      </div>
      {/* CTA */}
      <a href="https://warp-tms.vercel.app/signup" style={{ display: 'flex', alignItems: 'center', gap: 6, background: G, color: '#000', fontWeight: 700, fontSize: 13, padding: '9px 20px', borderRadius: 10, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'opacity 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Get started free →
      </a>
    </nav>
  )
}

/* ── Shipment preview card ── */
function ShipmentCard({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      ...CARD,
      padding: '22px 24px',
      boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(57,255,20,0.08)',
      ...style,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: G, fontWeight: 600, letterSpacing: '0.04em' }}>WT-39241</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(57,255,20,0.09)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: 20, padding: '4px 10px', fontSize: 11, fontWeight: 600, color: G }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, boxShadow: '0 0 6px rgba(57,255,20,0.9)', display: 'inline-block' }} />
          In Transit
        </span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: T.high }}>Los Angeles, CA</span>
        </div>
        <div style={{ width: 1.5, height: 16, background: 'rgba(255,255,255,0.12)', marginLeft: 3, marginBottom: 8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: G, flexShrink: 0, boxShadow: `0 0 8px rgba(57,255,20,0.7)` }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: T.high }}>Chicago, IL</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: T.mid, marginBottom: 14 }}>4 Pallets · Consumer Electronics · LTL</div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '62%', background: `linear-gradient(90deg, rgba(57,255,20,0.6), ${G})`, borderRadius: 2, boxShadow: '0 0 10px rgba(57,255,20,0.5)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
          {['Pickup', 'In Transit', 'Out for Del.', 'Delivered'].map((s, i) => (
            <span key={s} style={{ fontSize: 10, fontWeight: i <= 1 ? 600 : 400, color: i <= 1 ? G : T.dim }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {[['QUOTED', '$253.24'], ['EST. DELIVERY', 'Mar 18'], ['CARRIER', 'Warp LTL']].map(([k, v], i) => (
          <div key={k} style={{ flex: 1, paddingLeft: i > 0 ? 16 : 0, paddingRight: i < 2 ? 16 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <div style={{ fontSize: 9, color: T.dim, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 5 }}>{k}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.high, fontFamily: 'var(--font-wordmark)', letterSpacing: '-0.02em' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Quote card ── */
function QuoteCard({ carrier, price, transit, tag }: { carrier: string; price: string; transit: string; tag?: string }) {
  return (
    <div style={{ ...CARD, padding: '18px 20px', borderColor: tag ? 'rgba(57,255,20,0.25)' : 'rgba(255,255,255,0.07)' }}>
      {tag && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G}, rgba(57,255,20,0.3))`, borderRadius: '20px 20px 0 0' }} />}
      <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: tag ? G : T.mid, background: tag ? 'rgba(57,255,20,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${tag ? 'rgba(57,255,20,0.2)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 6, padding: '3px 9px', marginBottom: 10 }}>
        {carrier}
      </div>
      <div style={{ fontSize: 36, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 12, fontFamily: 'var(--font-wordmark)' }}>{price}</div>
      <div style={{ fontSize: 11, color: T.low, marginBottom: 14 }}>
        <span>📅 Pickup tomorrow</span>&nbsp;&nbsp;·&nbsp;&nbsp;<span>🕐 {transit}</span>
      </div>
      <button style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: 'none', background: tag ? G : 'rgba(255,255,255,0.07)', color: tag ? '#000' : T.high, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
        Book This Rate →
      </button>
    </div>
  )
}

/* ── Features data ── */
const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="9" y="3" width="6" height="4" rx="1" stroke={G} strokeWidth="1.8"/>
        <path d="M9 12h6M9 16h4" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Order Management',
    desc: 'Create and track freight orders from PO to delivery. Combine multiple orders into a single shipment with one click.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke={G} strokeWidth="1.8"/>
        <path d="M21 21l-4.35-4.35" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 11h6M11 8v6" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Instant Multi-Carrier Quotes',
    desc: 'Get real-time LTL rates from Warp and 20+ partner carriers in seconds. Compare price, transit time, and service level side by side.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M1 3h15v13H1z" stroke={G} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M16 8h4l3 4v4h-7V8z" stroke={G} strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="5.5" cy="18.5" r="1.5" stroke={G} strokeWidth="1.8"/>
        <circle cx="18.5" cy="18.5" r="1.5" stroke={G} strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Live Shipment Tracking',
    desc: 'Full event timeline from pickup to delivery. Real-time status updates, appointment info, and POD/BOL documents on demand.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke={G} strokeWidth="1.8"/>
        <path d="M2 10h20" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 15h3M14 15h3" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Freight Invoice Auditing',
    desc: 'Automatically reconcile carrier invoices against quoted rates. Flag variances, view supporting documents, and approve or dispute with one click.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Analytics & Insights',
    desc: 'Lane density maps, carrier performance, spend trends, and on-time delivery metrics — all powered by your actual freight data.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke={G} strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={G} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Team Collaboration',
    desc: 'Invite your whole team with role-based access. Admins, operators, and viewers — everyone sees what they need.',
  },
]

/* ── Steps ── */
const STEPS = [
  { n: '01', title: 'Create an Order', desc: 'Enter your freight details — origin, destination, commodity, dimensions, and pickup window. Import via CSV for bulk loads.' },
  { n: '02', title: 'Get Instant Quotes', desc: 'One click fetches live rates from Warp and 20+ carriers. See price, transit days, and service level for every option.' },
  { n: '03', title: 'Book in Seconds', desc: 'Select your carrier and confirm. Waypoint books through Warp\'s network and returns your tracking number instantly.' },
  { n: '04', title: 'Track & Audit', desc: 'Follow your shipment in real time. When the invoice arrives, audit it automatically and pay with one click.' },
]

/* ── Pricing ── */
const PLANS = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    desc: 'Perfect for teams getting started with freight visibility.',
    cta: 'Start for free',
    ctaLink: 'https://warp-tms.vercel.app/signup',
    highlight: false,
    features: ['Up to 50 shipments/mo', 'Multi-carrier quoting', 'Live tracking', 'Basic analytics', '1 user seat', 'Email support'],
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/month',
    desc: 'For growing shippers who need full visibility and automation.',
    cta: 'Start free trial',
    ctaLink: 'https://warp-tms.vercel.app/signup',
    highlight: true,
    features: ['Unlimited shipments', 'Invoice auditing', 'Advanced analytics', 'Lane density maps', 'Up to 10 seats', 'Priority support', 'CSV bulk import', 'API access'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large shippers and 3PLs with complex requirements.',
    cta: 'Contact sales',
    ctaLink: 'mailto:hello@wearewarp.com',
    highlight: false,
    features: ['Unlimited everything', 'Dedicated CSM', 'Custom integrations', 'SSO / SAML', 'SLA guarantee', 'Onboarding & training', 'White-labeling', 'Custom reporting'],
  },
]

/* ── Metric card ── */
function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '24px 32px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: 44, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', lineHeight: 1, fontFamily: 'var(--font-wordmark)', marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 13, color: T.low, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

/* ── Main page ── */
export default function Home() {
  return (
    <div style={{ background: BG, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />

      {/* ═══ HERO ═══ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 48px 80px', overflow: 'hidden' }}>
        <GradientBg intensity={1.2} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left — text */}
          <div>
            {/* Eyebrow */}
            <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: 20, padding: '6px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: G, boxShadow: '0 0 8px rgba(57,255,20,0.9)', display: 'inline-block' }} />
              Waypoint by Warp
            </div>
            <h1 className="animate-fade-up-2" style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.055em', color: T.high, marginBottom: 28, fontFamily: 'var(--font-wordmark)' }}>
              Every load,<br />
              <span style={{ color: G }}>quote</span> to delivery.
            </h1>
            <p className="animate-fade-up-3" style={{ fontSize: 18, color: T.mid, lineHeight: 1.75, marginBottom: 44, maxWidth: 460, letterSpacing: '-0.005em' }}>
              A single workspace for your freight operations — multi-carrier quoting, order management, live tracking, and invoice reconciliation. All powered by Warp.
            </p>
            <div className="animate-fade-up-3" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <a href="https://warp-tms.vercel.app/signup" className="glow-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: G, color: '#000', fontWeight: 800, fontSize: 15, padding: '15px 30px', borderRadius: 13, textDecoration: 'none', letterSpacing: '-0.02em' }}>
                Get started free →
              </a>
              <a href="#features" style={{ fontSize: 14, color: T.mid, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                See features
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            {/* Social proof */}
            <div className="animate-fade-in" style={{ marginTop: 52, display: 'flex', gap: 32, alignItems: 'center' }}>
              {[['2,400+', 'Active lanes'], ['98.4%', 'On-time pickup'], ['$0', 'Platform fees']].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.high, letterSpacing: '-0.04em', fontFamily: 'var(--font-wordmark)' }}>{n}</div>
                  <div style={{ fontSize: 11, color: T.low, marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div style={{ position: 'relative', height: 520 }}>
            <div className="float-card" style={{ position: 'absolute', top: 0, right: 0, width: 360 }}>
              <ShipmentCard />
            </div>
            {/* Quote cards */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 260, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ ...CARD, padding: '14px 16px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G}, rgba(57,255,20,0.3))`, borderRadius: '20px 20px 0 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: G, background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: 5, padding: '2px 8px', letterSpacing: '0.06em' }}>WARP LTL</span>
                  <span style={{ fontSize: 10, color: T.low }}>3 days transit</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.high, letterSpacing: '-0.04em', fontFamily: 'var(--font-wordmark)' }}>$253.24</div>
                <button style={{ width: '100%', marginTop: 10, padding: '8px 0', borderRadius: 8, border: 'none', background: G, color: '#000', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Book This Rate →</button>
              </div>
              <div style={{ ...CARD, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.mid, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 5, padding: '2px 8px', letterSpacing: '0.06em' }}>ESTES EXPRESS</span>
                  <span style={{ fontSize: 10, color: T.low }}>4 days transit</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.high, letterSpacing: '-0.04em', fontFamily: 'var(--font-wordmark)' }}>$312.50</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOGO BAR ═══ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '28px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.dim, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginRight: 16 }}>Powered by</span>
          <Image src="/warp-logo.png" alt="Warp" width={72} height={21} style={{ objectFit: 'contain', opacity: 0.6 }} />
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />
          {['Estes Express', 'Saia LTL', 'XPO Logistics', 'FedEx Freight', 'AAA Cooper', 'Roadrunner'].map(c => (
            <span key={c} style={{ fontSize: 12, fontWeight: 600, color: T.dim, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ═══ METRICS ═══ */}
      <section style={{ padding: '0 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ ...CARD, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', overflow: 'hidden' }}>
            {[['$2.4B+', 'Freight moved on Warp'], ['20+', 'Carrier partners'], ['<2s', 'Average quote time'], ['99.9%', 'Platform uptime']].map(([v, l], i) => (
              <div key={v} style={{ textAlign: 'center', padding: '36px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', lineHeight: 1, fontFamily: 'var(--font-wordmark)', marginBottom: 10 }}>{v}</div>
                <div style={{ fontSize: 13, color: T.low, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ position: 'relative', padding: '120px 48px', overflow: 'hidden' }}>
        <GradientBg intensity={0.7} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Features</div>
            <h2 style={{ fontSize: 52, fontWeight: 800, color: T.high, letterSpacing: '-0.045em', lineHeight: 1.05, fontFamily: 'var(--font-wordmark)', marginBottom: 18 }}>
              Everything your freight<br />team needs
            </h2>
            <p style={{ fontSize: 17, color: T.mid, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              From first quote to final invoice — Waypoint handles the entire freight lifecycle so your team can focus on the business.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ ...CARD, padding: '28px 28px 32px', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(57,255,20,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: T.high, marginBottom: 10, letterSpacing: '-0.02em' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: T.mid, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" style={{ padding: '120px 48px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>How It Works</div>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: T.high, letterSpacing: '-0.045em', lineHeight: 1.06, fontFamily: 'var(--font-wordmark)', marginBottom: 16 }}>
              From order to delivery<br />in four steps
            </h2>
            <p style={{ fontSize: 16, color: T.mid, lineHeight: 1.75, marginBottom: 52 }}>
              Waypoint streamlines every step of the freight process — no more juggling carrier portals, spreadsheets, and email chains.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: i === 0 ? 'rgba(57,255,20,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(57,255,20,0.3)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: i === 0 ? G : T.dim, letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>{s.n}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.high, marginBottom: 6, letterSpacing: '-0.01em' }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: T.mid, lineHeight: 1.65 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Shipment card showcase */}
          <div style={{ position: 'relative' }}>
            <ShipmentCard />
            {/* Invoice reconciliation mini card */}
            <div style={{ ...CARD, padding: '16px 20px', marginTop: 16, borderColor: 'rgba(57,255,20,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.high }}>Invoice #INV-2026-0041</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: G, background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.2)', borderRadius: 5, padding: '2px 8px' }}>Matched ✓</span>
              </div>
              <div style={{ display: 'flex', gap: 24, fontSize: 12 }}>
                <div><span style={{ color: T.dim }}>Quoted</span> <span style={{ color: T.high, fontWeight: 600, marginLeft: 6 }}>$253.24</span></div>
                <div><span style={{ color: T.dim }}>Invoiced</span> <span style={{ color: T.high, fontWeight: 600, marginLeft: 6 }}>$253.24</span></div>
                <div><span style={{ color: T.dim }}>Variance</span> <span style={{ color: G, fontWeight: 700, marginLeft: 6 }}>$0.00</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ position: 'relative', padding: '120px 48px', borderTop: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <GradientBg intensity={0.8} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.15)', borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Pricing</div>
            <h2 style={{ fontSize: 52, fontWeight: 800, color: T.high, letterSpacing: '-0.045em', lineHeight: 1.05, fontFamily: 'var(--font-wordmark)', marginBottom: 16 }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontSize: 17, color: T.mid, maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
              No per-booking fees. No hidden markups. Just a flat monthly price for your whole team.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PLANS.map(p => (
              <div key={p.name} style={{
                ...CARD,
                padding: '36px 32px',
                borderColor: p.highlight ? 'rgba(57,255,20,0.35)' : 'rgba(255,255,255,0.07)',
                background: p.highlight ? 'rgba(57,255,20,0.04)' : 'rgba(10,10,10,0.9)',
                position: 'relative', overflow: 'hidden',
                boxShadow: p.highlight ? '0 0 60px rgba(57,255,20,0.1), 0 32px 64px rgba(0,0,0,0.5)' : '0 16px 32px rgba(0,0,0,0.4)',
              }}>
                {p.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G}, rgba(57,255,20,0.4))` }} />}
                {p.highlight && <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 10, fontWeight: 700, color: '#000', background: G, borderRadius: 5, padding: '2px 8px', letterSpacing: '0.04em' }}>POPULAR</div>}
                <div style={{ fontSize: 14, fontWeight: 700, color: p.highlight ? G : T.mid, marginBottom: 8, letterSpacing: '0.02em' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, color: T.high, letterSpacing: '-0.05em', fontFamily: 'var(--font-wordmark)' }}>{p.price}</span>
                  {p.period && <span style={{ fontSize: 14, color: T.low }}>{p.period}</span>}
                </div>
                <p style={{ fontSize: 13, color: T.mid, lineHeight: 1.6, marginBottom: 28, minHeight: 40 }}>{p.desc}</p>
                <a href={p.ctaLink} style={{ display: 'block', width: '100%', padding: '13px 0', borderRadius: 11, border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.12)', background: p.highlight ? G : 'transparent', color: p.highlight ? '#000' : T.high, fontWeight: 700, fontSize: 14, textAlign: 'center', textDecoration: 'none', letterSpacing: '-0.01em', marginBottom: 28, transition: 'opacity 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >{p.cta}</a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={G} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontSize: 13, color: T.mid }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section style={{ position: 'relative', padding: '100px 48px', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <GradientBg intensity={1.4} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 64, fontWeight: 800, color: T.high, letterSpacing: '-0.055em', lineHeight: 1.02, fontFamily: 'var(--font-wordmark)', marginBottom: 24 }}>
            Ready to ship<br />smarter?
          </h2>
          <p style={{ fontSize: 18, color: T.mid, lineHeight: 1.7, marginBottom: 44, maxWidth: 480, margin: '0 auto 44px' }}>
            Join shippers using Waypoint to save time, reduce freight costs, and gain full visibility into their supply chain.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <a href="https://warp-tms.vercel.app/signup" className="glow-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: G, color: '#000', fontWeight: 800, fontSize: 16, padding: '16px 36px', borderRadius: 14, textDecoration: 'none', letterSpacing: '-0.02em' }}>
              Start for free →
            </a>
            <a href="mailto:hello@wearewarp.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: T.high, fontWeight: 700, fontSize: 16, padding: '16px 36px', borderRadius: 14, textDecoration: 'none' }}>
              Talk to sales
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Image src="/warp-logo.png" alt="Warp" width={60} height={18} style={{ objectFit: 'contain', opacity: 0.5 }} />
            <span style={{ color: T.dim, fontSize: 12 }}>·</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.dim, fontFamily: 'var(--font-wordmark)' }}>Waypoint</span>
          </div>
          <div style={{ fontSize: 12, color: T.dim }}>© 2026 Warp Technology, Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Security'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: T.dim, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
