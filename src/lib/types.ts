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
  'Ahorros a Largo Plazo',
  'Comida y Bebida',
  'Compras',
  'Cuidado Personal',
  'Educación',
  'Eventos Sociales',
  'Familia y Niños',
  'Hogar',
  'Impuestos',
  'Inversiones',
  'Mascotas',
  'Ocio y Entretenimiento',
  'Pago de Deudas',
  'Regalos y Donaciones',
  'Reparaciones',
  'Restaurantes',
  'Salud y Bienestar',
  'Seguros',
  'Servicios Públicos',
  'Suscripciones',
  'Tasas y Comisiones',
  'Tecnología',
  'Transporte',
  'Viajes',
  'Otros Gastos',
];

export const incomeCategories: string[] = [
  'Salario / Nómina',
  'Trabajo Freelance',
  'Ventas Online',
  'Ingresos Pasivos',
  'Inversiones / Dividendos',
  'Regalos Recibidos',
  'Reembolsos',
  'Alquileres Recibidos',
  'Becas y Ayudas',
  'Bonificaciones',
  'Horas Extra',
  'Intereses Bancarios',
  'Venta de Activos',
  'Ingresos por Hobbies',
  'Propinas',
  'Premios y Lotería',
  'Pensión',
  'Seguro de Desempleo',
  'Cashback',
  'Préstamos Recibidos',
  'Ingresos de Negocio',
  'Derechos de Autor',
  'Ayuda Familiar',
  'Criptomonedas (Venta)',
  'Otros Ingresos',
];