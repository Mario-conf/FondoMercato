'use client';

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

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Por favor, introduce tu contraseña actual.' }),
    newPassword: z.string().min(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export default function SecuritySettingsPage() {
  const router = useRouter();
  const { changePassword } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof securitySchema>) => {
    try {
      changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast({
        title: 'Contraseña Actualizada',
        description: 'Tu contraseña se ha cambiado correctamente.',
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al cambiar la contraseña',
        description: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
      });
    }
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
          Seguridad
        </h1>
      </header>
      <main className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Cambiar Contraseña
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
