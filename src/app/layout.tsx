import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "WCANX Finance",
  description: "Personal finance tracking app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
