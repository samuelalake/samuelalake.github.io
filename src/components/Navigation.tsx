import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/activity', label: 'Activity' },
    { href: '/blog', label: 'Blog' }
  ]

  return (
    <nav className="Header" role="banner">
      <div className="Header-item">
        <Link href="/" className="Header-link f4 d-flex flex-items-center">
          <span className="mr-2">🎨</span>
          Samuel Alake
        </Link>
      </div>
      
      <div className="Header-item Header-item--full">
        <div className="UnderlineNav">
          <nav className="UnderlineNav-body" role="tablist">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`UnderlineNav-item ${
                  router.pathname === item.href ? 'selected' : ''
                }`}
                role="tab"
                aria-selected={router.pathname === item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="Header-item">
        <a
          href="https://github.com/samuelalake"
          className="Header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mr-1">🐙</span>
          GitHub
        </a>
      </div>
    </nav>
  )
}
