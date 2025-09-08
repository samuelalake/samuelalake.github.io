import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-canvas-default)' }}>
      <Navigation />
      <main className="container-xl mx-auto px-3 py-4">
        {children}
      </main>
    </div>
  )
}
