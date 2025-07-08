'use client';

import { useState } from 'react';
import type { Transaction } from '@/lib/types';
import Header from './header';
import SummaryCard from './summary-card';
import OverviewChart from './overview-chart';
import TransactionsTable from './transactions-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import TransactionForm from './transaction-form';

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

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <Button onClick={() => setIsFormOpen(true)} className="bg-accent hover:bg-accent/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard title="Total Income" amount={totalIncome} icon={TrendingUp} color="text-green-400" />
          <SummaryCard title="Total Expenses" amount={totalExpenses} icon={TrendingDown} color="text-red-400" />
          <SummaryCard title="Net Income" amount={netIncome} icon={Wallet} color={netIncome >= 0 ? "text-blue-400" : "text-orange-400"} />
        </div>

        <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
                <TransactionsTable transactions={transactions.slice(0, 10)} />
            </div>
            <div className="md:col-span-2">
                <OverviewChart transactions={transactions} />
            </div>
        </div>
      </main>
      <TransactionForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} onAddTransaction={addTransaction} />
    </div>
  );
}
