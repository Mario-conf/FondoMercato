import Dashboard from '@/components/dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-center mb-8">
          GESTIONA TU <span className="text-chart-4">DINERO</span>
        </h1>
        <Dashboard />
      </main>
    </div>
  );
}
