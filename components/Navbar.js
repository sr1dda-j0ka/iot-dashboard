import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex gap-6">
      <Link href="/dashboard" className="font-semibold text-blue-600">Dashboard</Link>
      <Link href="/devices" className="font-semibold text-blue-600">Devices</Link>
      <Link href="/history" className="font-semibold text-blue-600">History</Link>
      <Link href="/ai-insights" className="font-semibold text-blue-600">AI Insights</Link>
    </nav>
  );
}
