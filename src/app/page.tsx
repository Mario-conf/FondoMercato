'use client';

import BalanceSummary from '@/components/balance-summary';
import TransactionsList from '@/components/transactions-list';
import { useData } from '@/context/data-provider';

export default function DashboardPage() {
  const { transactions } = useData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center p-4 pb-2 justify-between">
        <div className="w-12"></div>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Inicio
        </h1>
        <div className="w-12"></div>
      </header>
      <main className="px-4 py-4">
        <BalanceSummary transactions={transactions} />
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
          Historial de Transacciones
        </h2>
        <TransactionsList transactions={transactions} />
      </main>
    </div>
  );
}
