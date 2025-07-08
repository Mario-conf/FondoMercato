import type { Transaction } from './types';

const TRANSACTIONS_KEY = 'fintrack_transactions';

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
