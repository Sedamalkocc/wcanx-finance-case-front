"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center">
      <section className="w-full max-w-lg backdrop-blur-sm p-10 rounded-3xl shadow-xl text-center bg-white/70">
        <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
          💰 WCANX Finance
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Track your income & expenses effortlessly ✨
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-indigo-600 text-white py-3 px-5 rounded-xl font-medium hover:bg-indigo-700 hover:scale-105 transition transform shadow-md"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="w-full bg-gray-100 text-gray-800 py-3 px-5 rounded-xl font-medium hover:bg-gray-200 hover:scale-105 transition transform shadow-sm"
          >
            Register
          </button>
        </div>
      </section>
    </div>
  );
}
