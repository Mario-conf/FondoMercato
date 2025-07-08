'use client';

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
  Laptop,
} from 'lucide-react';
import { useData } from '@/context/data-provider';

interface CategoryIconProps {
  category: string;
}

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
  // Fallbacks for old categories to not break user data
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
  'Eventos Sociales': Users,
  'Ahorros a Largo Plazo': PiggyBank,
  'Otros Gastos': MoreHorizontal,
  'Ocio': Popcorn,
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
