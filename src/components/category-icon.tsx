import { Car, Home, MoreHorizontal, Shirt, ShoppingCart, TrendingUp, Lightbulb, Martini, Gamepad2, Pill, CreditCard, Utensils } from 'lucide-react';
import type { ExpenseCategory } from '@/lib/types';

interface CategoryIconProps {
  category: ExpenseCategory | 'Income';
}

const iconMap: Record<ExpenseCategory | 'Income', React.ElementType> = {
  Groceries: ShoppingCart,
  Transport: Car,
  Home: Home,
  Utilities: Lightbulb,
  Leisure: Martini,
  Sport: Gamepad2,
  Healthcare: Pill,
  Fashion: Shirt,
  Subscriptions: CreditCard,
  Restaurants: Utensils,
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
