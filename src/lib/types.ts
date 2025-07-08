export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: ExpenseCategory | 'Ingresos';
};

export type ExpenseCategory =
  | 'Ocio'
  | 'Hogar'
  | 'Salud'
  | 'Moda'
  | 'Servicios'
  | 'Comida'
  | 'Deporte'
  | 'Transporte'
  | 'Inversiones'
  | 'Viajes'
  | 'Regalos'
  | 'Otros';

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
