const API_URL = "http://localhost:5000/api/staff";

export type StaffAvailability =
  | "AVAILABLE"
  | "BUSY"
  | "OFF";

export type Staff = {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  availability: StaffAvailability;
  services: string[];
  isActive: boolean;
};


// ==================================================
// ADMIN AUTH HEADERS
// ==================================================

function adminHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


// ==================================================
// GET ALL ACTIVE STAFF
// ADMIN
// Returns AVAILABLE + BUSY + OFF
// ==================================================

export async function getStaff() {
  const response = await fetch(API_URL);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch staff"
    );
  }

  return result.data as Staff[];
}


// ==================================================
// GET AVAILABLE STAFF
// CUSTOMER
// Returns only AVAILABLE staff
// ==================================================

export async function getAvailableStaff() {
  const response = await fetch(
    `${API_URL}/available`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to fetch available staff"
    );
  }

  return result.data as Staff[];
}


// ==================================================
// CREATE STAFF
// ADMIN
// ==================================================

export async function createStaff(data: {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  image?: string;
  rating?: number;
  availability?: StaffAvailability;
  services?: string[];
}) {
  const response = await fetch(
    API_URL,
    {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to create staff"
    );
  }

  return result.data as Staff;
}


// ==================================================
// UPDATE STAFF
// ADMIN
// ==================================================

export async function updateStaff(
  id: string,
  data: Partial<Staff>
) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to update staff"
    );
  }

  return result.data as Staff;
}


// ==================================================
// UPDATE AVAILABILITY
// ADMIN
// ==================================================

export async function updateStaffAvailability(
  id: string,
  availability: StaffAvailability
) {
  const response = await fetch(
    `${API_URL}/${id}/availability`,
    {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({
        availability,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to update availability"
    );
  }

  return result.data as Staff;
}


// ==================================================
// DELETE STAFF
// ADMIN
// ==================================================

export async function deleteStaff(
  id: string
) {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
      headers: adminHeaders(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to delete staff"
    );
  }

  return result;
}