'use client';

import ExpensesByCategory from '@/components/expenses-by-category';
import OverviewChart from '@/components/overview-chart';
import { useData } from '@/context/data-provider';

export default function StatsPage() {
  const { transactions } = useData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-center mb-8 md:text-5xl">
          CONTROLA TUS <span className="text-primary">GASTOS</span>
        </h1>
        <div className="space-y-8">
          <OverviewChart transactions={transactions} />
          <ExpensesByCategory transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
