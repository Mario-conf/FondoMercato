'use client';

import { useState } from 'react';
import type { Transaction } from '@/lib/types';
import Header from './header';
import OverviewChart from './overview-chart';
import TransactionsTable from './transactions-table';
import TransactionForm from './transaction-form';
import Budgets from './budgets';

const initialTransactions: Transaction[] = [
  { id: '1', date: new Date('2024-07-15'), description: 'Monthly Salary', amount: 5000, type: 'income', category: 'Income' },
  { id: '2', date: new Date('2024-07-20'), description: 'Groceries at Walmart', amount: 150.75, type: 'expense', category: 'Groceries' },
  { id: '3', date: new Date('2024-07-21'), description: 'Gasoline', amount: 45.50, type: 'expense', category: 'Transport' },
  { id: '4', date: new Date('2024-07-22'), description: 'Movie tickets', amount: 30.00, type: 'expense', category: 'Entertainment' },
  { id: '5', date: new Date('2024-07-01'), description: 'Rent', amount: 1200, type: 'expense', category: 'Housing' },
  { id: '6', date: new Date('2024-06-15'), description: 'June Salary', amount: 5000, type: 'income', category: 'Income' },
  { id: '7', date: new Date('2024-06-25'), description: 'Internet Bill', amount: 60, type: 'expense', category: 'Housing' },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions(prev => [newTransaction, ...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold font-headline text-center mb-4">FINANZAS PERSONALES</h2>
                <OverviewChart transactions={transactions} />
            </div>
            <div>
                <h2 className="text-3xl font-bold font-headline text-center mb-4">CONTROL DE GASTOS</h2>
                <TransactionsTable transactions={transactions} />
            </div>
            <Budgets />
        </div>
      </main>
      <TransactionForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} onAddTransaction={addTransaction} />
    </div>
  );
}
