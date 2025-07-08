'use client';

import CategoryIcon from './category-icon';
import { Progress } from './ui/progress';
import { useData } from '@/context/data-provider';
import type { Budget } from '@/lib/types';
import { isSameMonth } from 'date-fns';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Budgets() {
  const {
    budgets,
    transactions,
    setEditingBudget,
    setBudgetFormOpen,
  } = useData();

  // Filter budgets for the current month
  const currentMonth = new Date();
  const monthlyBudgets = budgets.filter((b) =>
    b.month === `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}`
  );

  const budgetData = monthlyBudgets.map((budget) => {
    const spent = transactions
      .filter(
        (t) =>
          t.type === 'expense' &&
          t.category === budget.category &&
          isSameMonth(t.date, currentMonth)
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      ...budget,
      spent,
      progress: budget.amount > 0 ? (spent / budget.amount) * 100 : 0,
    };
  });

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setBudgetFormOpen(true);
  };

  return (
    <div className="space-y-4">
      {budgetData.length > 0 ? (
        budgetData.map((budget) => (
          <button
            key={budget.id}
            onClick={() => handleEdit(budget)}
            className="w-full text-left flex items-center gap-4 min-h-[72px] py-2 hover:bg-accent/50 rounded-lg p-2 transition-colors"
          >
            <CategoryIcon category={budget.category} />
            <div className="flex-1 flex flex-col justify-center gap-2">
              <div className="flex justify-between items-center">
                <p className="text-base font-medium leading-normal line-clamp-1">
                  {budget.category}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">
                    {formatCurrency(budget.spent)}
                  </span>
                  {' / '}
                  {formatCurrency(budget.amount)}
                </p>
              </div>
              <Progress value={budget.progress} className="h-2 bg-accent" />
            </div>
          </button>
        ))
      ) : (
        <div className="py-8 text-center text-muted-foreground rounded-xl bg-secondary">
          No se han creado presupuestos.
        </div>
      )}
    </div>
  );
}
