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
  | 'Home'
  | 'Entertainment'
  | 'Healthcare'
  | 'Fashion'
  | 'Other';

export const expenseCategories: ExpenseCategory[] = [
  'Groceries',
  'Transport',
  'Home',
  'Entertainment',
  'Healthcare',
  'Fashion',
  'Other',
];
