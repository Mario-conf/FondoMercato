'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-provider';
import { LogOut, User, Bell, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { logout } = useAuth();

  const settingsItems = [
    {
      href: '/settings/profile',
      icon: User,
      label: 'Editar Perfil',
    },
    {
      href: '/settings/security',
      icon: Shield,
      label: 'Seguridad',
    },
    {
      href: '/settings/notifications',
      icon: Bell,
      label: 'Notificaciones',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center p-4 pb-2 justify-center">
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Ajustes
        </h1>
      </header>
      <main className="mx-auto w-full max-w-lg px-4 py-8 space-y-6">
        <div className="bg-secondary rounded-xl p-2 space-y-1">
          {settingsItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link href={item.href} passHref>
                <button className="flex items-center justify-between p-3 w-full text-left rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-4">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </Link>
              {index < settingsItems.length - 1 && (
                <Separator className="bg-border/50 mx-3 w-auto" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-secondary rounded-xl p-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 p-3"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
        <div className="text-center text-xs text-muted-foreground pt-4">
            <p>© 2025 Fondo Mercato. Todos los derechos reservados.</p>
            <p>Una aplicación de Albaydex.</p>
        </div>
      </main>
    </div>
  );
}
