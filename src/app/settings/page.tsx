'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-provider';
import { LogOut, User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center p-4 pb-2 justify-center">
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Ajustes
        </h1>
      </header>
      <main className="mx-auto w-full max-w-lg px-4 py-8 space-y-6">
        <div className="bg-secondary rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Editar Perfil</span>
            </div>
            <Button variant="ghost" size="sm" disabled>
              Próximamente
            </Button>
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Seguridad</span>
            </div>
            <Button variant="ghost" size="sm" disabled>
              Próximamente
            </Button>
          </div>
          <Separator className="bg-border/50" />
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Notificaciones</span>
            </div>
            <Button variant="ghost" size="sm" disabled>
              Próximamente
            </Button>
          </div>
        </div>

        <div className="bg-secondary rounded-xl p-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </Button>
        </div>
      </main>
    </div>
  );
}
