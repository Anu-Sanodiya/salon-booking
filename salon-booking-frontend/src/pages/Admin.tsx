import {
  CalendarCheck,
  ChartNoAxesCombined,
  CircleDollarSign,
  Home,
  CalendarDays,
  MessageCircle,
  Scissors,
  Settings,
  Users,
  MessageSquare,
  LayoutDashboard

} from 'lucide-react'
import { useState } from 'react'
import { mockBookings, staff } from '../data/mockData'
import { AdminServices } from './AdminServices'


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
const tabs = ['Overview', 'Appointments', 'Services', 'Staff', 'Messages']

export function Admin() {
  const [tab, setTab] = useState('Overview')

  return (
    <section className="container-page py-10">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="surface h-fit p-4">
          <div className="mb-5 flex items-center gap-2 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white">
              <Scissors size={18} />
            </div>

            <div>
              <p className="font-black">CUTS & CO.</p>
              <p className="text-xs text-ink/50">Admin workspace</p>
            </div>
          </div>

          <div className="grid gap-2">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold ${
                  tab === item
                    ? 'bg-ink text-white'
                    : 'text-ink/60 hover:bg-sand hover:text-ink'
                }`}
              >
                {renderTabIcon(item)}
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-ink/10 pt-4 text-sm text-ink/50">
            <p className="flex items-center gap-2 px-3 py-2">
              <Settings size={16} />
              Settings
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          {tab === 'Services' ? (
            <AdminServices />
          ) : (
            <>
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="eyebrow">Management console</p>
                  <h1 className="mt-1 text-4xl font-black">{tab}</h1>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700">
                  Demo data
                </span>
              </div>

              {tab === 'Overview' && <Overview />}
              {tab === 'Appointments' && <AppointmentTable />}
              {tab === 'Staff' && <StaffTable />}
              {tab === 'Messages' && (
                <div className="surface p-8">
                  <MessageCircle className="text-gold" size={32} />
                  <h2 className="mt-4 text-2xl font-black">Support inbox</h2>
                  <p className="mt-2 text-ink/60">
                    No unread conversations in this demo.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
