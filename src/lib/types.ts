export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: ExpenseCategory | 'Income';
};

export type ExpenseCategory =
  | 'Leisure'
  | 'Home'
  | 'Healthcare'
  | 'Fashion'
  | 'Utilities'
  | 'Groceries'
  | 'Sport'
  | 'Transport'
  | 'Investments'
  | 'Travel'
  | 'Gifts'
  | 'Other';

export const expenseCategories: ExpenseCategory[] = [
  'Leisure',
  'Home',
  'Healthcare',
  'Fashion',
  'Utilities',
  'Groceries',
  'Sport',
  'Transport',
  'Investments',
  'Travel',
  'Gifts',
  'Other',
];
