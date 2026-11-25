import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isCustomerLoggedIn } from "../cutomerAuthApi"

export function CustomerProtectedRoute() {
  const location = useLocation();

  if (!isCustomerLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectTo:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  return <Outlet />;
}