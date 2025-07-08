'use client';

import CategoriesList from '@/components/categories-list';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center p-4 pb-2 justify-between">
        <button
          onClick={() => router.back()}
          className="flex size-12 shrink-0 items-center justify-start -ml-2 p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Categorías
        </h1>
      </header>
      <main className="mx-auto max-w-lg px-4 py-4">
        <CategoriesList />
      </main>
    </div>
  );
}
