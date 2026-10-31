import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from './components/Layout'

import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Booking } from './pages/Booking'
import { Payment } from './pages/Payment'
import { Support } from './pages/Support'
import { Bookings } from './pages/Bookings'

import { Admin } from './pages/Admin'
import { AdminLogin } from './pages/adminLogin'
import { AdminRegister } from './pages/adminRegister'

import { ProtectedAdminRoute } from './routs/ProtectedRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            CUSTOMER WEBSITE
        ========================= */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/book/:id"
            element={<Booking />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/support"
            element={<Support />}
          />

          <Route
            path="/bookings"
            element={<Bookings />}
          />
        </Route>


        {/* =========================
            ADMIN AUTH
        ========================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />


        {/* =========================
            PROTECTED ADMIN PANEL
        ========================= */}

        <Route element={<ProtectedAdminRoute />}>
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Route>


        {/* =========================
            404
        ========================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  )
}