'use client';

import ExpensesByCategory from '@/components/expenses-by-category';
import OverviewChart from '@/components/overview-chart';
import { useData } from '@/context/data-provider';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { isSameMonth } from 'date-fns';
import BalanceSummary from '@/components/balance-summary';

export default function StatsPage() {
  const { transactions } = useData();
  const router = useRouter();

  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter((t) => isSameMonth(t.date, now));
  }, [transactions]);

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
          Estadísticas
        </h1>
      </header>
      <main className="px-4 py-2 pb-8">
        <div>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
            Gráfico General
          </h2>
          <OverviewChart transactions={transactions} />
        </div>

        <div className="pt-5">
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Resumen del Mes
          </h2>
          <BalanceSummary transactions={currentMonthTransactions} />
        </div>

        <div className="pt-5">
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Gastos por Categoría
          </h2>
          <ExpensesByCategory transactions={currentMonthTransactions} />
        </div>
      </main>
    </div>
  );
}
