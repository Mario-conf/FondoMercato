'use client';

import React, { useMemo } from 'react';
import type { Transaction } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface OverviewChartProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
};

const formatFullCurrency = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export default function OverviewChart({ transactions }: OverviewChartProps) {
  const chartData = useMemo(() => {
    const monthlyData: { [key: string]: { income: number; expense: number } } =
      {};
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    for (let i = 0; i < 6; i++) {
      const date = new Date(sixMonthsAgo);
      date.setMonth(date.getMonth() + i);
      const monthKey = format(date, 'MMM', { locale: es });
      monthlyData[monthKey] = { income: 0, expense: 0 };
    }

    transactions.forEach((t) => {
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
    });

    return Object.entries(monthlyData).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      ingresos: data.income,
      gastos: data.expense,
    }));
  }, [transactions]);

  const chartConfig = {
    ingresos: {
      label: 'Ingresos',
      color: 'hsl(var(--chart-1))',
    },
    gastos: {
      label: 'Gastos',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  return (
    <div className="rounded-xl bg-secondary p-4">
      <div className="flex flex-col gap-1 pb-4">
        <p className="text-base font-medium leading-normal">
          Ingresos vs. Gastos
        </p>
        <p className="text-muted-foreground text-sm font-normal leading-normal">
          Últimos 6 meses
        </p>
      </div>

      {transactions.length > 0 ? (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => formatCurrency(value as number)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatFullCurrency(value as number)}
                />
              }
            />
            <Bar dataKey="ingresos" fill="var(--color-ingresos)" radius={4} />
            <Bar dataKey="gastos" fill="var(--color-gastos)" radius={4} />
          </BarChart>
        </ChartContainer>
      ) : (
        <div className="flex h-[200px] items-center justify-center text-muted-foreground rounded-lg bg-accent">
          No hay datos para mostrar el gráfico.
        </div>
      )}
    </div>
  );
}
