import { Link, NavLink, Outlet } from 'react-router-dom'
import { CalendarCheck, Menu, Scissors, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'My Bookings', to: '/bookings' },
  { label: 'Support', to: '/support' },
]

export function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-sand text-ink">

      {/* =========================
          CUSTOMER HEADER
      ========================= */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-sand/95 backdrop-blur">
        <div className="container-page flex h-20 items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white">
              <Scissors size={20} />
            </span>

            <span className="text-lg font-black tracking-tight">
              SALON <span className="text-gold">&</span> CO.
            </span>
          </Link>


          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? 'text-gold'
                      : 'text-ink/65 hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>


          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">

            {/* Admin Login */}
            <Link
              to="/admin/login"
              className="text-sm font-semibold text-ink/65 hover:text-ink"
            >
              Admin
            </Link>

            {/* Book Now */}
            <Link
              to="/services"
              className="btn-primary"
            >
              Book now
              <CalendarCheck size={16} />
            </Link>

          </div>


          {/* Mobile Menu Button */}
          <button
            className="rounded-xl border border-ink/10 bg-white p-2 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>


        {/* =========================
            MOBILE NAVIGATION
        ========================= */}
        {open && (
          <div className="container-page border-t border-ink/10 py-4 md:hidden">

            <nav className="grid gap-3">

              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 font-semibold ${
                      isActive
                        ? 'bg-ink text-white'
                        : 'text-ink hover:bg-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}


              {/* Mobile Admin Login */}
              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 font-semibold text-ink hover:bg-white"
              >
                Admin Login
              </Link>


              {/* Mobile Book Now */}
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="btn-primary"
              >
                Book now
                <CalendarCheck size={16} />
              </Link>

            </nav>

          </div>
        )}

      </header>


      {/* =========================
          CUSTOMER PAGE CONTENT
      ========================= */}
      <main>
        <Outlet />
      </main>


      {/* =========================
          CUSTOMER FOOTER
      ========================= */}
      <footer className="mt-20 border-t border-ink/10 bg-ink py-10 text-white">

        <div className="container-page flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

          <div>
            <p className="text-lg font-black">
              SALON <span className="text-gold">&</span> CO.
            </p>

            <p className="mt-1 text-sm text-white/60">
              Hair. Beauty. Grooming. Personal confidence.
            </p>
          </div>

          <div className="text-sm text-white/60">
            © 2026 SALON & CO. Demo frontend.
          </div>

        </div>

      </footer>

    </div>
  )
}