'use client';

import { 
  Car, 
  Home, 
  MoreHorizontal, 
  TrendingUp, 
  Lightbulb, 
  Landmark, 
  Plane, 
  Gift, 
  UtensilsCrossed,
  CupSoda,
  Wifi,
  ShoppingBag,
  Popcorn,
  HeartPulse,
  Scissors,
  BookOpen,
  Dog,
  Baby,
  Receipt,
  FileText,
  Shield,
  CreditCard,
  Wrench,
  Laptop,
  Users,
  PiggyBank
} from 'lucide-react';
import { useData } from '@/context/data-provider';

interface CategoryIconProps {
  category: string;
}

const iconMap: Record<string, React.ElementType> = {
  'Comida y Bebida': UtensilsCrossed,
  'Restaurantes': CupSoda,
  'Transporte': Car,
  'Hogar': Home,
  'Servicios Públicos': Lightbulb,
  'Suscripciones': Wifi,
  'Compras': ShoppingBag,
  'Ocio y Entretenimiento': Popcorn,
  'Salud y Bienestar': HeartPulse,
  'Cuidado Personal': Scissors,
  'Educación': BookOpen,
  'Viajes': Plane,
  'Regalos y Donaciones': Gift,
  'Mascotas': Dog,
  'Familia y Niños': Baby,
  'Inversiones': Landmark,
  'Tasas y Comisiones': Receipt,
  'Impuestos': FileText,
  'Seguros': Shield,
  'Pago de Deudas': CreditCard,
  'Reparaciones': Wrench,
  'Tecnología': Laptop,
  'Eventos Sociales': Users,
  'Ahorros a Largo Plazo': PiggyBank,
  'Otros Gastos': MoreHorizontal,
  // Fallbacks for old categories to not break user data
  'Ocio': Popcorn,
  'Salud': HeartPulse,
  'Moda': ShoppingBag,
  'Servicios': Lightbulb,
  'Comida': UtensilsCrossed,
  'Deporte': Popcorn,
  'Regalos': Gift,
  'Otros': MoreHorizontal,
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
