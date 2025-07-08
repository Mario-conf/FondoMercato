'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { Transaction } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMemo } from 'react';

interface OverviewChartProps {
  transactions: Transaction[];
}

export default function OverviewChart({ transactions }: OverviewChartProps) {
  const data = useMemo(() => {
    const monthlyData: { [key: string]: { name: string, income: number; expense: number } } = {};
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    for (let i = 0; i < 6; i++) {
        const month = new Date(sixMonthsAgo);
        month.setMonth(sixMonthsAgo.getMonth() + i);
        const monthKey = month.toLocaleString('default', { month: 'short', year: '2-digit' });
        monthlyData[monthKey] = { name: monthKey.split(' ')[0], income: 0, expense: 0 };
    }

    transactions.forEach(t => {
        if (t.date >= sixMonthsAgo) {
            const monthKey = t.date.toLocaleString('default', { month: 'short', year: '2-digit' });
            if (monthlyData[monthKey]) {
                if (t.type === 'income') {
                    monthlyData[monthKey].income += t.amount;
                } else {
                    monthlyData[monthKey].expense += t.amount;
                }
            }
        }
    });

    return Object.values(monthlyData);
  }, [transactions]);


  return (
    <Card className="h-full">
      <CardHeader>
      </CardHeader>
      <CardContent className="h-[280px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                cursor={{ fill: 'hsl(var(--secondary))' }}
              />
              <Legend wrapperStyle={{fontSize: "12px"}}/>
              <Bar dataKey="income" fill="hsl(var(--chart-1))" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="hsl(var(--chart-2))" name="Expense" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Not enough data to display chart.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
