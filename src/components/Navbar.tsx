"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/dashboard" className="flex-shrink-0 font-bold text-xl">
            FinanceApp
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/transactions" className="hover:text-indigo-200">Transactions</Link>
            <Link href="/categories" className="hover:text-indigo-200">Categories</Link>
            <Link href="/profile" className="hover:text-indigo-200">Profile</Link>
            <Link href="/analysis" className="hover:text-indigo-200">Analysis</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-600 px-2 pt-2 pb-4 space-y-1">
          <Link href="/transactions" className="block px-3 py-2 rounded hover:bg-indigo-500">Transactions</Link>
          <Link href="/categories" className="block px-3 py-2 rounded hover:bg-indigo-500">Categories</Link>
          <Link href="/profile" className="block px-3 py-2 rounded hover:bg-indigo-500">Profile</Link>
          <Link href="/analysis" className="block px-3 py-2 rounded hover:bg-indigo-500">Analysis</Link>
        </div>
      )}
    </nav>
  );
}
