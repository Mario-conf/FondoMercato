'use client';

import React, { useMemo } from 'react';
import type { Transaction } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface OverviewChartProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function OverviewChart({ transactions }: OverviewChartProps) {
  const { chartData, totalNet } = useMemo(() => {
    const monthlyData: { [key: string]: { income: number; expense: number } } = {};
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    // Initialize months
    for (let i = 0; i < 6; i++) {
      const date = new Date(sixMonthsAgo);
      date.setMonth(date.getMonth() + i);
      const monthKey = format(date, 'MMM', { locale: es });
      monthlyData[monthKey] = { income: 0, expense: 0 };
    }
    
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(t => {
      // Ensure t.date is a valid Date object before processing
      if (t.date && t.date >= sixMonthsAgo) {
        const monthKey = format(t.date, 'MMM', { locale: es });
        if (monthlyData[monthKey]) {
          if (t.type === 'income') {
            monthlyData[monthKey].income += t.amount;
          } else {
            monthlyData[monthKey].expense += t.amount;
          }
        }
      }
      if (t.type === 'income') totalIncome += t.amount;
      else totalExpenses += t.amount;
    });

    const maxVal = Math.max(...Object.values(monthlyData).map(d => d.income), 1);

    const chartData = Object.entries(monthlyData).map(([name, data]) => ({
      name,
      height: `${Math.max(10, (data.income / maxVal) * 100)}%`, // Using income for bar height as per mockup style
    }));

    return { chartData, totalNet: totalIncome - totalExpenses };
  }, [transactions]);


  return (
    <div className="flex flex-wrap gap-4 py-6">
      <div className="flex min-w-72 flex-1 flex-col gap-2">
        <p className="text-base font-medium leading-normal">Ingresos vs. Gastos</p>
        <p className="tracking-light text-[32px] font-bold leading-tight truncate">{formatCurrency(totalNet)}</p>
        <p className="text-muted-foreground text-base font-normal leading-normal">Últimos 6 meses</p>

        {chartData.length > 0 ? (
          <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3 pt-4">
            {chartData.map((item, index) => (
              <React.Fragment key={index}>
                <div className="w-full flex items-end justify-center">
                  <div
                    className="w-4/5 bg-accent"
                    style={{ height: item.height, borderTop: '2px solid hsl(var(--muted-foreground))' }}
                  ></div>
                </div>
                <p className="text-muted-foreground text-[13px] font-bold leading-normal tracking-[0.015em] capitalize">{item.name}</p>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex h-[180px] items-center justify-center text-muted-foreground">
            No hay suficientes datos para mostrar el gráfico.
          </div>
        )}
      </div>
    </div>
  );
}
