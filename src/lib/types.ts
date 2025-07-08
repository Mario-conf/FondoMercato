export type Transaction = {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
};

export type ExpenseCategory = string;

export type Budget = {
  id: string;
  category: ExpenseCategory;
  amount: number;
  month: string; // YYYY-MM format
};

export const expenseCategories: ExpenseCategory[] = [
  'Ahorro',
  'Agua',
  'Alquiler',
  'App',
  'Auto',
  'Cine',
  'Combustible',
  'Comunidad',
  'Compras',
  'Curso',
  'Deuda',
  'Donación',
  'Estética',
  'Evento',
  'Extra',
  'Gas',
  'Gimnasio',
  'Impuestos estatales',
  'Impuestos municipales',
  'Internet',
  'Juegos',
  'Libros',
  'Luz',
  'Mantenimiento',
  'Matrícula',
  'Peaje',
  'Plataforma',
  'Regalo',
  'Restaurantes',
  'Ropa',
  'Salud',
  'Seguro hogar',
  'Snacks',
  'Supermercado',
  'Suscripción',
  'Taller',
  'Transporte',
  'Viaje',
];

export const incomeCategories: string[] = [
  'Apoyo',
  'Beca',
  'Bono',
  'Freelance',
  'Inversión',
  'Pasivo',
  'Sueldo',
  'Venta',
];
