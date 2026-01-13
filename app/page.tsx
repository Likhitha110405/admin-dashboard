import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg">
      <div className="container py-12 space-y-10">

        {/* Header */}
        <header className="space-y-2">
          <h1>Admin Dashboard</h1>
          <p>
            Control the behavior, personality, and access rules of your
            Discord AI agent.
          </p>
        </header>

        {/* Navigation cards */}
        <nav className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/system" className="card">
            <h2>System</h2>
            <p>Define the core instructions and rules for the AI.</p>
          </Link>

          <Link href="/personas" className="card">
            <h2>Personas</h2>
            <p>Switch between storytelling, technical, or legal personas.</p>
          </Link>

          <Link href="/allow-list" className="card">
            <h2>Allow List</h2>
            <p>Restrict which Discord channels the bot can reply in.</p>
          </Link>
        </nav>

      </div>
    </main>
  );
}
