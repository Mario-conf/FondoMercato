import { Car, Home, MoreHorizontal, Shirt, ShoppingCart, TrendingUp, Lightbulb, Martini, Gamepad2, Pill, Landmark, Plane, Gift } from 'lucide-react';
import type { ExpenseCategory } from '@/lib/types';

interface CategoryIconProps {
  category: ExpenseCategory | 'Income';
}

const iconMap: Record<ExpenseCategory | 'Income', React.ElementType> = {
  Leisure: Martini,
  Home: Home,
  Healthcare: Pill,
  Fashion: Shirt,
  Utilities: Lightbulb,
  Groceries: ShoppingCart,
  Sport: Gamepad2,
  Transport: Car,
  Investments: Landmark,
  Travel: Plane,
  Gifts: Gift,
  Other: MoreHorizontal,
  Income: TrendingUp,
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const Icon = iconMap[category] || MoreHorizontal;
  return (
    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-secondary">
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}
