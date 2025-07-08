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
  | 'Utilities'
  | 'Leisure'
  | 'Sport'
  | 'Healthcare'
  | 'Fashion'
  | 'Subscriptions'
  | 'Restaurants'
  | 'Other';

export const expenseCategories: ExpenseCategory[] = [
  'Groceries',
  'Transport',
  'Home',
  'Utilities',
  'Leisure',
  'Sport',
  'Healthcare',
  'Fashion',
  'Subscriptions',
  'Restaurants',
  'Other',
];
