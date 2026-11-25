// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// import { Layout } from './components/Layout'

// import { Home } from './pages/Home'
// import { Services } from './pages/Services'
// import { Booking } from './pages/Booking'
// import { Payment } from './pages/Payment'
// import { Support } from './pages/Support'
// import { Bookings } from './pages/Bookings'

// import { Admin } from './pages/Admin'
// import { AdminLogin } from './pages/adminLogin'
// import { AdminRegister } from './pages/adminRegister'

// import { ProtectedAdminRoute } from './routs/ProtectedRoutes'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =========================
//             CUSTOMER ROUTES
//         ========================= */}

//         <Route element={<Layout />}>
//           <Route path="/" element={<Home />} />

//           <Route path="/services" element={<Services />} />

//           <Route
//             path="/book/:id"
//             element={<Booking />}
//           />

//           <Route
//             path="/payment"
//             element={<Payment />}
//           />

//           <Route
//             path="/support"
//             element={<Support />}
//           />

//           <Route
//             path="/bookings"
//             element={<Bookings />}
//           />
//         </Route>


//         {/* =========================
//             ADMIN AUTH
//         ========================= */}

//         <Route
//           path="/admin/login"
//           element={<AdminLogin />}
//         />

//         <Route
//           path="/admin/register"
//           element={<AdminRegister />}
//         />


//         {/* =========================
//             PROTECTED ADMIN
//         ========================= */}

//         <Route element={<ProtectedAdminRoute />}>
//           <Route
//             path="/admin"
//             element={<Admin />}
//           />
//         </Route>


//         {/* =========================
//             FALLBACK
//         ========================= */}

//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App










import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Layout } from "./components/Layout";

import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Booking } from "./pages/Booking";
import { Payment } from "./pages/Payment";
import { Support } from "./pages/Support";
import { Bookings } from "./pages/Bookings";

import { Admin } from "./pages/Admin";
import { AdminLogin } from "./pages/adminLogin";
import { AdminRegister } from "./pages/adminRegister";

import { ProtectedAdminRoute } from "./routs/ProtectedRoutes";

import { CustomerLogin } from "./pages/customerLogin";
import { CustomerRegister } from "./pages/customerRegister";
import { CustomerProtectedRoute } from "./routs/CustomerProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==============================
            PUBLIC CUSTOMER PAGES
        ============================== */}

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/book/:id"
            element={<Booking />}
          />

          <Route
            path="/support"
            element={<Support />}
          />

        </Route>


        {/* ==============================
            CUSTOMER AUTH
        ============================== */}

        <Route
          path="/login"
          element={<CustomerLogin />}
        />

        <Route
          path="/register"
          element={<CustomerRegister />}
        />


        {/* ==============================
            CUSTOMER PROTECTED PAGES
        ============================== */}

        <Route element={<CustomerProtectedRoute />}>

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/bookings"
            element={<Bookings />}
          />

        </Route>


        {/* ==============================
            ADMIN
        ============================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/register"
          element={<AdminRegister />}
        />

        <Route element={<ProtectedAdminRoute />}>

          <Route
            path="/admin"
            element={<Admin />}
          />

        </Route>


        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;