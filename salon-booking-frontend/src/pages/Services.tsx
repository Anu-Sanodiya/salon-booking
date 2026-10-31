import {
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'

import { useEffect, useMemo, useState } from 'react'

import { getServices, Service } from '../servicesApi'

import { ServiceCard } from '../components/ServiceCard'


export function Services() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  // Services now come from MongoDB through the API
  const [services, setServices] = useState<Service[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  /* =========================================================
     FETCH SERVICES FROM BACKEND
  ========================================================= */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError('')

        const servicesData = await getServices()

        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)

        setError('Failed to fetch services.')
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])


  /* =========================================================
     CREATE CATEGORY LIST
  ========================================================= */

  const categories = useMemo(() => {
    return [
      'All',

      ...Array.from(
        new Set(
          services.map(
            (service) => service.category
          )
        )
      ),
    ]
  }, [services])


  /* =========================================================
     FILTER SERVICES
     
     Search works with multiple words.

     Example:
     "hair cut"

     will match:
     Hair Cut
     Hair Cut Advance

     Category filter + search are applied together.
  ========================================================= */

  const filteredServices = useMemo(() => {
    const searchWords = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    return services.filter((service) => {

      /* =====================================================
         CATEGORY FILTER
      ===================================================== */

      const matchesCategory =
        category === 'All' ||
        service.category === category

      if (!matchesCategory) {
        return false
      }


      /* =====================================================
         NO SEARCH TERM
      ===================================================== */

      if (searchWords.length === 0) {
        return true
      }


      /* =====================================================
         SEARCHABLE CONTENT
      ===================================================== */

      const searchableText = `
        ${service.name}
        ${service.category}
        ${service.description || ''}
      `.toLowerCase()


      /* =====================================================
         EVERY SEARCH WORD MUST EXIST
         
         Example:
         "hair spa"

         requires both:
         "hair"
         "spa"
      ===================================================== */

      return searchWords.every((word) =>
        searchableText.includes(word)
      )
    })
  }, [category, search, services])


  /* =========================================================
     CATEGORY COUNTS
  ========================================================= */

  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'All') {
      return services.length
    }

    return services.filter(
      (service) =>
        service.category === categoryName
    ).length
  }


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setCategory('All')
    setSearch('')
  }


  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <section className="container-page py-20">
        <div className="rounded-3xl border border-ink/10 bg-white px-6 py-20 text-center shadow-soft">
          <p className="text-sm font-semibold text-ink/60">
            Loading services...
          </p>
        </div>
      </section>
    )
  }


  /* =========================================================
     ERROR STATE
  ========================================================= */

  if (error) {
    return (
      <section className="container-page py-20">
        <div className="rounded-3xl border border-red-200 bg-white px-6 py-20 text-center shadow-soft">

          <h3 className="text-xl font-black text-ink">
            Unable to load services
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="
              mt-6
              rounded-full
              bg-ink
              px-6
              py-3
              text-sm
              font-bold
              text-white
              transition
              hover:opacity-90
            "
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
    <section className="container-page py-12">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="rounded-[2rem] bg-ink px-6 py-12 text-white sm:px-12">

        <p className="eyebrow">
          The service menu
        </p>

        <h1 className="mt-3 text-4xl font-black sm:text-6xl">
          Find your next look.
        </h1>

        <p className="mt-4 max-w-2xl text-white/65">
          Explore our complete hair, beauty, skin, nail and
          grooming menu. Choose a service and book your
          appointment at the salon or at home.
        </p>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-4 shadow-soft">

        <div className="relative">

          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-ink/40
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search services..."
            className="
              w-full
              rounded-2xl
              bg-sand
              py-4
              pl-12
              pr-12
              text-sm
              font-medium
              outline-none
              transition
              focus:ring-2
              focus:ring-gold
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                rounded-full
                p-1
                text-ink/40
                hover:bg-ink/10
                hover:text-ink
              "
            >
              <X size={18} />
            </button>
          )}

        </div>


        {/* ===================================================
            RESULT INFORMATION
        =================================================== */}

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1">

          <p className="text-sm text-ink/50">

            {search ? (
              <>
                <span className="font-semibold text-ink">
                  {filteredServices.length}
                </span>{' '}

                service
                {filteredServices.length !== 1
                  ? 's'
                  : ''}

                {' '}found
              </>
            ) : (
              <>
                <span className="font-semibold text-ink">
                  {filteredServices.length}
                </span>{' '}

                services available
              </>
            )}

          </p>


          {(search || category !== 'All') && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                text-xs
                font-bold
                text-ink
                underline
                underline-offset-4
              "
            >
              Clear filters
            </button>
          )}

        </div>

      </div>


      {/* =====================================================
          SIDEBAR + SERVICES
      ===================================================== */}

      <div
        className="
          mt-8
          grid
          gap-8
          lg:grid-cols-[260px_minmax(0,1fr)]
        "
      >

        {/* ===================================================
            STICKY SIDEBAR
        =================================================== */}

        <aside
          className="
            lg:sticky
            lg:top-0
            lg:h-screen
            lg:self-start
            lg:overflow-y-auto
            lg:pb-12
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-ink/10
              bg-white
              p-5
              shadow-soft
            "
          >

            {/* Sidebar heading */}

            <div className="mb-5 flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-sand
                "
              >
                <SlidersHorizontal
                  size={17}
                  className="text-ink/70"
                />
              </div>

              <div>

                <p className="font-black text-ink">
                  Filter Services
                </p>

                <p className="text-xs text-ink/45">
                  Select a category
                </p>

              </div>

            </div>


            {/* Category list */}

            <div className="space-y-1">

              {categories.map((item) => {

                const count =
                  getCategoryCount(item)

                const isActive =
                  category === item

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setCategory(item)
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-bold
                      transition-all

                      ${
                        isActive
                          ? 'bg-ink text-white'
                          : 'text-ink/65 hover:bg-sand hover:text-ink'
                      }
                    `}
                  >

                    <span className="truncate pr-3">
                      {item}
                    </span>

                    <span
                      className={`
                        shrink-0
                        rounded-full
                        px-2
                        py-0.5
                        text-[11px]

                        ${
                          isActive
                            ? 'bg-white/15 text-white'
                            : 'bg-sand text-ink/45'
                        }
                      `}
                    >
                      {count}
                    </span>

                  </button>
                )
              })}

            </div>

          </div>

        </aside>


        {/* ===================================================
            SERVICES CONTENT
        =================================================== */}

        <main className="min-w-0">

          {/* Current selection */}

          <div
            className="
              mb-6
              flex
              flex-wrap
              items-end
              justify-between
              gap-4
            "
          >

            <div>

              <p className="text-sm text-ink/45">
                {search
                  ? `Search results for "${search}"`
                  : 'Showing services'}
              </p>

              <h2 className="mt-1 text-2xl font-black text-ink">
                {category === 'All'
                  ? 'All Services'
                  : category}
              </h2>

            </div>


            <div
              className="
                rounded-full
                bg-sand
                px-4
                py-2
                text-sm
                font-bold
                text-ink/60
              "
            >
              {filteredServices.length} results
            </div>

          </div>


          {/* =================================================
              FILTERED SERVICES
          ================================================= */}

          {filteredServices.length > 0 ? (

            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >

              {filteredServices.map((service) => (

                <ServiceCard
                  key={service._id}
                  service={service}
                />

              ))}

            </div>

          ) : (

            /* =================================================
               NO RESULTS
            ================================================= */

            <div
              className="
                rounded-3xl
                border
                border-ink/10
                bg-white
                px-6
                py-20
                text-center
                shadow-soft
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-sand
                "
              >

                <Search
                  size={26}
                  className="text-ink/40"
                />

              </div>


              <h3 className="mt-5 text-xl font-black">
                No services found
              </h3>


              <p className="mx-auto mt-2 max-w-md text-sm text-ink/50">
                No services match your current search and
                category filter.
              </p>


              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-6
                  rounded-full
                  bg-ink
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                View all services
              </button>

            </div>

          )}

        </main>

      </div>

    </section>
  )
}