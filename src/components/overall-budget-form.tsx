'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { useEffect } from 'react';
import { useData } from '@/context/data-provider';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverallBudgetFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const formSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: 'La cantidad debe ser positiva' }),
});

export default function OverallBudgetForm({
  isOpen,
  onOpenChange,
}: OverallBudgetFormProps) {
  const { overallBudget, updateOverallBudget } = useData();
  const currentMonthKey = format(new Date(), 'yyyy-MM');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        amount: overallBudget[currentMonthKey] || 0,
      });
    }
  }, [overallBudget, currentMonthKey, form, isOpen]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateOverallBudget(currentMonthKey, values.amount);
    onOpenChange(false);
  }

  const handleDelete = () => {
    updateOverallBudget(currentMonthKey, 0); // Logic in provider will delete the key
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle className="font-headline">
              Editar Presupuesto General
            </SheetTitle>
            {typeof overallBudget[currentMonthKey] === 'number' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Restablecer presupuesto general?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará el presupuesto general personalizado
                      para este mes. El total se calculará automáticamente a
                      partir de la suma de los presupuestos por categoría.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(buttonVariants({ variant: 'destructive' }))}
                      onClick={handleDelete}
                    >
                      Restablecer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <SheetDescription>
            Establece tu límite de gastos total para el mes actual. Si no se establece, se sumarán los presupuestos por categoría.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              id="overall-budget-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-1"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad del Presupuesto General</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^\d*\.?\d{0,2}$/;

                          if (value === '' || regex.test(value)) {
                            if (
                              value.length > 1 &&
                              value.startsWith('0') &&
                              !value.startsWith('0.')
                            ) {
                              field.onChange(value.substring(1));
                            } else {
                              field.onChange(value);
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <SheetFooter className="pt-4 border-t">
          <Button
            type="submit"
            form="overall-budget-form"
            className="w-full bg-primary hover:bg-primary/90"
          >
            Actualizar Presupuesto
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
