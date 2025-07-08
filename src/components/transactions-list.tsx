import { useMemo } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import type { Transaction } from '@/lib/types';
import CategoryIcon from './category-icon';
import { cn } from '@/lib/utils';

interface TransactionsListProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatDateGroup = (date: Date) => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'E, MMM d');
};

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  const groupedTransactions = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    return sorted.reduce((acc, t) => {
      const dateKey = format(t.date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(t);
      return acc;
    }, {} as Record<string, Transaction[]>);
  }, [transactions]);

  const transactionEntries = Object.entries(groupedTransactions);

  return (
    <div className="space-y-6">
      {transactionEntries.length > 0 ? (
        transactionEntries.map(([dateStr, transactionsOnDay]) => (
          <div key={dateStr}>
            <h3 className="text-sm font-semibold text-muted-foreground my-2 px-1">
              {formatDateGroup(new Date(dateStr))}
            </h3>
            <div className="space-y-2">
              {transactionsOnDay.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm"
                >
                  <CategoryIcon category={t.category} />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {t.category === 'Income' ? t.description : t.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(t.date, 'p')}
                    </p>
                  </div>
                  <div className="font-mono font-semibold">
                    {t.type === 'expense' ? '-' : ''}
                    {formatCurrency(t.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-muted-foreground rounded-xl bg-card">
          No transactions to show.
        </div>
      )}
    </div>
  );
}
