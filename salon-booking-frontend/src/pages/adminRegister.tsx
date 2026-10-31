import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Scissors } from 'lucide-react'
import { adminRegister } from '../adminApi'

export function AdminRegister() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    adminKey: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    // Password validation
    if (form.password.length < 8) {
      setError(
        'Password must be at least 8 characters'
      )
      return
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!form.adminKey) {
      setError('Admin registration key is required')
      return
    }

    try {
      setLoading(true)

      await adminRegister({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        adminKey: form.adminKey,
      })

      setSuccess(
        'Admin account created successfully. Redirecting to login...'
      )

      setTimeout(() => {
        navigate('/admin/login')
      }, 1500)

    } catch (error: any) {
      setError(
        error.message || 'Admin registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand px-4 py-10">
      <div className="mx-auto w-full max-w-lg">

        {/* Back to website */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>


        {/* Registration Card */}
        <div className="surface p-8">

          {/* Logo */}
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-white">
              <Scissors size={20} />
            </div>

            <div>
              <p className="font-black">
                SALON <span className="text-gold">&</span> CO.
              </p>

              <p className="text-xs text-ink/50">
                Admin registration
              </p>
            </div>
          </div>


          <h1 className="text-3xl font-black">
            Create Admin Account
          </h1>

          <p className="mt-2 text-sm text-ink/55">
            Create an authorized account to manage
            the salon.
          </p>


          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}


          {/* Success */}
          {success && (
            <div className="mt-5 rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">
              {success}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4"
          >

            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-bold">
                Full Name
              </label>

              <input
                name="name"
                type="text"
                placeholder="Enter admin name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
                required
              />
            </div>


            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-bold">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="admin@salon.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
                required
              />
            </div>


            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-bold">
                Phone
              </label>

              <input
                name="phone"
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
              />
            </div>


            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-bold">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
                required
              />
            </div>


            {/* Confirm Password */}
            <div>
              <label className="mb-1 block text-sm font-bold">
                Confirm Password
              </label>

              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
                required
              />
            </div>


            {/* Admin Key */}
            <div>
              <label className="mb-1 block text-sm font-bold">
                Admin Registration Key
              </label>

              <input
                name="adminKey"
                type="password"
                placeholder="Enter authorized admin key"
                value={form.adminKey}
                onChange={handleChange}
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-ink"
                required
              />

              <p className="mt-1 text-xs text-ink/45">
                This key is required to create an admin
                account.
              </p>
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-ink px-4 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? 'Creating account...'
                : 'Create Admin Account'}
            </button>

          </form>


          {/* Login */}
          <p className="mt-6 text-center text-sm text-ink/55">
            Already have an admin account?{' '}

            <Link
              to="/admin/login"
              className="font-bold text-gold hover:underline"
            >
              Admin Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}