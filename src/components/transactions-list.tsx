'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Transaction } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useData } from '@/context/data-provider';

interface TransactionsListProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatDate = (date: Date) => {
  return format(date, "d 'de' MMMM", { locale: es });
};

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  const { setTransactionFormOpen, setEditingTransaction } = useData();

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }, [transactions]);

  const handleEditClick = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setTransactionFormOpen(true);
  };

  return (
    <div className="space-y-0">
      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((t) => (
          <button
            key={t.id}
            onClick={() => handleEditClick(t)}
            className="w-full text-left flex items-center gap-4 min-h-[72px] py-2 justify-between border-b border-border/20 last:border-b-0 hover:bg-accent/50 transition-colors"
          >
            <div className="flex flex-col justify-center">
              <p className="text-base font-medium leading-normal line-clamp-1">{formatDate(t.date)}</p>
              <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2 capitalize">{t.description}</p>
            </div>
            <div className={cn("shrink-0 font-mono text-base font-normal leading-normal", t.type === 'income' ? 'text-chart-1' : 'text-foreground')}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(t.amount))}
            </div>
          </button>
        ))
      ) : (
        <div className="py-8 text-center text-muted-foreground rounded-xl bg-secondary/40">
          No hay transacciones para mostrar.
        </div>
      )}
    </div>
  );
}
