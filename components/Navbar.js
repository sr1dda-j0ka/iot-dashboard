"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          
          <h1 className="font-extrabold text-2xl sm:text-3xl text-blue-950">
            SensorTrack
          </h1>

          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="font-semibold text-blue-600">Dashboard</Link>
            <Link href="/devices" className="font-semibold text-blue-600">Devices</Link>
            <Link href="/history" className="font-semibold text-blue-600">History</Link>
            <Link href="/ai-insights" className="font-semibold text-blue-600">AI Insights</Link>
          </div>
        </div>
      </div>

      
      <div className="md:hidden border-t px-4 py-2 flex gap-4 overflow-x-auto">
        <Link href="/dashboard" className="font-semibold text-blue-600">Dashboard</Link>
        <Link href="/devices" className="font-semibold text-blue-600">Devices</Link>
        <Link href="/history" className="font-semibold text-blue-600">History</Link>
        <Link href="/ai-insights" className="font-semibold text-blue-600">AI</Link>
      </div>
    </nav>
  );
}
