import { Car, HeartPulse, Home, MoreHorizontal, Shirt, ShoppingCart, Ticket, TrendingUp } from 'lucide-react';
import type { ExpenseCategory } from '@/lib/types';

interface CategoryIconProps {
  category: ExpenseCategory | 'Income';
}

const iconMap: Record<ExpenseCategory | 'Income', React.ElementType> = {
  Groceries: ShoppingCart,
  Transport: Car,
  Home: Home,
  Entertainment: Ticket,
  Healthcare: HeartPulse,
  Fashion: Shirt,
  Other: MoreHorizontal,
  Income: TrendingUp,
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const Icon = iconMap[category] || MoreHorizontal;
  return (
    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-secondary">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
