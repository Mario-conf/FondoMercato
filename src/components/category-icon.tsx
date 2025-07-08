'use client';

import { Car, Home, MoreHorizontal, Shirt, TrendingUp, Lightbulb, Gamepad2, Pill, Landmark, Plane, Gift, Film, UtensilsCrossed } from 'lucide-react';
import { useData } from '@/context/data-provider';
import type { ExpenseCategory } from '@/lib/types';

interface CategoryIconProps {
  category: string;
}

const iconMap: Record<string, React.ElementType> = {
  Ocio: Film,
  Hogar: Home,
  Salud: Pill,
  Moda: Shirt,
  Servicios: Lightbulb,
  Comida: UtensilsCrossed,
  Deporte: Gamepad2,
  Transporte: Car,
  Inversiones: Landmark,
  Viajes: Plane,
  Regalos: Gift,
  Otros: MoreHorizontal,
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const { incomeCategories } = useData();

  let Icon;
  if (incomeCategories.includes(category)) {
    Icon = TrendingUp;
  } else {
    Icon = iconMap[category] || MoreHorizontal;
  }
  
  return (
    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-secondary">
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}
