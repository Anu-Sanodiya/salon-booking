
import {
  CalendarCheck,
  CalendarDays,
  CircleDollarSign,
  Home,
  LayoutDashboard,
  MessageSquare,
  Scissors,
  Settings,
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
} from 'lucide-react'

import { useEffect, useState } from 'react'

import { mockBookings } from '../data/mockData'
import { AdminServices } from './AdminServices'

import {
  getStaff,
  createStaff,
  updateStaff,
  updateStaffAvailability,
  deleteStaff,
  type Staff,
  type StaffAvailability,
} from '../staffApi'


const tabs = [
  'Overview',
  'Appointments',
  'Services',
  'Staff',
  'Messages',
]


// =====================================================
// TAB ICON
// =====================================================

const renderTabIcon = (tab: string) => {
  switch (tab) {
    case 'Overview':
      return <LayoutDashboard size={18} />

    case 'Appointments':
      return <CalendarDays size={18} />

    case 'Services':
      return <Scissors size={18} />

    case 'Staff':
      return <Users size={18} />

    case 'Messages':
      return <MessageSquare size={18} />

    default:
      return null
  }
}


// =====================================================
// ADMIN COMPONENT
// =====================================================

export function Admin() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="min-h-screen bg-[#f7f3ed] px-6 py-8">

      <div className="mx-auto flex max-w-7xl gap-6">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="w-60 shrink-0">

          <div className="surface sticky top-6 rounded-3xl p-4">

            {/* BRAND */}

            <div className="mb-6 flex items-center gap-3 px-3 py-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
                <Scissors size={22} />
              </div>

              <div>
                <h2 className="font-black">
                  CUTS & CO.
                </h2>

                <p className="text-xs text-ink/50">
                  Admin workspace
                </p>
              </div>

            </div>


            {/* TABS */}

            <nav className="space-y-2">

              {tabs.map((tab) => (

                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    activeTab === tab
                      ? 'bg-black text-white'
                      : 'text-ink/65 hover:bg-black/5 hover:text-ink'
                  }`}
                >

                  {renderTabIcon(tab)}

                  <span>
                    {tab}
                  </span>

                </button>

              ))}

            </nav>


            {/* SETTINGS */}

            <div className="mt-6 border-t border-black/10 pt-5">

              <button
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink/50 hover:bg-black/5"
              >
                <Settings size={18} />

                Settings
              </button>

            </div>

          </div>

        </aside>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="min-w-0 flex-1">

          {/* HEADER */}

          <div className="mb-6 flex items-center justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#c8902f]">
                Management Console
              </p>

              <h1 className="mt-1 text-4xl font-black">
                {activeTab}
              </h1>

            </div>


            <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700">
              Live data
            </div>

          </div>


          {/* =================================================
              TAB CONTENT
          ================================================= */}

          {activeTab === 'Overview' && (
            <Overview />
          )}

          {activeTab === 'Appointments' && (
            <AppointmentTable />
          )}

          {activeTab === 'Services' && (
            <AdminServices />
          )}

          {activeTab === 'Staff' && (
            <StaffTable />
          )}

          {activeTab === 'Messages' && (
            <Messages />
          )}

        </main>

      </div>

    </div>
  )
}


// =====================================================
// OVERVIEW
// =====================================================

function Overview() {
  const totalBookings = mockBookings.length

  const totalCustomers = new Set(
    mockBookings.map((booking: any) => booking.customer)
  ).size

  const homeServices = mockBookings.filter(
    (booking: any) =>
      String(booking.location || '')
        .toLowerCase()
        .includes('home')
  ).length

  return (
    <div className="space-y-6">

      {/* METRICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Total Bookings"
          value={totalBookings}
          icon={<CalendarCheck size={20} />}
        />

        <MetricCard
          title="Revenue"
          value="₹24,850"
          icon={<CircleDollarSign size={20} />}
        />

        <MetricCard
          title="Customers"
          value={totalCustomers}
          icon={<Users size={20} />}
        />

        <MetricCard
          title="Home Services"
          value={homeServices}
          icon={<Home size={20} />}
        />

      </div>


      {/* TODAY'S APPOINTMENTS */}

      <div className="surface rounded-3xl p-6">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-black">
              Today's Appointments
            </h2>

            <p className="mt-1 text-sm text-ink/50">
              Upcoming appointments for today
            </p>

          </div>

          <button
            onClick={() => {}}
            className="text-sm font-bold text-[#a66d16]"
          >
            View all
          </button>

        </div>


        <AppointmentTable compact />

      </div>

    </div>
  )
}


// =====================================================
// METRIC CARD
// =====================================================

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
}) {
  return (
    <div className="surface rounded-3xl p-5">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
          {icon}
        </div>

      </div>

      <p className="text-sm text-ink/50">
        {title}
      </p>

      <p className="mt-1 text-3xl font-black">
        {value}
      </p>

    </div>
  )
}


// =====================================================
// APPOINTMENTS TABLE
// =====================================================

function AppointmentTable({
  compact = false,
}: {
  compact?: boolean
}) {
  const bookings = compact
    ? mockBookings.slice(0, 5)
    : mockBookings

  return (
    <div className="surface overflow-hidden rounded-3xl">

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="border-b border-black/5 bg-black/[0.02]">

            <tr>

              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-ink/40">
                Customer
              </th>

              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-ink/40">
                Service
              </th>

              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-ink/40">
                Time
              </th>

              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-ink/40">
                Location
              </th>

              <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-ink/40">
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            {bookings.map((booking: any) => (

              <tr
                key={booking.id}
                className="border-b border-black/5 last:border-0"
              >

                <td className="px-6 py-4">

                  <p className="font-bold">
                    {booking.customer}
                  </p>

                </td>


                <td className="px-6 py-4 text-sm">
                  {booking.service}
                </td>


                <td className="px-6 py-4 text-sm">
                  {booking.time}
                </td>


                <td className="px-6 py-4 text-sm">
                  {booking.location}
                </td>


                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      String(booking.status)
                        .toLowerCase() === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : String(booking.status)
                            .toLowerCase() === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-black/5 text-ink/60'
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}


// =====================================================
// STAFF TABLE
// =====================================================

function StaffTable() {

  const [staffList, setStaffList] = useState<Staff[]>([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [showAddModal, setShowAddModal] = useState(false)

  const [editingStaff, setEditingStaff] =
    useState<Staff | null>(null)


  // ---------------------------------------------------
  // FORM STATE
  // ---------------------------------------------------

  const [form, setForm] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    image: '',
    rating: 0,
    availability: 'AVAILABLE' as StaffAvailability,
    services: '',
  })


  // ---------------------------------------------------
  // LOAD STAFF
  // ---------------------------------------------------

  useEffect(() => {
    loadStaff()
  }, [])


  async function loadStaff() {
    try {
      setLoading(true)
      setError('')

      const data = await getStaff()

      setStaffList(data)

    } catch (err: any) {

      console.error(err)

      setError(
        err?.message || 'Failed to load staff'
      )

    } finally {

      setLoading(false)

    }
  }


  // ---------------------------------------------------
  // RESET FORM
  // ---------------------------------------------------

  function resetForm() {
    setForm({
      name: '',
      role: '',
      phone: '',
      email: '',
      image: '',
      rating: 0,
      availability: 'AVAILABLE',
      services: '',
    })
  }


  // ---------------------------------------------------
  // OPEN ADD MODAL
  // ---------------------------------------------------

  function openAddModal() {

    resetForm()

    setEditingStaff(null)

    setShowAddModal(true)

  }


  // ---------------------------------------------------
  // OPEN EDIT MODAL
  // ---------------------------------------------------

  function openEditModal(person: Staff) {

    setEditingStaff(person)

    setForm({
      name: person.name || '',
      role: person.role || '',
      phone: person.phone || '',
      email: person.email || '',
      image: person.image || '',
      rating: person.rating || 0,
      availability:
        person.availability || 'AVAILABLE',
      services:
        person.services?.join(', ') || '',
    })

    setShowAddModal(true)

  }


  // ---------------------------------------------------
  // FORM INPUT
  // ---------------------------------------------------

  function updateForm(
    field: string,
    value: string | number
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  // ---------------------------------------------------
  // CREATE / UPDATE STAFF
  // ---------------------------------------------------

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setError('')

      const services = form.services
        .split(',')
        .map((service) => service.trim())
        .filter(Boolean)


      if (!form.name.trim()) {
        setError('Staff name is required')
        return
      }


      if (!form.role.trim()) {
        setError('Staff role is required')
        return
      }


      if (editingStaff) {

        const updated = await updateStaff(
          editingStaff._id,
          {
            name: form.name.trim(),
            role: form.role.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            image: form.image.trim(),
            rating: Number(form.rating),
            availability:
              form.availability,
            services,
          }
        )


        setStaffList((prev) =>
          prev.map((person) =>
            person._id === updated._id
              ? updated
              : person
          )
        )

      } else {

        const created = await createStaff({
          name: form.name.trim(),
          role: form.role.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          image: form.image.trim(),
          rating: Number(form.rating),
          availability:
            form.availability,
          services,
        })


        setStaffList((prev) => [
          ...prev,
          created,
        ])

      }


      setShowAddModal(false)

      setEditingStaff(null)

      resetForm()

    } catch (err: any) {

      console.error(err)

      setError(
        err?.message ||
          'Failed to save staff'
      )

    }

  }


  // ---------------------------------------------------
  // CHANGE AVAILABILITY
  // ---------------------------------------------------

  async function handleAvailabilityChange(
    id: string,
    availability: StaffAvailability
  ) {

    try {

      const updated =
        await updateStaffAvailability(
          id,
          availability
        )


      setStaffList((prev) =>
        prev.map((person) =>
          person._id === updated._id
            ? updated
            : person
        )
      )

    } catch (err: any) {

      console.error(err)

      setError(
        err?.message ||
          'Failed to update availability'
      )

    }

  }


  // ---------------------------------------------------
  // DELETE STAFF
  // ---------------------------------------------------

  async function handleDelete(
    person: Staff
  ) {

    const confirmed =
      window.confirm(
        `Are you sure you want to remove ${person.name}?`
      )

    if (!confirmed) {
      return
    }


    try {

      setError('')

      await deleteStaff(person._id)


      setStaffList((prev) =>
        prev.filter(
          (item) =>
            item._id !== person._id
        )
      )

    } catch (err: any) {

      console.error(err)

      setError(
        err?.message ||
          'Failed to remove staff'
      )

    }

  }


  // ---------------------------------------------------
  // LOADING
  // ---------------------------------------------------

  if (loading) {

    return (
      <div className="surface flex min-h-[300px] items-center justify-center rounded-3xl">

        <div className="flex items-center gap-3 text-ink/60">

          <Loader2
            size={20}
            className="animate-spin"
          />

          Loading staff...

        </div>

      </div>
    )

  }


  // ---------------------------------------------------
  // STAFF UI
  // ---------------------------------------------------

  return (
    <div className="space-y-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-black">
            Staff Members
          </h2>

          <p className="mt-1 text-sm text-ink/50">
            Manage your salon staff and their availability.
          </p>

        </div>


        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-bold text-white transition hover:bg-black/80"
        >

          <Plus size={17} />

          Add Staff

        </button>

      </div>


      {/* ERROR */}

      {error && (

        <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">

          <span>
            {error}
          </span>

          <button
            onClick={() => setError('')}
          >
            <X size={18} />
          </button>

        </div>

      )}


      {/* EMPTY */}

      {staffList.length === 0 ? (

        <div className="surface rounded-3xl p-10 text-center">

          <Users
            size={40}
            className="mx-auto text-ink/30"
          />

          <h3 className="mt-4 font-black">
            No staff members
          </h3>

          <p className="mt-1 text-sm text-ink/50">
            Add your first staff member.
          </p>

          <button
            onClick={openAddModal}
            className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
          >
            + Add Staff
          </button>

        </div>

      ) : (

        <div className="grid gap-4 sm:grid-cols-2">

          {staffList.map((person) => (

            <div
              key={person._id}
              className="surface rounded-3xl p-5"
            >

              <div className="flex items-start gap-4">

                {/* STAFF IMAGE */}

                {person.image ? (

                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                ) : (

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-lg font-black text-white">
                    {person.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                )}


                {/* DETAILS */}

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h2 className="font-black">
                        {person.name}
                      </h2>

                      <p className="text-sm text-ink/55">
                        {person.role}
                      </p>

                    </div>

                  </div>


                  {/* RATING */}

                  <p className="mt-2 text-sm">
                    ★ {person.rating}
                  </p>


                  {/* PHONE */}

                  {person.phone && (

                    <p className="mt-1 text-xs text-ink/45">
                      {person.phone}
                    </p>

                  )}

                </div>

              </div>


              {/* BOTTOM CONTROLS */}

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/5 pt-4">

                {/* AVAILABILITY */}

                <select
                  value={
                    person.availability
                  }
                  onChange={(e) =>
                    handleAvailabilityChange(
                      person._id,
                      e.target
                        .value as StaffAvailability
                    )
                  }
                  className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold outline-none ${
                    person.availability ===
                    'AVAILABLE'
                      ? 'bg-emerald-100 text-emerald-700'
                      : person.availability ===
                          'BUSY'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >

                  <option value="AVAILABLE">
                    Available
                  </option>

                  <option value="BUSY">
                    Busy
                  </option>

                  <option value="OFF">
                    Off
                  </option>

                </select>


                {/* ACTIONS */}

                <div className="flex items-center gap-2">

                  <button
                    onClick={() =>
                      openEditModal(person)
                    }
                    className="flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-2 text-xs font-bold hover:bg-black/5"
                  >

                    <Pencil size={14} />

                    Edit

                  </button>


                  <button
                    onClick={() =>
                      handleDelete(person)
                    }
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                  >

                    <Trash2 size={14} />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =================================================
          ADD / EDIT STAFF MODAL
      ================================================= */}

      {showAddModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-black">
                  {editingStaff
                    ? 'Edit Staff'
                    : 'Add Staff'}
                </h2>

                <p className="mt-1 text-sm text-ink/50">
                  {editingStaff
                    ? 'Update staff member details.'
                    : 'Add a new member to your salon team.'}
                </p>

              </div>


              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingStaff(null)
                  resetForm()
                }}
                className="rounded-xl p-2 hover:bg-black/5"
              >

                <X size={20} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME + ROLE */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateForm(
                        'name',
                        e.target.value
                      )
                    }
                    placeholder="Alex"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Role
                  </label>

                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) =>
                      updateForm(
                        'role',
                        e.target.value
                      )
                    }
                    placeholder="Senior Stylist"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                  />

                </div>

              </div>


              {/* PHONE + EMAIL */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Phone
                  </label>

                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                      updateForm(
                        'phone',
                        e.target.value
                      )
                    }
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateForm(
                        'email',
                        e.target.value
                      )
                    }
                    placeholder="alex@example.com"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                  />

                </div>

              </div>


              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-bold">
                  Image URL
                </label>

                <input
                  type="text"
                  value={form.image}
                  onChange={(e) =>
                    updateForm(
                      'image',
                      e.target.value
                    )
                  }
                  placeholder="https://example.com/staff.jpg"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                />

                <p className="mt-1 text-xs text-ink/40">
                  Add an image URL for the staff profile.
                </p>

              </div>


              {/* RATING + AVAILABILITY */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Rating
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) =>
                      updateForm(
                        'rating',
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-bold">
                    Availability
                  </label>

                  <select
                    value={
                      form.availability
                    }
                    onChange={(e) =>
                      updateForm(
                        'availability',
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                  >

                    <option value="AVAILABLE">
                      Available
                    </option>

                    <option value="BUSY">
                      Busy
                    </option>

                    <option value="OFF">
                      Off
                    </option>

                  </select>

                </div>

              </div>


              {/* SERVICES */}

              <div>

                <label className="mb-2 block text-sm font-bold">
                  Services
                </label>

                <input
                  type="text"
                  value={form.services}
                  onChange={(e) =>
                    updateForm(
                      'services',
                      e.target.value
                    )
                  }
                  placeholder="Hair Cut, Hair Styling, Hair Color"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-black"
                />

                <p className="mt-1 text-xs text-ink/40">
                  Enter services separated by commas.
                </p>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-black/5 pt-5">

                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingStaff(null)
                    resetForm()
                  }}
                  className="rounded-xl border border-black/10 px-5 py-3 text-sm font-bold"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white"
                >

                  {editingStaff
                    ? 'Update Staff'
                    : 'Add Staff'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}


// =====================================================
// MESSAGES
// =====================================================

function Messages() {
  return (
    <div className="surface rounded-3xl p-8">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5">
          <MessageSquare size={22} />
        </div>

        <div>

          <h2 className="text-xl font-black">
            Messages
          </h2>

          <p className="mt-1 text-sm text-ink/50">
            Customer messages and support requests will appear here.
          </p>

        </div>

      </div>

    </div>
  )
}
