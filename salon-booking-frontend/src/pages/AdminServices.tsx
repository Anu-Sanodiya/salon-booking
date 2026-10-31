import { useEffect, useMemo, useState } from 'react'
import { Check, Edit3, Plus, Search, X } from 'lucide-react'
import {
  createService,
  deleteService,
  getServices,
  updateService,
  type Service,
} from '../servicesApi'

type ServiceForm = {
  name: string
  category: string
  description: string
  duration: number
  salonPrice: number
  homePrice: number | null
  homeServiceAvailable: boolean
  popular: boolean
  isActive: boolean
  image: string
}

const emptyForm: ServiceForm = {
  name: '', category: '', description: '', duration: 30,
  salonPrice: 0, homePrice: null, homeServiceAvailable: false,
  popular: false, isActive: true, image: '',
}

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ServiceForm>(emptyForm)

  const loadServices = async () => {
    try {
      setLoading(true)
      setError('')
      setServices(await getServices())
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to load services.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadServices() }, [])

  const categories = useMemo(() => [
    'All', ...Array.from(new Set(services.map((s) => s.category).filter(Boolean))),
  ], [services])

  const filteredServices = useMemo(() => {
    const query = search.toLowerCase().trim()
    return services.filter((service) =>
      (selectedCategory === 'All' || service.category === selectedCategory) &&
      (!query || service.name.toLowerCase().includes(query)),
    )
  }, [services, selectedCategory, search])

  const updateForm = (field: keyof ServiceForm, value: string | number | boolean | null) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const handleEdit = (service: Service) => {
    setEditingId(service._id)
    setForm({
      name: service.name, category: service.category,
      description: service.description || '', duration: service.duration || 30,
      salonPrice: service.salonPrice ?? 0, homePrice: service.homePrice ?? null,
      homeServiceAvailable: service.homeServiceAvailable ?? false,
      popular: service.popular ?? false, isActive: service.isActive ?? true,
      image: service.image || '',
    })
    setError(''); setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddNew = () => {
    setEditingId(null)
    setForm({ ...emptyForm, category: selectedCategory === 'All' ? '' : selectedCategory })
    setError(''); setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = async () => {
    if (!form.name.trim()) return setError('Service name is required.')
    if (!form.category.trim()) return setError('Category is required.')
    if (!Number.isFinite(form.salonPrice) || form.salonPrice < 0) return setError('Enter a valid salon price.')
    if (form.homePrice !== null && (!Number.isFinite(form.homePrice) || form.homePrice < 0)) {
      return setError('Enter a valid home price or leave it empty.')
    }

    try {
      setSaving(true); setError(''); setSuccess('')
      const payload = {
        name: form.name.trim(), category: form.category.trim(),
        description: form.description.trim(), duration: form.duration,
        salonPrice: form.salonPrice, homePrice: form.homePrice,
        homeServiceAvailable: form.homeServiceAvailable, popular: form.popular,
        isActive: form.isActive, image: form.image.trim(),
      }
      if (editingId) {
        const updated = await updateService(editingId, payload)
        setServices((previous) => previous.map((s) => s._id === editingId ? updated : s))
        setSuccess('Service updated and saved to the database.')
      } else {
        const created = await createService(payload)
        setServices((previous) => [...previous, created])
        setSuccess('Service created successfully.')
      }
      setEditingId(null); setForm(emptyForm)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to save service.')
    } finally { setSaving(false) }
  }

  const handleDelete = async (service: Service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.name}"?`)) return
    try {
      setError(''); setSuccess('')
      await deleteService(service._id)
      setServices((previous) => previous.filter((s) => s._id !== service._id))
      if (editingId === service._id) { setEditingId(null); setForm(emptyForm) }
      setSuccess('Service deleted successfully.')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Failed to delete service.')
    }
  }

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); setError(''); setSuccess('') }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Management Console</p>
          <h1 className="mt-2 text-4xl font-black">Services</h1>
          <p className="mt-2 text-sm text-ink/55">Manage service categories, details, and pricing.</p>
        </div>
        <button type="button" onClick={handleAddNew} className="btn-primary flex items-center justify-center gap-2"><Plus size={17} />Add Service</button>
      </header>

      {success && <div role="status" className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</div>}
      {error && <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}

      {/* Add/edit form appears above the service list. */}
      <section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-soft">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">{editingId ? 'Edit Service' : 'Add Service'}</h2>
            <p className="mt-1 text-sm text-ink/50">{editingId ? 'Changes are saved to MongoDB.' : 'Enter the details for a new service.'}</p>
          </div>
          {editingId && <button type="button" onClick={cancelEdit} className="flex items-center gap-2 rounded-xl border border-ink/10 px-4 py-2 text-sm font-bold text-ink/60 hover:bg-sand"><X size={16} />Cancel</button>}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div><label htmlFor="service-name" className="mb-2 block text-sm font-bold">Service Name</label><input id="service-name" value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="e.g. Hair Cut" className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /></div>
          <div><label htmlFor="service-category" className="mb-2 block text-sm font-bold">Category</label><input id="service-category" list="service-category-options" value={form.category} onChange={(e) => updateForm('category', e.target.value)} placeholder="e.g. Hair Services" className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /><datalist id="service-category-options">{categories.filter((c) => c !== 'All').map((c) => <option key={c} value={c} />)}</datalist></div>
          <div><label htmlFor="service-duration" className="mb-2 block text-sm font-bold">Duration (minutes)</label><input id="service-duration" type="number" min="1" value={form.duration} onChange={(e) => updateForm('duration', Number(e.target.value))} className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /></div>
          <div><label htmlFor="service-salon-price" className="mb-2 block text-sm font-bold">Salon Price (₹)</label><input id="service-salon-price" type="number" min="0" value={form.salonPrice} onChange={(e) => updateForm('salonPrice', Number(e.target.value))} className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /></div>
          <div><label htmlFor="service-home-price" className="mb-2 block text-sm font-bold">Home Price (₹)</label><input id="service-home-price" type="number" min="0" value={form.homePrice ?? ''} onChange={(e) => updateForm('homePrice', e.target.value === '' ? null : Number(e.target.value))} placeholder="Leave empty if not set" className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /></div>
          <div><label htmlFor="service-image" className="mb-2 block text-sm font-bold">Image URL</label><input id="service-image" value={form.image} onChange={(e) => updateForm('image', e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /></div>
        </div>

        <div className="mt-5"><label htmlFor="service-description" className="mb-2 block text-sm font-bold">Description</label><textarea id="service-description" value={form.description} onChange={(e) => updateForm('description', e.target.value)} rows={3} placeholder="Describe the service..." className="w-full resize-y rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold" /></div>
        <div className="mt-5 flex flex-wrap gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-sand px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.homeServiceAvailable} onChange={(e) => updateForm('homeServiceAvailable', e.target.checked)} className="h-4 w-4" />Home Service Available</label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-sand px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.popular} onChange={(e) => updateForm('popular', e.target.checked)} className="h-4 w-4" />Popular</label>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-sand px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.isActive} onChange={(e) => updateForm('isActive', e.target.checked)} className="h-4 w-4" />Active</label>
        </div>
        <div className="mt-6 flex justify-end"><button type="button" disabled={saving} onClick={() => void handleSave()} className="btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"><Check size={17} />{saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Service'}</button></div>
      </section>

      {/* Search and category filter work together. */}
      <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_260px]">
          <div><label htmlFor="service-search" className="mb-2 block text-sm font-bold">Search Service</label><div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" /><input id="service-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by service name..." className="w-full rounded-xl border border-ink/10 bg-sand py-3 pl-11 pr-4 outline-none focus:border-gold" /></div></div>
          <div><label htmlFor="category-filter" className="mb-2 block text-sm font-bold">Filter by Category</label><select id="category-filter" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full rounded-xl border border-ink/10 bg-sand px-4 py-3 outline-none focus:border-gold">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        </div>
        <p className="mt-4 text-sm font-semibold text-ink/50">Showing {filteredServices.length} service{filteredServices.length === 1 ? '' : 's'}</p>
      </section>

      <section className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft">
        {loading ? <div className="p-10 text-center text-sm font-semibold text-ink/50">Loading services...</div> : filteredServices.length === 0 ? <div className="p-10 text-center"><p className="text-lg font-black">No services found</p><p className="mt-2 text-sm text-ink/50">Try another category or search term.</p></div> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[850px]"><thead><tr className="bg-sand text-left">
            <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-ink/55">Service</th><th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-ink/55">Category</th><th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-ink/55">Salon Price</th><th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-ink/55">Home Price</th><th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-ink/55">Status</th><th className="px-6 py-5 text-right text-xs font-black uppercase tracking-widest text-ink/55">Actions</th>
          </tr></thead><tbody>{filteredServices.map((service) => <tr key={service._id} className="border-t border-ink/10 hover:bg-sand/40">
            <td className="px-6 py-5"><div className="font-black">{service.name}</div>{service.popular && <span className="mt-1 inline-block text-xs font-bold text-gold">Popular</span>}</td>
            <td className="px-6 py-5 text-sm">{service.category}</td><td className="px-6 py-5 text-sm font-black">₹{service.salonPrice}</td>
            <td className="px-6 py-5 text-sm font-black">{service.homeServiceAvailable && service.homePrice != null ? `₹${service.homePrice}` : '—'}</td>
            <td className="px-6 py-5">{service.isActive ? <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Active</span> : <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">Inactive</span>}</td>
            <td className="px-6 py-5"><div className="flex justify-end gap-2"><button type="button" onClick={() => handleEdit(service)} className="flex items-center gap-2 rounded-xl bg-sand px-3 py-2 text-sm font-bold hover:bg-ink hover:text-white"><Edit3 size={15} />Edit</button><button type="button" onClick={() => void handleDelete(service)} className="rounded-xl px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50">Delete</button></div></td>
          </tr>)}</tbody></table></div>
        )}
      </section>
    </div>
  )
}
