
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-provider';
import { LogOut, User, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-lg px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold font-headline tracking-tight md:text-5xl">
          AJUSTES
        </h1>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cuenta</CardTitle>
              <CardDescription>
                Gestiona la configuración de tu cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Editar Perfil</span>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Próximamente
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Seguridad</span>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Próximamente
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Notificaciones</span>
                </div>
                 <Button variant="outline" size="sm" disabled>
                  Próximamente
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
                <LogOut className="mr-2 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
