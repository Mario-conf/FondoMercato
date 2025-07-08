'use client';

import BalanceSummary from '@/components/balance-summary';
import TransactionsList from '@/components/transactions-list';
import { useData } from '@/context/data-provider';

export default function DashboardPage() {
  const { transactions } = useData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-center mb-4 md:text-5xl">
          GESTIONA TU <span className="text-primary">DINERO</span>
        </h1>
        <BalanceSummary transactions={transactions} />
        <TransactionsList transactions={transactions} />
      </main>
    </div>
  );
}
