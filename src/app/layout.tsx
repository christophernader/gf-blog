import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
