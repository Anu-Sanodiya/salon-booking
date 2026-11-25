import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Home,
  MapPin,
} from 'lucide-react'

import {
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  getService,
  type Service,
} from '../servicesApi'

import {
  getAvailableStaff,
  type Staff,
} from '../staffApi'

import {
  isCustomerLoggedIn,
} from '../cutomerAuthApi'


export function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()

  // ==================================================
  // STATE
  // ==================================================

  const [service, setService] =
    useState<Service | null>(null)

  const [staffList, setStaffList] =
    useState<Staff[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [location, setLocation] =
    useState<'salon' | 'home'>('salon')

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split('T')[0]
    )

  const [time, setTime] =
    useState('10:00')

  const [selectedStaff, setSelectedStaff] =
    useState<string | null>(null)

  const [address, setAddress] =
    useState('')

  const [notes, setNotes] =
    useState('')


  // ==================================================
  // LOAD SERVICE + AVAILABLE STAFF
  // ==================================================

  useEffect(() => {
    loadBookingData()
  }, [id])


  async function loadBookingData() {
    if (!id) {
      setError('Service ID is missing')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')

      const [serviceData, staffData] =
        await Promise.all([
          getService(id),
          getAvailableStaff(),
        ])

      setService(serviceData)
      setStaffList(staffData)

    } catch (err: any) {
      console.error(
        'Booking data error:',
        err
      )

      setError(
        err?.message ||
          'Failed to load booking details'
      )
    } finally {
      setLoading(false)
    }
  }


  // ==================================================
  // PRICE
  // ==================================================

  const price =
    service
      ? location === 'salon'
        ? service.salonPrice
        : service.homePrice
      : null

  const hasHomePrice =
    service?.homePrice !== null &&
    service?.homePrice !== undefined


  // ==================================================
  // CONTINUE TO PAYMENT
  // ==================================================

  function continueToPayment() {

    // -----------------------------------------------
    // SERVICE VALIDATION
    // -----------------------------------------------

    if (!service) {
      setError(
        'Service information is not available'
      )
      return
    }


    // -----------------------------------------------
    // PROFESSIONAL VALIDATION
    // -----------------------------------------------

    if (!selectedStaff) {
      setError(
        'Please choose a professional'
      )
      return
    }


    // -----------------------------------------------
    // DATE VALIDATION
    // -----------------------------------------------

    if (!date) {
      setError(
        'Please select a date'
      )
      return
    }


    // -----------------------------------------------
    // TIME VALIDATION
    // -----------------------------------------------

    if (!time) {
      setError(
        'Please select a time'
      )
      return
    }


    // -----------------------------------------------
    // HOME SERVICE VALIDATION
    // -----------------------------------------------

    if (
      location === 'home' &&
      !address.trim()
    ) {
      setError(
        'Please enter your home address'
      )
      return
    }


    // -----------------------------------------------
    // HOME PRICE VALIDATION
    // -----------------------------------------------

    if (
      location === 'home' &&
      !hasHomePrice
    ) {
      setError(
        'Home service is not available for this service'
      )
      return
    }


    // -----------------------------------------------
    // FIND SELECTED PROFESSIONAL
    // -----------------------------------------------

    const selectedProfessional =
      staffList.find(
        (person) =>
          person._id === selectedStaff
      )


    // -----------------------------------------------
    // CREATE BOOKING DRAFT
    // -----------------------------------------------

    const payload = {
      serviceId: service._id,
      serviceName: service.name,

      location,

      date,
      time,

      staffId: selectedStaff,

      staffName:
        selectedProfessional?.name,

      address,

      notes,

      amount: price,
    }


    // -----------------------------------------------
    // SAVE TEMPORARY BOOKING DATA
    // -----------------------------------------------

    sessionStorage.setItem(
      'salonBookingDraft',
      JSON.stringify(payload)
    )


    setError('')


    // -----------------------------------------------
    // CUSTOMER LOGIN CHECK
    // -----------------------------------------------

    if (!isCustomerLoggedIn()) {

      navigate('/login', {
        state: {
          redirectTo: '/payment',
        },
      })

      return
    }


    // -----------------------------------------------
    // ALREADY LOGGED IN
    // -----------------------------------------------

    navigate('/payment')
  }


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <section className="container-page py-20">

        <div className="flex items-center justify-center">

          <div className="flex items-center gap-3 text-sm font-semibold text-ink/60">

            <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink/20 border-t-gold" />

            Loading booking details...

          </div>

        </div>

      </section>
    )
  }


  // ==================================================
  // SERVICE ERROR
  // ==================================================

  if (!service) {
    return (
      <section className="container-page py-12">

        <div className="surface p-8 text-center">

          <h1 className="text-2xl font-black">
            Unable to load service
          </h1>

          <p className="mt-3 text-sm text-ink/55">
            {error || 'Service not found'}
          </p>

          <Link
            to="/services"
            className="btn-primary mt-6 inline-flex"
          >
            Back to services
          </Link>

        </div>

      </section>
    )
  }


  // ==================================================
  // UI
  // ==================================================

  return (
    <section className="container-page py-12">

      {/* BACK */}

      <Link
        to="/services"
        className="text-sm font-bold text-ink/60 hover:text-ink"
      >
        ← Back to services
      </Link>


      <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">


        {/* ==================================================
            SERVICE DETAILS
        ================================================== */}

        <div className="surface overflow-hidden">

          {service.image ? (

            <img
              src={service.image}
              alt={service.name}
              className="h-80 w-full object-cover"
            />

          ) : (

            <div className="flex h-80 items-center justify-center bg-sand text-sm text-ink/40">
              No image available
            </div>

          )}


          <div className="p-6">

            <p className="eyebrow">
              Your selected service
            </p>

            <h1 className="mt-2 text-3xl font-black">
              {service.name}
            </h1>

            <p className="mt-3 leading-7 text-ink/60">
              {service.description}
            </p>


            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-ink/65">

              <span className="flex items-center gap-2">
                <Clock size={16} />

                {service.duration
                  ? `${service.duration} minutes`
                  : 'Timing confirmed by salon'}
              </span>


              <span className="flex items-center gap-2">

                <Check size={16} />

                Professional service

              </span>

            </div>

          </div>

        </div>


        {/* ==================================================
            BOOKING FORM
        ================================================== */}

        <div className="surface p-6 sm:p-8">

          <p className="eyebrow">
            Customize your appointment
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Choose your preferences
          </h2>


          {/* ==================================================
              LOCATION
          ================================================== */}

          <div className="mt-7">

            <label className="text-sm font-black">
              Service location
            </label>


            <div className="mt-3 grid gap-3 sm:grid-cols-2">

              <LocationChoice
                active={
                  location === 'salon'
                }
                icon={<MapPin />}
                title="At salon"
                price={
                  service.salonPrice
                }
                text="Visit our studio"
                onClick={() => {
                  setLocation('salon')
                  setError('')
                }}
              />


              <LocationChoice
                active={
                  location === 'home'
                }
                icon={<Home />}
                title="At home"
                price={
                  service.homePrice
                }
                text="We come to you"
                onClick={() => {
                  setLocation('home')
                  setError('')
                }}
              />

            </div>

          </div>


          {/* ==================================================
              DATE + TIME
          ================================================== */}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">

            <Field label="Preferred date">

              <div className="relative">

                <CalendarDays
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
                  size={17}
                />

                <input
                  type="date"
                  value={date}
                  min={
                    new Date()
                      .toISOString()
                      .split('T')[0]
                  }
                  onChange={(event) => {
                    setDate(
                      event.target.value
                    )
                    setError('')
                  }}
                  className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-gold"
                />

              </div>

            </Field>


            <Field label="Preferred time">

              <select
                value={time}
                onChange={(event) => {
                  setTime(
                    event.target.value
                  )
                  setError('')
                }}
                className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
              >

                <option value="10:00">
                  10:00
                </option>

                <option value="12:00">
                  12:00
                </option>

                <option value="14:00">
                  14:00
                </option>

                <option value="16:00">
                  16:00
                </option>

                <option value="18:00">
                  18:00
                </option>

              </select>

            </Field>

          </div>


          {/* ==================================================
              PROFESSIONAL
          ================================================== */}

          <div className="mt-6">

            <label className="text-sm font-black">
              Choose a professional
            </label>

            <p className="mt-1 text-xs text-ink/50">
              Select from professionals currently available.
            </p>


            {staffList.length === 0 ? (

              <div className="mt-3 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-700">
                No professionals are currently available.
              </div>

            ) : (

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">

                {staffList.map(
                  (person) => (

                    <button
                      key={person._id}
                      type="button"
                      onClick={() => {
                        setSelectedStaff(
                          person._id
                        )
                        setError('')
                      }}
                      className={`rounded-2xl border p-3 text-center ${
                        selectedStaff ===
                        person._id
                          ? 'border-gold bg-gold/10'
                          : 'border-ink/10 bg-sand'
                      }`}
                    >

                      {person.image ? (

                        <img
                          src={
                            person.image
                          }
                          alt={
                            person.name
                          }
                          className="mx-auto h-14 w-14 rounded-full object-cover"
                        />

                      ) : (

                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-sm font-black text-white">

                          {person.name
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                      )}


                      <p className="mt-2 text-sm font-black">
                        {person.name}
                      </p>

                      <p className="text-xs text-ink/55">
                        {person.role}
                      </p>

                      <p className="text-xs text-ink/55">
                        ★ {person.rating}
                      </p>

                    </button>

                  )
                )}

              </div>

            )}

          </div>


          {/* ==================================================
              HOME ADDRESS
          ================================================== */}

          {location === 'home' && (

            <div className="mt-6">

              <Field label="Home address">

                <textarea
                  value={address}
                  onChange={(event) =>
                    setAddress(
                      event.target.value
                    )
                  }
                  rows={3}
                  placeholder="Enter your complete address"
                  className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
                />

              </Field>

            </div>

          )}


          {/* ==================================================
              NOTES
          ================================================== */}

          <div className="mt-6">

            <Field label="Additional notes (optional)">

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(
                    event.target.value
                  )
                }
                rows={2}
                placeholder="Any style preferences or requests?"
                className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
              />

            </Field>

          </div>


          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (

            <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>

          )}


          {/* ==================================================
              TOTAL + CONTINUE
          ================================================== */}

          <div className="mt-7 flex items-center justify-between rounded-2xl bg-sand p-4">

            <div>

              <p className="text-sm text-ink/55">
                Estimated total
              </p>

              <p className="text-3xl font-black">

                {price != null
                  ? `₹${price}`
                  : 'On request'}

              </p>

            </div>


            <button
              type="button"
              onClick={
                continueToPayment
              }
              disabled={
                !selectedStaff ||
                !date ||
                !time ||
                (location ===
                  'home' &&
                  !address.trim()) ||
                (location ===
                  'home' &&
                  !hasHomePrice)
              }
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >

              {location ===
                'home' &&
              !hasHomePrice
                ? 'Contact support'
                : 'Continue'}

              <ArrowRight
                size={17}
              />

            </button>

          </div>


          <p className="mt-3 text-xs leading-5 text-ink/50">
            You can browse and select your appointment
            without logging in. Login or registration
            is required only when you continue to
            payment.
          </p>

        </div>

      </div>

    </section>
  )
}


// =====================================================
// FIELD
// =====================================================

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-black">
        {label}
      </span>

      {children}

    </label>
  )
}


// =====================================================
// LOCATION CHOICE
// =====================================================

type LocationChoiceProps = {
  active: boolean
  icon: ReactNode
  title: string
  price?: number | null
  text: string
  onClick: () => void
}


function LocationChoice({
  active,
  icon,
  title,
  price,
  text,
  onClick,
}: LocationChoiceProps) {
  return (

    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left ${
        active
          ? 'border-gold bg-gold/10'
          : 'border-ink/10 bg-sand'
      }`}
    >

      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-gold">
        {icon}
      </span>


      <span className="flex-1">

        <span className="block font-black">
          {title}
        </span>

        <span className="block text-xs text-ink/55">
          {text}
        </span>

      </span>


      <span className="font-black text-right">

        {price != null
          ? `₹${price}`
          : 'On request'}

      </span>

    </button>
  )
}