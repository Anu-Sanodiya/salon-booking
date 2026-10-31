import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../adminApi";

export function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await adminLogin({
        email,
        password,
      });

      const { token, user } = result.data;

      // Extra frontend check
      if (user.role !== "ADMIN") {
        throw new Error(
          "You are not authorized to access admin panel"
        );
      }

      localStorage.setItem(
        "adminToken",
        token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(user)
      );

      navigate("/admin");
    } catch (error: any) {
      setError(
        error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="w-full max-w-md surface p-8">
        <h1 className="text-3xl font-black">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-ink/50">
          Sign in to manage the salon.
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border p-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ink px-4 py-3 font-bold text-white disabled:opacity-50"
          >
            {loading
              ? "Signing in..."
              : "Admin Login"}
          </button>
        </form>
      </div>
    </div>
  );
}