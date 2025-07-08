import CategoriesList from '@/components/categories-list';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-center mb-8">
          CREA <span className="text-chart-4">CATEGORIAS</span>
        </h1>
        <CategoriesList />
      </main>
    </div>
  );
}
