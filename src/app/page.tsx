import Dashboard from '@/components/dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          CONTROLA TUS <span className="text-chart-4">GASTOS</span>
        </h1>
      </header>
      <main className="mx-auto max-w-3xl px-4">
        <Dashboard />
      </main>
    </div>
  );
}
