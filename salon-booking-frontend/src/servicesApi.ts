const API_URL = "http://localhost:5000/api/services";

export type PricingOption = {
  _id?: string;
  label: string;
  salonPrice: number;
  homePrice?: number | null;
};

export type Service = {
  _id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  salonPrice: number;
  homePrice: number | null;
  image: string;
  popular: boolean;
  homeServiceAvailable: boolean;
  isActive: boolean;
  options: PricingOption[];
};


/* =========================================================
   GET ALL SERVICES
========================================================= */

export async function getServices(): Promise<Service[]> {
  const response = await fetch(API_URL);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch services");
  }

  return result.data;
}


/* =========================================================
   GET SINGLE SERVICE
========================================================= */

export async function getService(id: string): Promise<Service> {
  const response = await fetch(`${API_URL}/${id}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch service");
  }

  return result.data;
}


/* =========================================================
   CREATE SERVICE
========================================================= */

export async function createService(data: {
  name: string;
  category: string;
  description?: string;
  duration?: number;
  salonPrice: number;
  homePrice?: number | null;
  image?: string;
  popular?: boolean;
  homeServiceAvailable?: boolean;
  isActive?: boolean;
  options?: PricingOption[];
}) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create service");
  }

  return result.data;
}


/* =========================================================
   UPDATE SERVICE
========================================================= */

export async function updateService(
  id: string,
  data: Partial<Service>
) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update service");
  }

  return result.data;
}


/* =========================================================
   DELETE SERVICE
========================================================= */

export async function deleteService(id: string) {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete service");
  }

  return result;
}