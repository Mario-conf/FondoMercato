
import { expenseCategories as defaultExpenseCategories, incomeCategories as defaultIncomeCategories } from './types';
import type { Transaction } from './types';

const TRANSACTIONS_KEY = 'fintrack_transactions';
const EXPENSE_CATEGORIES_KEY = 'fintrack_expense_categories';
const INCOME_CATEGORIES_KEY = 'fintrack_income_categories';

// This function acts as a separation layer. In the future, this could
// be replaced with an API call to a MySQL database.

/**
 * Saves transactions to localStorage.
 * @param transactions - The array of transactions to save.
 */
export const saveTransactions = (transactions: Transaction[]): void => {
  if (typeof window !== 'undefined') {
    try {
      const data = JSON.stringify(transactions);
      window.localStorage.setItem(TRANSACTIONS_KEY, data);
    } catch (error) {
      console.error('Failed to save transactions to localStorage:', error);
    }
  }
};

/**
 * Retrieves transactions from localStorage.
 * @returns An array of transactions.
 */
export const getTransactions = (): Transaction[] => {
  if (typeof window !== 'undefined') {
    try {
      const data = window.localStorage.getItem(TRANSACTIONS_KEY);
      if (data) {
        const parsedData = JSON.parse(data) as any[];
        // Revive date strings into Date objects
        return parsedData.map(tx => ({
          ...tx,
          date: new Date(tx.date),
        }));
      }
    } catch (error) {
      console.error('Failed to get transactions from localStorage:', error);
      return [];
    }
  }
  return [];
};


// Functions for Expense Categories
export const saveExpenseCategories = (categories: string[]): void => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(EXPENSE_CATEGORIES_KEY, JSON.stringify(categories));
    }
};

export const getExpenseCategories = (): string[] => {
    if (typeof window !== 'undefined') {
        const data = window.localStorage.getItem(EXPENSE_CATEGORIES_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            // Initialize with default if not present
            saveExpenseCategories(defaultExpenseCategories);
            return defaultExpenseCategories;
        }
    }
    return defaultExpenseCategories;
};

// Functions for Income Categories
export const saveIncomeCategories = (categories: string[]): void => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(INCOME_CATEGORIES_KEY, JSON.stringify(categories));
    }
};

export const getIncomeCategories = (): string[] => {
    if (typeof window !== 'undefined') {
        const data = window.localStorage.getItem(INCOME_CATEGORIES_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            // Initialize with default if not present
            saveIncomeCategories(defaultIncomeCategories);
            return defaultIncomeCategories;
        }
    }
    return defaultIncomeCategories;
};
