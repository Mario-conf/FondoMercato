'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, CircleDollarSign, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/stats', label: 'Transacciones', icon: CreditCard },
  { href: '/budgets', label: 'Presupuesto', icon: CircleDollarSign },
  { href: '/settings', label: 'Perfil', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-accent bg-secondary">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-4 items-center px-4 pb-2 pt-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              href={href}
              key={label}
              className={cn(
                'flex flex-col items-center justify-end gap-1 rounded-full p-2 transition-colors',
                isActive
                  ? 'text-foreground'
                  : 'text-secondary-foreground hover:text-foreground'
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center">
                 <Icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium leading-normal tracking-[0.015em]">{label}</span>
            </Link>
          );
        })}
      </div>
       {/* iOS home bar safe area */}
      <div className="h-5 bg-secondary"></div>
    </nav>
  );
}
