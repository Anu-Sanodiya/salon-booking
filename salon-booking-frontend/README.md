# CUTS & CO. — Men's Salon Frontend

A responsive React + Vite + TypeScript + Tailwind CSS frontend for a men's salon booking platform.

## Included screens

- Home page
- Service catalog with search and category filters
- Service booking flow with salon/home pricing
- Staff selection
- Demo payment checkout
- Support chat UI
- My bookings page
- Admin dashboard with overview, appointments, services, staff and messages tabs

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Notes

- The app currently uses mock data.
- The booking draft is stored in `sessionStorage` only for demo purposes.
- The payment action is simulated and does not charge real money.
- Replace the mock data and connect the UI to your Flask APIs.

## Suggested next backend endpoints

- `GET /api/services`
- `GET /api/services/:id`
- `GET /api/appointments/availability`
- `POST /api/appointments`
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
- `GET /api/bookings/me`
- `GET /api/conversations`
- WebSocket events for support chat
