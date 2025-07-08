export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: ExpenseCategory | 'Income';
};

export type ExpenseCategory =
  | 'Groceries'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Healthcare'
  | 'Other';

export const expenseCategories: ExpenseCategory[] = [
  'Groceries',
  'Transport',
  'Housing',
  'Entertainment',
  'Healthcare',
  'Other',
];
