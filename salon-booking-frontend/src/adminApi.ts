const API_URL = "http://localhost:5000/api";

export async function adminRegister(data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  adminKey: string;
}) {
  const response = await fetch(
    `${API_URL}/admin/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Registration failed"
    );
  }

  return result;
}


export async function adminLogin(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${API_URL}/admin/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Login failed"
    );
  }

  return result;
}


export async function getAdminProfile() {
  const token = localStorage.getItem(
    "adminToken"
  );

  const response = await fetch(
    `${API_URL}/admin/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Unauthorized"
    );
  }

  return result;
}