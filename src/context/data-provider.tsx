'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Transaction, ExpenseCategory } from '@/lib/types';
import * as storage from '@/lib/storage';

interface DataContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  isTransactionFormOpen: boolean;
  setTransactionFormOpen: (isOpen: boolean) => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (transaction: Transaction | null) => void;
  expenseCategories: string[];
  incomeCategories: string[];
  addExpenseCategory: (name: string) => void;
  updateExpenseCategory: (oldName: string, newName: string) => void;
  deleteExpenseCategory: (name: string) => void;
  addIncomeCategory: (name: string) => void;
  updateIncomeCategory: (oldName: string, newName: string) => void;
  deleteIncomeCategory: (name: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTransactionFormOpen, setTransactionFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);

  useEffect(() => {
    setTransactions(storage.getTransactions());
    setExpenseCategories(storage.getExpenseCategories());
    setIncomeCategories(storage.getIncomeCategories());
  }, []);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id'>) => {
    const transactionWithDateObject = {
      ...transactionData,
      date: new Date(transactionData.date),
    };
    
    const newTransaction = { ...transactionWithDateObject, id: new Date().toISOString() + Math.random() };
    const updatedTransactions = [...transactions, newTransaction];
    
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions]);
  
  const updateTransaction = useCallback((id: string, transactionData: Omit<Transaction, 'id'>) => {
    const transactionWithDateObject = {
      ...transactionData,
      date: new Date(transactionData.date),
    };
    
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { id, ...transactionWithDateObject } : t
    );
    
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions]);
  
  const deleteTransaction = useCallback((id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions]);

  const addExpenseCategory = useCallback((name: string) => {
    if (expenseCategories.includes(name)) return;
    const updatedCategories = [...expenseCategories, name];
    setExpenseCategories(updatedCategories);
    storage.saveExpenseCategories(updatedCategories);
  }, [expenseCategories]);

  const updateExpenseCategory = useCallback((oldName: string, newName: string) => {
    const updatedCategories = expenseCategories.map(c => c === oldName ? newName : c);
    setExpenseCategories(updatedCategories);
    storage.saveExpenseCategories(updatedCategories);

    const updatedTransactions = transactions.map(t => {
      if (t.category === oldName) {
        return { ...t, category: newName as ExpenseCategory };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions, expenseCategories]);

  const deleteExpenseCategory = useCallback((name: string) => {
    const updatedCategories = expenseCategories.filter(c => c !== name);
    setExpenseCategories(updatedCategories);
    storage.saveExpenseCategories(updatedCategories);

    const updatedTransactions = transactions.map(t => {
      if (t.category === name) {
        return { ...t, category: 'Otros' };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions, expenseCategories]);

  const addIncomeCategory = useCallback((name: string) => {
    if (incomeCategories.includes(name)) return;
    const updatedCategories = [...incomeCategories, name];
    setIncomeCategories(updatedCategories);
    storage.saveIncomeCategories(updatedCategories);
  }, [incomeCategories]);

  const updateIncomeCategory = useCallback((oldName: string, newName: string) => {
    const updatedCategories = incomeCategories.map(c => (c === oldName ? newName : c));
    setIncomeCategories(updatedCategories);
    storage.saveIncomeCategories(updatedCategories);

    const updatedTransactions = transactions.map(t => {
      if (t.type === 'income' && t.category === oldName) {
        return { ...t, category: newName };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions, incomeCategories]);

  const deleteIncomeCategory = useCallback((name: string) => {
    const updatedCategories = incomeCategories.filter(c => c !== name);
    setIncomeCategories(updatedCategories);
    storage.saveIncomeCategories(updatedCategories);

    const updatedTransactions = transactions.map(t => {
      if (t.type === 'income' && t.category === name) {
        return { ...t, category: 'Otros Ingresos' };
      }
      return t;
    });
    setTransactions(updatedTransactions);
    storage.saveTransactions(updatedTransactions);
  }, [transactions, incomeCategories]);

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    isTransactionFormOpen,
    setTransactionFormOpen,
    editingTransaction,
    setEditingTransaction,
    expenseCategories,
    incomeCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
