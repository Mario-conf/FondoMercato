
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Transaction } from '@/lib/types';
import * as storage from '@/lib/storage';
import TransactionForm from '@/components/transaction-form';

// Define the shape of the context data
interface DataContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  isTransactionFormOpen: boolean;
  setTransactionFormOpen: (isOpen: boolean) => void;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create the provider component
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionFormOpen, setTransactionFormOpen] = useState(false);

  // Load initial data from localStorage when the component mounts
  useEffect(() => {
    setTransactions(storage.getTransactions());
  }, []);

  // Function to add a new transaction
  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id'>) => {
    // Ensure date is a Date object
    const transactionWithDateObject = {
      ...transactionData,
      date: new Date(transactionData.date),
    };
    
    const newTransaction = { ...transactionWithDateObject, id: new Date().toISOString() + Math.random() };
    const updatedTransactions = [...transactions, newTransaction];
    
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions]);


  // The value that will be supplied to any descendants of this provider
  const value = {
    transactions,
    addTransaction,
    isTransactionFormOpen,
    setTransactionFormOpen,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
      <TransactionForm
        isOpen={isTransactionFormOpen}
        onOpenChange={setTransactionFormOpen}
        onAddTransaction={addTransaction}
      />
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
