'use client';

import React, { useMemo } from 'react';
import type { Transaction, ExpenseCategory } from '@/lib/types';
import { Car, Home, MoreHorizontal, Shirt, ShoppingCart, TrendingUp, Lightbulb, Martini, Gamepad2, Pill, Landmark, Plane, Gift, Ticket, UtensilsCrossed } from 'lucide-react';


interface ExpensesByCategoryProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const iconMap: Record<ExpenseCategory | 'Ingresos', React.ElementType> = {
  Ocio: Ticket,
  Hogar: Home,
  Salud: Pill,
  Moda: Shirt,
  Servicios: Lightbulb,
  Comida: UtensilsCrossed,
  Deporte: Gamepad2,
  Transporte: Car,
  Inversiones: Landmark,
  Viajes: Plane,
  Regalos: Gift,
  Otros: MoreHorizontal,
  Ingresos: TrendingUp,
};

const CategoryIcon = ({ category }: { category: ExpenseCategory }) => {
    const Icon = iconMap[category] || MoreHorizontal;
    return <Icon className="h-6 w-6" />;
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
    <div className="space-y-0">
      {expensesByCategory.length > 0 ? (
        expensesByCategory.map(({ category, amount }) => (
          <div key={category} className="flex items-center gap-4 min-h-[72px] py-2">
            <div className="text-white flex items-center justify-center rounded-lg bg-accent shrink-0 size-12">
                <CategoryIcon category={category} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-base font-medium leading-normal line-clamp-1">{category}</p>
              <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2">{formatCurrency(amount)}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-muted-foreground">No hay gastos para mostrar.</div>
      )}
    </div>
  );
}
