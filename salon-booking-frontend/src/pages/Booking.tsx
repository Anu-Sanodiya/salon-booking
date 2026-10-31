import { ArrowRight, CalendarDays, Check, Clock, Home, MapPin } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { services, staff } from '../data/mockData'

export function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()

  const service = services.find((item) => item.id === Number(id)) ?? services[0]
  const [location, setLocation] = useState<'salon' | 'home'>('salon')
  const [date, setDate] = useState('2026-09-18')
  const [time, setTime] = useState('10:00')
  const [selectedStaff, setSelectedStaff] = useState<number | null>(2)
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')

  const price = location === 'salon' ? service.salonPrice : service.homePrice
  const hasHomePrice = typeof service.homePrice === 'number'
  const availableStaff = useMemo(
    () => staff.filter((person) => person.available),
    []
  )

  function continueToPayment() {
    const payload = {
      serviceId: service.id,
      serviceName: service.name,
      location,
      date,
      time,
      staffId: selectedStaff,
      address,
      notes,
      amount: price,
    }

    sessionStorage.setItem('salonBookingDraft', JSON.stringify(payload))
    navigate('/payment')
  }

  return (
    <section className="container-page py-12">
      <Link to="/services" className="text-sm font-bold text-ink/60 hover:text-ink">
        ← Back to services
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface overflow-hidden">
          <img src={service.image} alt={service.name} className="h-80 w-full object-cover" />

          <div className="p-6">
            <p className="eyebrow">Your selected service</p>
            <h1 className="mt-2 text-3xl font-black">{service.name}</h1>
            <p className="mt-3 leading-7 text-ink/60">{service.description}</p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-ink/65">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {service.duration ? `${service.duration} minutes` : 'Timing confirmed by salon'}
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} />
                Professional service
              </span>
            </div>
          </div>
        </div>

        <div className="surface p-6 sm:p-8">
          <p className="eyebrow">Customize your appointment</p>
          <h2 className="mt-2 text-3xl font-black">Choose your preferences</h2>

          <div className="mt-7">
            <label className="text-sm font-black">Service location</label>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <LocationChoice
                active={location === 'salon'}
                icon={<MapPin />}
                title="At salon"
                price={service.salonPrice}
                text="Visit our studio"
                onClick={() => setLocation('salon')}
              />

              <LocationChoice
                active={location === 'home'}
                icon={<Home />}
                title="At home"
                price={service.homePrice}
                text="We come to you"
                onClick={() => setLocation('home')}
              />
            </div>
          </div>

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
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </Field>

            <Field label="Preferred time">
              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
              >
                <option>10:00</option>
                <option>12:00</option>
                <option>14:00</option>
                <option>16:00</option>
                <option>18:00</option>
              </select>
            </Field>
          </div>

          <div className="mt-6">
            <label className="text-sm font-black">Choose a professional</label>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {availableStaff.map((person) => (
                <button
                  key={person.id}
                  onClick={() => setSelectedStaff(person.id)}
                  className={`rounded-2xl border p-3 text-center ${
                    selectedStaff === person.id ? 'border-gold bg-gold/10' : 'border-ink/10 bg-sand'
                  }`}
                >
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="mx-auto h-14 w-14 rounded-full object-cover"
                  />
                  <p className="mt-2 text-sm font-black">{person.name}</p>
                  <p className="text-xs text-ink/55">★ {person.rating}</p>
                </button>
              ))}
            </div>
          </div>

          {location === 'home' && (
            <div className="mt-6">
              <Field label="Home address">
                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  rows={3}
                  placeholder="Enter your complete address"
                  className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
                />
              </Field>
            </div>
          )}

          <div className="mt-6">
            <Field label="Additional notes (optional)">
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={2}
                placeholder="Any style preferences or requests?"
                className="w-full rounded-2xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
              />
            </Field>
          </div>

          <div className="mt-7 flex items-center justify-between rounded-2xl bg-sand p-4">
            <div>
              <p className="text-sm text-ink/55">Estimated total</p>
              <p className="text-3xl font-black">{price != null ? `₹${price}` : 'On request'}</p>
            </div>

            <button
              onClick={continueToPayment}
              disabled={
                (location === 'home' && !address.trim()) ||
                (location === 'home' && !hasHomePrice)
              }
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              {location === 'home' && !hasHomePrice ? 'Contact support' : 'Continue'}
              <ArrowRight size={17} />
            </button>
          </div>

          <p className="mt-3 text-xs leading-5 text-ink/50">
            This demo reserves a draft locally. Real availability and payment verification will be
            handled by your Flask backend.
          </p>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black">{label}</span>
      {children}
    </label>
  )
}

type LocationChoiceProps = {
  active: boolean
  icon: ReactNode
  title: string
  price?: number
  text: string
  onClick: () => void
}

function LocationChoice({ active, icon, title, price, text, onClick }: LocationChoiceProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left ${
        active ? 'border-gold bg-gold/10' : 'border-ink/10 bg-sand'
      }`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-gold">
        {icon}
      </span>

      <span className="flex-1">
        <span className="block font-black">{title}</span>
        <span className="block text-xs text-ink/55">{text}</span>
      </span>

      <span className="font-black text-right">{price != null ? `₹${price}` : 'On request'}</span>
    </button>
  )
}
