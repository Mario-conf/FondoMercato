'use client';

import { useMemo } from 'react';
import type { Transaction } from '@/lib/types';

interface BalanceSummaryProps {
  transactions: Transaction[];
  title?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export default function BalanceSummary({ transactions, title = 'Balance Neto' }: BalanceSummaryProps) {
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
    <div>
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em]">{title}</h2>
      <h2 className="tracking-light text-center text-[28px] font-bold leading-tight py-5">{formatCurrency(total)}</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border">
          <p className="text-base font-medium leading-normal">Ingresos</p>
          <p className="tracking-light text-2xl font-bold leading-tight text-chart-1">{formatCurrency(income)}</p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border">
          <p className="text-base font-medium leading-normal">Gastos</p>
          <p className="tracking-light text-2xl font-bold leading-tight text-chart-2">{formatCurrency(expenses)}</p>
        </div>
      </div>
    </div>
  );
}
