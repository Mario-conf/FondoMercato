import Budgets from '@/components/budgets';
import OverallBudget from '@/components/overall-budget';
import { Button } from '@/components/ui/button';

export default function BudgetsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-center mb-8">
          PLANIFICA TU <span className="text-accent">PRESUPUESTO</span>
        </h1>
        <div className="space-y-8">
          <OverallBudget />
          <Budgets />
          <Button variant="outline" className="w-full h-12 text-base font-semibold">
            Crear Nuevo Presupuesto
          </Button>
        </div>
      </main>
    </div>
  );
}
