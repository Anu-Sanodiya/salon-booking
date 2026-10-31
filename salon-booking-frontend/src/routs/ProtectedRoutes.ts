import { createElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedAdminRoute() {
  const token = localStorage.getItem('adminToken')
  const userString = localStorage.getItem('adminUser')

  if (!token || !userString) {
    return createElement(Navigate, { to: '/admin/login', replace: true })
  }

  try {
    const user = JSON.parse(userString)

    if (user.role !== 'ADMIN') {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')

      return createElement(Navigate, { to: '/admin/login', replace: true })
    }

    return createElement(Outlet)
  } catch {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')

    return createElement(Navigate, { to: '/admin/login', replace: true })
  }
}
