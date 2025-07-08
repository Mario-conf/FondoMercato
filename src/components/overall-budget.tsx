'use client';

import { Progress } from '@/components/ui/progress';
import { useData } from '@/context/data-provider';
import { isSameMonth } from 'date-fns';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function OverallBudget() {
  const { budgets, transactions } = useData();
  const currentMonth = new Date();

  const totalBudget = budgets
    .filter((b) => b.month === `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}`)
    .reduce((sum, b) => sum + b.amount, 0);

  const spent = transactions
    .filter(
      (t) => t.type === 'expense' && isSameMonth(t.date, currentMonth)
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const progress = totalBudget > 0 ? (spent / totalBudget) * 100 : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-6 justify-between items-center">
        <p className="text-base font-medium leading-normal">
          Restante este Mes
        </p>
        <p className="text-sm font-normal leading-normal text-muted-foreground">
          <span className="font-bold text-foreground text-base">
            {formatCurrency(totalBudget - spent)}
          </span>
          {' de '}
          {formatCurrency(totalBudget)}
        </p>
      </div>
      <Progress value={progress} className="h-2 bg-accent" />
    </div>
  );
}
