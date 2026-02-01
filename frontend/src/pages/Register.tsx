import { useState } from "react";
import axios, { AxiosError } from "axios";
import { apiClient } from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string): boolean {
    // At least 6 characters, 1 uppercase, 1 number
    return password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
  }

  async function handleRegister() {
    setError("");

    // Frontend validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters with 1 uppercase letter and 1 number (e.g., Password1)");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post("/auth/register", { name, email, password, confirmPassword });
      // Don't login automatically, redirect to login page
      navigate("/login", { state: { message: "Registration successful! Please login with your credentials." } });
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }> | Error;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.response?.data?.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="John Doe"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="At least 6 chars, 1 uppercase, 1 number"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: Password1
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 font-medium"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
