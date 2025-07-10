import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Baby Shower Registry',
  description: 'A beautiful baby shower gift registry where friends and family can view and purchase items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-baby-blue via-baby-pink to-baby-yellow">
          {children}
        </div>
      </body>
    </html>
  )
}