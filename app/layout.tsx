import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ahmed Mohammed',
  description: '3D Pyramids Portfolio',
  icons: {
    icon: [
      {
        url: '/favicon.jpeg',
        sizes: 'any',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] w-screen overflow-hidden">
        {children}
      </body>
    </html>
  )
}

