'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { Transaction, ExpenseCategory } from '@/lib/types';
import CategoryIcon from './category-icon';

interface ExpensesByCategoryProps {
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

export default function ExpensesByCategory({ transactions }: ExpensesByCategoryProps) {
  const expensesByCategory = useMemo(() => {
    const categoryMap: { [key in ExpenseCategory]?: { amount: number; count: number } } = {};

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const category = t.category as ExpenseCategory;
        if (!categoryMap[category]) {
          categoryMap[category] = { amount: 0, count: 0 };
        }
        categoryMap[category]!.amount += t.amount;
        categoryMap[category]!.count += 1;
      });

    return Object.entries(categoryMap)
      .map(([category, data]) => ({
        category: category as ExpenseCategory,
        amount: data.amount,
        count: data.count,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {expensesByCategory.length > 0 ? (
            expensesByCategory.map(({ category, amount, count }) => (
              <div key={category} className="flex items-center gap-4">
                <CategoryIcon category={category} />
                <div className="flex-1">
                  <p className="font-semibold">{category}</p>
                  <p className="text-xs text-muted-foreground">x{count}</p>
                </div>
                <div className="text-lg font-bold font-mono">{formatCurrency(amount)}</div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">No expenses to show.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
