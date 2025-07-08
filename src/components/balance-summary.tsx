import { useMemo } from 'react';
import type { Transaction } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BalanceSummaryProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return (
    new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value) + '$'
  );
};

export default function BalanceSummary({ transactions }: BalanceSummaryProps) {
  const { total, income, expenses } = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.income += t.amount;
        } else {
          acc.expenses += t.amount;
        }
        acc.total = acc.income - acc.expenses;
        return acc;
      },
      { total: 0, income: 0, expenses: 0 }
    );
  }, [transactions]);

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-6 text-center flex flex-col items-center">
        <p className="text-sm text-muted-foreground">Net Income</p>
        <p className="text-5xl font-bold font-headline tracking-tighter mt-1">
          {formatCurrency(total)}
        </p>
        <div className="flex gap-4 mt-2">
          <div className="text-green-400 font-semibold">
            {formatCurrency(income)}
          </div>
          <div className="text-red-400 font-semibold">
            {formatCurrency(expenses)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
