import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400','500','600','700','800'] })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-wordmark', weight: ['500','600','700'] })
const mono    = DM_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400','500'] })

export const metadata: Metadata = {
  title: 'Waypoint by Warp — Modern Freight TMS',
  description: 'The freight operating system built for modern shippers. Quote, book, track, and audit your freight in one place — powered by Warp.',
  openGraph: {
    title: 'Waypoint by Warp',
    description: 'Modern freight TMS — quote to delivery in one workspace.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${grotesk.variable} ${mono.variable}`}>
      <body className={jakarta.className}>{children}</body>
    </html>
  )
}
