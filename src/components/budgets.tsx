'use client';

import CategoryIcon from './category-icon';
import type { ExpenseCategory } from '@/lib/types';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
};

// This data is currently static and for demonstration purposes.
// It will be replaced with dynamic data from the DataProvider context.
const budgetData: { category: ExpenseCategory; spent: number; total: number }[] = [];


export default function Budgets() {
  return (
    <div className="space-y-0">
      {budgetData.length > 0 ? (
          budgetData.map((budget, index) => (
            <div key={index} className="flex items-center gap-4 min-h-[72px] py-2">
                <CategoryIcon category={budget.category} />
                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-base font-medium leading-normal line-clamp-1">{budget.category}</p>
                    <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.total)}
                    </p>
                </div>
            </div>
          ))
      ) : (
         <div className="py-8 text-center text-muted-foreground rounded-xl bg-secondary">
            No se han creado presupuestos.
         </div>
      )}
    </div>
  );
}
