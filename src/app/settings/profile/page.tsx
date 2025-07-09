'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/context/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
});

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, updateUser, theme, setTheme } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    try {
      updateUser(values);
      toast({
        title: 'Perfil Actualizado',
        description: 'Tus datos se han guardado correctamente.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al actualizar',
        description: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
      });
    }
  };

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center p-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex size-12 shrink-0 items-center justify-start -ml-2 p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          Editar Perfil
        </h1>
      </header>
      <main className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Guardar Cambios
            </Button>
          </form>
        </Form>
        <Separator className="my-8" />
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Apariencia</h3>
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="dark-mode-switch" className="text-base">Modo Oscuro</Label>
                    <p className="text-sm text-muted-foreground">
                        Activa el modo oscuro para una experiencia visual diferente.
                    </p>
                </div>
                <Switch
                    id="dark-mode-switch"
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeChange}
                />
            </div>
        </div>
      </main>
    </div>
  );
}
