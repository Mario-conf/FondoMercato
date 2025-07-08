'use client';

import React, { useMemo } from 'react';
import type { Transaction, ExpenseCategory } from '@/lib/types';
import { 
  Home, 
  Lightbulb,
  Droplets,
  Flame,
  Wifi,
  Wrench,
  Shield,
  Users,
  Receipt,
  FileText,
  ShoppingCart,
  UtensilsCrossed,
  Cookie,
  Bus,
  Fuel,
  Construction,
  Car,
  CircleDollarSign,
  GraduationCap,
  BookOpen,
  School,
  Tv,
  Shirt,
  Scissors,
  Repeat,
  AppWindow,
  HeartPulse,
  Dumbbell,
  Popcorn,
  Ticket,
  Gamepad2,
  Plane,
  ShoppingBag,
  CreditCard,
  PiggyBank,
  Gift,
  MoreHorizontal,
  TrendingUp,
  Landmark,
  Laptop
} from 'lucide-react';


interface ExpensesByCategoryProps {
  transactions: Transaction[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const iconMap: Record<string, React.ElementType> = {
  'Ahorro': PiggyBank,
  'Agua': Droplets,
  'Alquiler': Home,
  'App': AppWindow,
  'Auto': Car,
  'Cine': Popcorn,
  'Combustible': Fuel,
  'Comunidad': Users,
  'Compras': ShoppingBag,
  'Curso': School,
  'Deuda': CreditCard,
  'Donación': Gift,
  'Estética': Scissors,
  'Evento': Ticket,
  'Extra': MoreHorizontal,
  'Gas': Flame,
  'Gimnasio': Dumbbell,
  'Impuestos estatales': FileText,
  'Impuestos municipales': Receipt,
  'Internet': Wifi,
  'Juegos': Gamepad2,
  'Libros': BookOpen,
  'Luz': Lightbulb,
  'Mantenimiento': Wrench,
  'Matrícula': GraduationCap,
  'Peaje': CircleDollarSign,
  'Plataforma': Tv,
  'Regalo': Gift,
  'Restaurantes': UtensilsCrossed,
  'Ropa': Shirt,
  'Salud': HeartPulse,
  'Seguro hogar': Shield,
  'Snacks': Cookie,
  'Supermercado': ShoppingCart,
  'Suscripción': Repeat,
  'Taller': Construction,
  'Transporte': Bus,
  'Viaje': Plane,
  // Fallbacks for old categories
  'Donación y Regalos': Gift,
  'Comida y Bebida': UtensilsCrossed,
  'Hogar': Home,
  'Servicios Públicos': Lightbulb,
  'Ocio y Entretenimiento': Popcorn,
  'Salud y Bienestar': HeartPulse,
  'Cuidado Personal': Scissors,
  'Educación': BookOpen,
  'Regalos y Donaciones': Gift,
  'Inversiones': Landmark,
  'Tasas y Comisiones': Receipt,
  'Impuestos': FileText,
  'Pago de Deudas': CreditCard,
  'Reparaciones': Wrench,
  'Tecnología': Laptop,
  'Otros Gastos': MoreHorizontal,
  'Ingresos': TrendingUp,
};

const CategoryIcon = ({ category }: { category: ExpenseCategory }) => {
    const Icon = iconMap[category] || MoreHorizontal;
    return <Icon className="h-6 w-6" />;
};

export default function ExpensesByCategory({ transactions }: ExpensesByCategoryProps) {
  const expensesByCategory = useMemo(() => {
    const categoryMap: { [key in ExpenseCategory]?: { amount: number; count: number } } = {};

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const category = t.category as ExpenseCategory;
        if (!categoryMap[category]) {
          categoryMap[category] = { amount: 0, count: 0 };
        }
        categoryMap[category]!.amount += t.amount;
        categoryMap[category]!.count += 1;
      });

    return Object.entries(categoryMap)
      .map(([category, data]) => ({
        category: category as ExpenseCategory,
        amount: data.amount,
        count: data.count,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  return (
    <div className="space-y-0">
      {expensesByCategory.length > 0 ? (
        expensesByCategory.map(({ category, amount }) => (
          <div key={category} className="flex items-center gap-4 min-h-[72px] py-2">
            <div className="text-white flex items-center justify-center rounded-lg bg-accent shrink-0 size-12">
                <CategoryIcon category={category} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-base font-medium leading-normal line-clamp-1">{category}</p>
              <p className="text-muted-foreground text-sm font-normal leading-normal line-clamp-2">{formatCurrency(amount)}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-muted-foreground">No hay gastos para mostrar.</div>
      )}
    </div>
  );
}
