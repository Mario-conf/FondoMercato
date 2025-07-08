'use client';

import Budgets from '@/components/budgets';
import OverallBudget from '@/components/overall-budget';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BudgetsPage() {
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
          Presupuestos
        </h1>
      </header>
      <main className="p-4 space-y-8">
        <div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Presupuesto General
          </h2>
          <OverallBudget />
        </div>
        <div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Presupuestos por Categoría
          </h2>
          <Budgets />
        </div>
        <Button className="w-full h-12 text-base font-semibold">
          Crear Presupuesto
        </Button>
      </main>
    </div>
  );
}
