import type { Metadata } from 'next'
import './globals.css'
import CatCompanion from '@/components/CatCompanion'

export const metadata: Metadata = {
  title: 'my little blog ✿',
  description: 'A cozy corner of the internet for thoughts and stories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* SVG Filter for boiling line / jitter effect */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="jitter-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
                seed="1"
              >
                <animate
                  attributeName="seed"
                  values="1;2;3;4;5;4;3;2;1"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        {children}
        <CatCompanion />
      </body>
    </html>
  )
}
