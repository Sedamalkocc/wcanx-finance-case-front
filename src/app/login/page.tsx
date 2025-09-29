"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowMessage(false);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("email", email);

      setSuccess("Login successful!");
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        router.push("/dashboard");
      }, 1800);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && showMessage && (
          <p className="text-green-500 transition-opacity duration-500 opacity-100">
            {success}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
