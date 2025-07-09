'use client';

import { Progress } from '@/components/ui/progress';
import { useData } from '@/context/data-provider';
import { isSameMonth, format } from 'date-fns';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function OverallBudget() {
  const {
    overallBudget,
    budgets,
    transactions,
    setOverallBudgetFormOpen,
  } = useData();
  const currentMonth = new Date();
  const monthKey = format(currentMonth, 'yyyy-MM');

  const userSetOverallBudget = overallBudget[monthKey];

  const categoryBudgetsTotal = budgets
    .filter((b) => b.month === monthKey)
    .reduce((sum, b) => sum + b.amount, 0);

  const totalBudget =
    typeof userSetOverallBudget === 'number'
      ? userSetOverallBudget
      : categoryBudgetsTotal;

  const spent = transactions
    .filter(
      (t) => t.type === 'expense' && isSameMonth(t.date, currentMonth)
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const progress = totalBudget > 0 ? (spent / totalBudget) * 100 : 0;

  const handleEdit = () => {
    setOverallBudgetFormOpen(true);
  };

  return (
    <button
      onClick={handleEdit}
      className="w-full text-left flex flex-col gap-3 rounded-xl hover:bg-accent/50 transition-colors p-4 bg-secondary"
    >
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
    </button>
  );
}
