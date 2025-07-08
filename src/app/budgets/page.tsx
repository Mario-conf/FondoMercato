'use client';

import Budgets from '@/components/budgets';
import OverallBudget from '@/components/overall-budget';
import { Button } from '@/components/ui/button';

export default function BudgetsPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
       <header className="flex items-center p-4 pb-2 justify-center">
            <h1 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Presupuestos
            </h1>
        </header>
      <main className="p-4 space-y-8">
        <div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">Presupuesto General</h2>
            <OverallBudget />
        </div>
        <div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">Presupuestos por Categoría</h2>
            <Budgets />
        </div>
        <Button className="w-full h-12 text-base font-semibold">
            Crear Presupuesto
        </Button>
      </main>
    </div>
  );
}
