const API_URL = "http://localhost:5000/api";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER";
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    customer: Customer;
    token: string;
  };
};


export async function registerCustomer(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Registration failed"
    );
  }

  localStorage.setItem(
    "customerToken",
    result.data.token
  );

  localStorage.setItem(
    "customer",
    JSON.stringify(result.data.customer)
  );

  return result.data;
}


export async function loginCustomer(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Login failed"
    );
  }

  localStorage.setItem(
    "customerToken",
    result.data.token
  );

  localStorage.setItem(
    "customer",
    JSON.stringify(result.data.customer)
  );

  return result.data;
}


export function getCustomerToken() {
  return localStorage.getItem("customerToken");
}


export function getCustomer(): Customer | null {
  const customer = localStorage.getItem("customer");

  if (!customer) {
    return null;
  }

  try {
    return JSON.parse(customer);
  } catch {
    return null;
  }
}


export function isCustomerLoggedIn() {
  return Boolean(
    localStorage.getItem("customerToken")
  );
}


export function logoutCustomer() {
  localStorage.removeItem("customerToken");
  localStorage.removeItem("customer");
}


export async function getCustomerProfile() {
  const token = getCustomerToken();

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unable to fetch profile"
    );
  }

  return result.data as Customer;
}