export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
};

export type ExpenseCategory = string;

export const expenseCategories: ExpenseCategory[] = [
  'Ocio',
  'Hogar',
  'Salud',
  'Moda',
  'Servicios',
  'Comida',
  'Deporte',
  'Transporte',
  'Inversiones',
  'Viajes',
  'Regalos',
  'Otros',
];

export const incomeCategories: string[] = [
  'Salario',
  'Regalos',
  'Inversiones',
  'Otros Ingresos',
];
