'use client';

import { useState } from 'react';
import type { Transaction } from '@/lib/types';
import OverviewChart from './overview-chart';
import ExpensesByCategory from './expenses-by-category';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const initialTransactions: Transaction[] = [
  { id: '1', date: new Date('2024-07-15'), description: 'Monthly Salary', amount: 5000, type: 'income', category: 'Income' },
  { id: '2', date: new Date('2024-07-20'), description: 'Groceries at Walmart', amount: 150.75, type: 'expense', category: 'Groceries' },
  { id: '3', date: new Date('2024-07-21'), description: 'Gasoline', amount: 45.50, type: 'expense', category: 'Transport' },
  { id: '4', date: new Date('2024-07-22'), description: 'Movie tickets', amount: 30.00, type: 'expense', category: 'Entertainment' },
  { id: '5', date: new Date('2024-07-01'), description: 'Rent', amount: 1200, type: 'expense', category: 'Home' },
  { id: '6', date: new Date('2024-06-15'), description: 'June Salary', amount: 5000, type: 'income', category: 'Income' },
  { id: '7', date: new Date('2024-06-25'), description: 'Internet Bill', amount: 60, type: 'expense', category: 'Home' },
  { id: '8', date: new Date('2024-07-18'), description: 'T-shirt', amount: 25.00, type: 'expense', category: 'Fashion' },
  { id: '9', date: new Date('2024-07-19'), description: 'Jeans', amount: 70.00, type: 'expense', category: 'Fashion' },
  { id: '10', date: new Date('2024-07-05'), description: 'Doctor visit', amount: 150.00, type: 'expense', category: 'Healthcare' },
  { id: '11', date: new Date('2024-07-10'), description: 'Pharmacy', amount: 36.00, type: 'expense', category: 'Healthcare' },
  { id: '12', date: new Date('2024-07-12'), description: 'Wegmans Groceries', amount: 192.43, type: 'expense', category: 'Groceries' },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  return (
    <div className="space-y-8 pb-8">
      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewChart transactions={transactions} />
        </CardContent>
      </Card>
      <ExpensesByCategory transactions={transactions} />
    </div>
  );
}
