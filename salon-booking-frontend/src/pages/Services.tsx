// import {
//   Search,
//   SlidersHorizontal,
//   X,
// } from 'lucide-react'

// import { useEffect, useMemo, useState } from 'react'

// import { getServices, Service } from '../servicesApi'

// import { ServiceCard } from '../components/ServiceCard'


// export function Services() {
//   const [category, setCategory] = useState('All')
//   const [search, setSearch] = useState('')

//   // Services now come from MongoDB through the API
//   const [services, setServices] = useState<Service[]>([])

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')


//   /* =========================================================
//      FETCH SERVICES FROM BACKEND
//   ========================================================= */

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true)
//         setError('')

//         const servicesData = await getServices()

//         setServices(servicesData)
//       } catch (error) {
//         console.error('Error fetching services:', error)

//         setError('Failed to fetch services.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchServices()
//   }, [])


//   /* =========================================================
//      CREATE CATEGORY LIST
//   ========================================================= */

//   const categories = useMemo(() => {
//     return [
//       'All',

//       ...Array.from(
//         new Set(
//           services.map(
//             (service) => service.category
//           )
//         )
//       ),
//     ]
//   }, [services])


//   /* =========================================================
//      FILTER SERVICES
     
//      Search works with multiple words.

//      Example:
//      "hair cut"

//      will match:
//      Hair Cut
//      Hair Cut Advance

//      Category filter + search are applied together.
//   ========================================================= */

//   const filteredServices = useMemo(() => {
//     const searchWords = search
//       .toLowerCase()
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean)

//     return services.filter((service) => {

//       /* =====================================================
//          CATEGORY FILTER
//       ===================================================== */

//       const matchesCategory =
//         category === 'All' ||
//         service.category === category

//       if (!matchesCategory) {
//         return false
//       }


//       /* =====================================================
//          NO SEARCH TERM
//       ===================================================== */

//       if (searchWords.length === 0) {
//         return true
//       }


//       /* =====================================================
//          SEARCHABLE CONTENT
//       ===================================================== */

//       const searchableText = `
//         ${service.name}
//         ${service.category}
//         ${service.description || ''}
//       `.toLowerCase()


//       /* =====================================================
//          EVERY SEARCH WORD MUST EXIST
         
//          Example:
//          "hair spa"

//          requires both:
//          "hair"
//          "spa"
//       ===================================================== */

//       return searchWords.every((word) =>
//         searchableText.includes(word)
//       )
//     })
//   }, [category, search, services])


//   /* =========================================================
//      CATEGORY COUNTS
//   ========================================================= */

//   const getCategoryCount = (categoryName: string) => {
//     if (categoryName === 'All') {
//       return services.length
//     }

//     return services.filter(
//       (service) =>
//         service.category === categoryName
//     ).length
//   }


//   /* =========================================================
//      CLEAR FILTERS
//   ========================================================= */

//   const clearFilters = () => {
//     setCategory('All')
//     setSearch('')
//   }


//   /* =========================================================
//      LOADING STATE
//   ========================================================= */

//   if (loading) {
//     return (
//       <section className="container-page py-20">
//         <div className="rounded-3xl border border-ink/10 bg-white px-6 py-20 text-center shadow-soft">
//           <p className="text-sm font-semibold text-ink/60">
//             Loading services...
//           </p>
//         </div>
//       </section>
//     )
//   }


//   /* =========================================================
//      ERROR STATE
//   ========================================================= */

//   if (error) {
//     return (
//       <section className="container-page py-20">
//         <div className="rounded-3xl border border-red-200 bg-white px-6 py-20 text-center shadow-soft">

//           <h3 className="text-xl font-black text-ink">
//             Unable to load services
//           </h3>

//           <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">
//             {error}
//           </p>

//           <button
//             type="button"
//             onClick={() => window.location.reload()}
//             className="
//               mt-6
//               rounded-full
//               bg-ink
//               px-6
//               py-3
//               text-sm
//               font-bold
//               text-white
//               transition
//               hover:opacity-90
//             "
//           >
//             Try Again
//           </button>

//         </div>
//       </section>
//     )
//   }


//   /* =========================================================
//      MAIN PAGE
//   ========================================================= */

//   return (
//     <section className="container-page py-12">

//       {/* =====================================================
//           PAGE HEADER
//       ===================================================== */}

//       <div className="rounded-[2rem] bg-ink px-6 py-12 text-white sm:px-12">

//         <p className="eyebrow">
//           The service menu
//         </p>

//         <h1 className="mt-3 text-4xl font-black sm:text-6xl">
//           Find your next look.
//         </h1>

//         <p className="mt-4 max-w-2xl text-white/65">
//           Explore our complete hair, beauty, skin, nail and
//           grooming menu. Choose a service and book your
//           appointment at the salon or at home.
//         </p>

//       </div>


//       {/* =====================================================
//           SEARCH
//       ===================================================== */}

//       <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-4 shadow-soft">

//         <div className="relative">

//           <Search
//             size={20}
//             className="
//               absolute
//               left-4
//               top-1/2
//               -translate-y-1/2
//               text-ink/40
//             "
//           />

//           <input
//             type="text"
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             placeholder="Search services..."
//             className="
//               w-full
//               rounded-2xl
//               bg-sand
//               py-4
//               pl-12
//               pr-12
//               text-sm
//               font-medium
//               outline-none
//               transition
//               focus:ring-2
//               focus:ring-gold
//             "
//           />

//           {search && (
//             <button
//               type="button"
//               onClick={() => setSearch('')}
//               className="
//                 absolute
//                 right-4
//                 top-1/2
//                 -translate-y-1/2
//                 rounded-full
//                 p-1
//                 text-ink/40
//                 hover:bg-ink/10
//                 hover:text-ink
//               "
//             >
//               <X size={18} />
//             </button>
//           )}

//         </div>


//         {/* ===================================================
//             RESULT INFORMATION
//         =================================================== */}

//         <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">

//           <p className="text-sm text-ink/50">

//             {search ? (
//               <>
//                 <span className="font-semibold text-ink">
//                   {filteredServices.length}
//                 </span>{' '}

//                 service
//                 {filteredServices.length !== 1
//                   ? 's'
//                   : ''}

//                 {' '}found
//               </>
//             ) : (
//               <>
//                 <span className="font-semibold text-ink">
//                   {filteredServices.length}
//                 </span>{' '}

//                 services available
//               </>
//             )}

//           </p>


//           {(search || category !== 'All') && (
//             <button
//               type="button"
//               onClick={clearFilters}
//               className="
//                 text-xs
//                 font-bold
//                 text-ink
//                 underline
//                 underline-offset-4
//               "
//             >
//               Clear filters
//             </button>
//           )}

//         </div>

//       </div>


//       {/* =====================================================
//           SIDEBAR + SERVICES
//       ===================================================== */}

//       <div
//         className="
//           mt-8
//           grid
//           gap-8
//           lg:grid-cols-[260px_minmax(0,1fr)]
//         "
//       >

//         {/* ===================================================
//             STICKY SIDEBAR
//         =================================================== */}

//         <aside
//           className="
//             lg:sticky
//             lg:top-0
//             lg:h-screen
//             lg:self-start
//             lg:overflow-y-auto
//             lg:pb-12
//           "
//         >

//           <div
//             className="
//               rounded-3xl
//               border
//               border-ink/10
//               bg-white
//               p-5
//               shadow-soft
//             "
//           >

//             {/* Sidebar heading */}

//             <div className="mb-5 flex items-center gap-3">

//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-xl
//                   bg-sand
//                 "
//               >
//                 <SlidersHorizontal
//                   size={17}
//                   className="text-ink/70"
//                 />
//               </div>

//               <div>

//                 <p className="font-black text-ink">
//                   Filter Services
//                 </p>

//                 <p className="text-xs text-ink/45">
//                   Select a category
//                 </p>

//               </div>

//             </div>


//             {/* Category list */}

//             <div className="space-y-1">

//               {categories.map((item) => {

//                 const count =
//                   getCategoryCount(item)

//                 const isActive =
//                   category === item

//                 return (
//                   <button
//                     key={item}
//                     type="button"
//                     onClick={() =>
//                       setCategory(item)
//                     }
//                     className={`
//                       flex
//                       w-full
//                       items-center
//                       justify-between
//                       rounded-xl
//                       px-4
//                       py-3
//                       text-left
//                       text-sm
//                       font-bold
//                       transition-all

//                       ${
//                         isActive
//                           ? 'bg-ink text-white'
//                           : 'text-ink/65 hover:bg-sand hover:text-ink'
//                       }
//                     `}
//                   >

//                     <span className="truncate pr-3">
//                       {item}
//                     </span>

//                     <span
//                       className={`
//                         shrink-0
//                         rounded-full
//                         px-2
//                         py-0.5
//                         text-[11px]

//                         ${
//                           isActive
//                             ? 'bg-white/15 text-white'
//                             : 'bg-sand text-ink/45'
//                         }
//                       `}
//                     >
//                       {count}
//                     </span>

//                   </button>
//                 )
//               })}

//             </div>

//           </div>

//         </aside>


//         {/* ===================================================
//             SERVICES CONTENT
//         =================================================== */}

//         <main className="min-w-0">

//           {/* Current selection */}

//           <div
//             className="
//               mb-6
//               flex
//               flex-wrap
//               items-end
//               justify-between
//               gap-4
//             "
//           >

//             <div>

//               <p className="text-sm text-ink/45">
//                 {search
//                   ? `Search results for "${search}"`
//                   : 'Showing services'}
//               </p>

//               <h2 className="mt-1 text-2xl font-black text-ink">
//                 {category === 'All'
//                   ? 'All Services'
//                   : category}
//               </h2>

//             </div>


//             <div
//               className="
//                 rounded-full
//                 bg-sand
//                 px-4
//                 py-2
//                 text-sm
//                 font-bold
//                 text-ink/60
//               "
//             >
//               {filteredServices.length} results
//             </div>

//           </div>


//           {/* =================================================
//               FILTERED SERVICES
//           ================================================= */}

//           {filteredServices.length > 0 ? (

//             <div
//               className="
//                 grid
//                 gap-5
//                 sm:grid-cols-2
//                 xl:grid-cols-3
//               "
//             >

//               {filteredServices.map((service) => (

//                 <ServiceCard
//                   key={service._id}
//                   service={service}
//                 />

//               ))}

//             </div>

//           ) : (

//             /* =================================================
//                NO RESULTS
//             ================================================= */

//             <div
//               className="
//                 rounded-3xl
//                 border
//                 border-ink/10
//                 bg-white
//                 px-6
//                 py-20
//                 text-center
//                 shadow-soft
//               "
//             >

//               <div
//                 className="
//                   mx-auto
//                   flex
//                   h-16
//                   w-16
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-sand
//                 "
//               >

//                 <Search
//                   size={26}
//                   className="text-ink/40"
//                 />

//               </div>


//               <h3 className="mt-5 text-xl font-black">
//                 No services found
//               </h3>


//               <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">
//                 No services match your current search and
//                 category filter.
//               </p>


//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="
//                   mt-6
//                   rounded-full
//                   bg-ink
//                   px-6
//                   py-3
//                   text-sm
//                   font-bold
//                   text-white
//                   transition
//                   hover:opacity-90
//                 "
//               >
//                 View all services
//               </button>

//             </div>

//           )}

//         </main>

//       </div>

//     </section>
//   )
// }














import {
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ServiceCard } from '../components/ServiceCard'
import { getServices, Service } from '../servicesApi'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

export function Services() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('default')

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const searchInputRef = useRef<HTMLInputElement>(null)

  /* =========================================================
     FETCH SERVICES & KEYBOARD SHORTCUT (CMD/CTRL + K)
  ========================================================= */

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError('')
      const servicesData = await getServices()
      setServices(servicesData)
    } catch (err) {
      console.error('Error fetching services:', err)
      setError('We couldn’t connect to the service menu. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  /* =========================================================
     CATEGORY LIST & COUNTS (MEMOIZED)
  ========================================================= */

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: services.length }
    for (const service of services) {
      counts[service.category] = (counts[service.category] || 0) + 1
    }
    return counts
  }, [services])

  const categories = useMemo(() => {
    return Object.keys(categoryCounts)
  }, [categoryCounts])

  /* =========================================================
     FILTER & SORT SERVICES
  ========================================================= */

  const filteredServices = useMemo(() => {
    const searchWords = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    const filtered = services.filter((service) => {
      const matchesCategory =
        category === 'All' || service.category === category

      if (!matchesCategory) return false
      if (searchWords.length === 0) return true

      const searchableText = `
        ${service.name}
        ${service.category}
        ${service.description || ''}
      `.toLowerCase()

      return searchWords.every((word) => searchableText.includes(word))
    })

    // Optional sorting (safely checks if price exists on Service)
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy === 'price-asc' && 'price' in a && 'price' in b) {
        return Number(a.price) - Number(b.price)
      }
      if (sortBy === 'price-desc' && 'price' in a && 'price' in b) {
        return Number(b.price) - Number(a.price)
      }
      return 0
    })
  }, [category, search, sortBy, services])

  const clearFilters = () => {
    setCategory('All')
    setSearch('')
    setSortBy('default')
  }

  const hasActiveFilters = search.trim() !== '' || category !== 'All' || sortBy !== 'default'

  /* =========================================================
     ERROR STATE
  ========================================================= */

  if (error) {
    return (
      <section className="container-page py-20">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-red-200/80 bg-white px-8 py-16 text-center shadow-soft">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <X size={24} />
          </div>
          <h3 className="mt-5 text-2xl font-black text-ink">
            Unable to load menu
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            {error}
          </p>
          <button
            type="button"
            onClick={fetchServices}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition hover:bg-ink/90 active:scale-[0.98]"
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <section className="container-page py-8 sm:py-12">
      {/* =====================================================
          HERO HEADER + FLOATING SEARCH BAR
      ===================================================== */}
      <div className="relative">
        <div className="overflow-hidden rounded-[2rem] bg-ink px-6 pb-16 pt-12 text-white sm:px-12 sm:pb-20 sm:pt-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-gold">
            <Sparkles size={13} />
            <span>SALON & AT-HOME SERVICES</span>
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Find your next look.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Explore our complete hair, beauty, skin, nail, and grooming menu.
            Select a treatment to book seamlessly at the studio or in the comfort of your home.
          </p>
        </div>

        {/* Overlapping Search & Quick Controls Card */}
        <div className="mx-auto -mt-10 max-w-5xl px-3 sm:px-6">
          <div className="rounded-2xl border border-ink/10 bg-white p-2.5 shadow-lg shadow-ink/5 sm:p-3">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search treatments, e.g. 'hair spa', 'manicure'..."
                  className="w-full rounded-xl bg-sand/70 py-3.5 pl-11 pr-20 text-sm font-medium text-ink placeholder:text-ink/40 outline-none transition focus:bg-sand focus:ring-2 focus:ring-gold"
                />

                {search ? (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink/45 transition hover:bg-ink/10 hover:text-ink"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <kbd className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 rounded-md border border-ink/10 bg-white px-2 py-0.5 text-[11px] font-semibold text-ink/40 sm:inline-block">
                    ⌘K
                  </kbd>
                )}
              </div>

              {/* Sort Selector */}
              <div className="relative sm:w-52">
                <ArrowUpDown
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/45"
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Sort services"
                  className="w-full appearance-none rounded-xl border border-ink/10 bg-white py-3.5 pl-10 pr-8 text-sm font-semibold text-ink outline-none transition hover:border-ink/25 focus:ring-2 focus:ring-gold"
                >
                  <option value="default">Recommended</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE CATEGORY PILLS (VISIBLE < LG)
      ===================================================== */}
      {!loading && (
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none lg:hidden">
          {categories.map((item) => {
            const isActive = category === item
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-ink text-white shadow-sm'
                    : 'border border-ink/10 bg-white text-ink/70 hover:border-ink/25 hover:text-ink'
                }`}
              >
                <span>{item}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-sand text-ink/50'
                  }`}
                >
                  {categoryCounts[item]}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* =====================================================
          MAIN WORKSPACE: SIDEBAR + GRID
      ===================================================== */}
      <div className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* DESKTOP STICKY SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-ink/10 bg-white p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-3 border-b border-ink/5 pb-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand text-ink/75">
                <SlidersHorizontal size={16} />
              </div>
              <div>
                <p className="text-sm font-black text-ink">Categories</p>
                <p className="text-xs text-ink/45">Browse by specialty</p>
              </div>
            </div>

            {loading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-10 animate-pulse rounded-xl bg-sand/80"
                  />
                ))}
              </div>
            ) : (
              <nav aria-label="Service categories" className="space-y-1">
                {categories.map((item) => {
                  const isActive = category === item
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-ink text-white shadow-sm'
                          : 'text-ink/65 hover:bg-sand/80 hover:text-ink'
                      }`}
                    >
                      <span className="truncate pr-2">{item}</span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-sand text-ink/50 group-hover:bg-white'
                        }`}
                      >
                        {categoryCounts[item]}
                      </span>
                    </button>
                  )
                })}
              </nav>
            )}
          </div>
        </aside>

        {/* SERVICES FEED */}
        <main className="min-w-0">
          {/* Active Toolbar & Result Summary */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-ink">
                {category === 'All' ? 'All Services' : category}
              </h2>
              <p className="mt-0.5 text-sm text-ink/50">
                {loading
                  ? 'Fetching menu...'
                  : `Showing ${filteredServices.length} ${
                      filteredServices.length === 1 ? 'treatment' : 'treatments'
                    }`}
              </p>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && !loading && (
              <div className="flex flex-wrap items-center gap-2">
                {category !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-bold text-ink">
                    {category}
                    <button
                      type="button"
                      onClick={() => setCategory('All')}
                      className="rounded-full p-0.5 text-ink/45 hover:bg-sand hover:text-ink"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {search && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-bold text-ink">
                    “{search}”
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="rounded-full p-0.5 text-ink/45 hover:bg-sand hover:text-ink"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-2 py-1 text-xs font-bold text-ink/60 underline underline-offset-4 transition hover:text-ink"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>

          {/* Grid States: Skeleton -> Cards -> Empty State */}
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex h-72 flex-col justify-between rounded-3xl border border-ink/5 bg-white p-5 shadow-soft"
                >
                  <div>
                    <div className="h-32 w-full animate-pulse rounded-2xl bg-sand" />
                    <div className="mt-4 h-5 w-3/4 animate-pulse rounded-lg bg-sand" />
                    <div className="mt-2 h-4 w-full animate-pulse rounded-lg bg-sand/70" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="h-6 w-16 animate-pulse rounded-lg bg-sand" />
                    <div className="h-9 w-24 animate-pulse rounded-full bg-sand" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredServices.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-ink/10 bg-white px-6 py-20 text-center shadow-soft">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sand text-ink/45">
                <Search size={26} />
              </div>
              <h3 className="mt-5 text-xl font-black text-ink">
                No matching treatments
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/55">
                We couldn’t find any services matching{' '}
                {search ? <span className="font-semibold text-ink">“{search}”</span> : 'your selection'}.
                Try broadening your keywords or exploring another category.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink/90 active:scale-[0.98]"
              >
                Explore full menu
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  )
}