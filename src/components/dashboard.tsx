'use client';

import { useState } from 'react';
import type { Transaction } from '@/lib/types';
import BalanceSummary from './balance-summary';
import TransactionsList from './transactions-list';

const initialTransactions: Transaction[] = [
  { id: '1', date: new Date('2024-07-15T10:30:00'), description: 'Monthly Salary', amount: 8324, type: 'income', category: 'Income' },
  { id: '2', date: new Date(), description: 'Gasoline', amount: 90.00, type: 'expense', category: 'Transport' },
  { id: '3', date: new Date(), description: 'Electricity Bill', amount: 45.00, type: 'expense', category: 'Utilities' },
  { id: '4', date: new Date('2024-07-22T19:00:00'), description: 'Movie night', amount: 1850, type: 'income', category: 'Income' },
  { id: '5', date: new Date('2024-07-22T08:00:00'), description: 'Gym Membership', amount: 30, type: 'expense', category: 'Sport' },
  { id: '6', date: new Date('2024-07-21T14:00:00'), description: 'Rent', amount: 450, type: 'expense', category: 'Home' },
  { id: '7', date: new Date('2024-07-20T12:00:00'), description: 'Groceries', amount: 324, type: 'expense', category: 'Groceries' },
  { id: '8', date: new Date('2024-07-19T09:40:00'), description: 'Pharmacy', amount: 76, type: 'expense', category: 'Healthcare' },
  { id: '9', date: new Date('2024-06-15T10:30:00'), description: 'June Salary', amount: 6420, type: 'income', category: 'Income' },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  return (
    <div className="space-y-8 pb-8">
      <BalanceSummary transactions={transactions} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
