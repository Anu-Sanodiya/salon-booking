import {
  Clock,
  Home,
  MapPin,
  Star,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import type { Service } from '../servicesApi'


export function ServiceCard({
  service,
}: {
  service: Service
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-ink/10
        bg-white
        shadow-soft
        transition
        hover:-translate-y-1
      "
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative h-52 overflow-hidden">

        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-sand
              text-sm
              font-semibold
              text-ink/40
            "
          >
            No image available
          </div>
        )}

        {service.popular && (
          <span
            className="
              absolute
              left-4
              top-4
              rounded-full
              bg-gold
              px-3
              py-1
              text-xs
              font-black
              text-ink
            "
          >
            Popular
          </span>
        )}

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="p-5">

        {/* Category + Duration */}

        <div className="mb-2 flex items-center justify-between gap-2">

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-gold
            "
          >
            {service.category}
          </span>

          <span
            className="
              flex
              items-center
              gap-1
              text-xs
              font-semibold
              text-ink/55
            "
          >
            <Clock size={13} />

            {service.duration
              ? `${service.duration} min`
              : 'Timing on request'}
          </span>

        </div>


        {/* Service Name */}

        <h3 className="text-xl font-black">
          {service.name}
        </h3>


        {/* Description */}

        <p
          className="
            mt-2
            min-h-12
            text-sm
            leading-6
            text-ink/60
          "
        >
          {service.description}
        </p>


        {/* =================================================
            PRICING OPTIONS
        ================================================= */}

        {service.options && service.options.length > 0 && (
          <div
            className="
              mt-4
              rounded-2xl
              bg-sand
              p-3
            "
          >

            <p className="text-xs font-bold text-ink/55">
              Available options
            </p>

            <div className="mt-2 flex flex-wrap gap-2">

              {service.options.map((option) => (
                <span
                  key={option._id}
                  className="
                    rounded-full
                    bg-white
                    px-3
                    py-1
                    text-xs
                    font-bold
                  "
                >
                  {option.label}: ₹{option.salonPrice}
                </span>
              ))}

            </div>

          </div>
        )}


        {/* =================================================
            PRICES
        ================================================= */}

        <div className="mt-4 grid grid-cols-2 gap-2">

          {/* AT SALON */}

          <div className="rounded-2xl bg-sand p-3">

            <div
              className="
                flex
                items-center
                gap-1
                text-xs
                text-ink/50
              "
            >
              <MapPin size={13} />

              At salon
            </div>

            <p className="mt-1 text-lg font-black">
              ₹{service.salonPrice}
            </p>

          </div>


          {/* AT HOME */}

          <div className="rounded-2xl bg-sand p-3">

            <div
              className="
                flex
                items-center
                gap-1
                text-xs
                text-ink/50
              "
            >
              <Home size={13} />

              At home
            </div>

            {service.homeServiceAvailable &&
            service.homePrice !== null ? (
              <p className="mt-1 text-lg font-black">
                ₹{service.homePrice}
              </p>
            ) : (
              <p className="mt-1 text-sm font-black">
                Price on request
              </p>
            )}

          </div>

        </div>


        {/* =================================================
            BOOK BUTTON
        ================================================= */}

        <Link
          to={`/book/${service._id}`}
          className="btn-primary mt-4 w-full"
        >
          Book service

          <Star size={15} />
        </Link>

      </div>

    </article>
  )
}