import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <nav className="space-x-4">
        <Link href="/System">System</Link>
        <Link href="/personas">Personas</Link>
        <Link href="/allow-list">Allow List</Link>
      </nav>
    </main>
  );
}
