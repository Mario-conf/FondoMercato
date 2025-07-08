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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useEffect } from 'react';
import { useData } from '@/context/data-provider';
import { format } from 'date-fns';

interface BudgetFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const formSchema = z.object({
  amount: z.coerce
    .number()
    .positive({ message: 'La cantidad debe ser positiva' }),
  category: z
    .string()
    .min(1, { message: 'Por favor, selecciona una categoría.' }),
});

export default function BudgetForm({ isOpen, onOpenChange }: BudgetFormProps) {
  const {
    expenseCategories,
    addBudget,
    updateBudget,
    deleteBudget,
    editingBudget,
    setEditingBudget,
  } = useData();

  const isEditMode = !!editingBudget;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: '',
    },
  });

  useEffect(() => {
    if (editingBudget) {
      form.reset({
        amount: editingBudget.amount,
        category: editingBudget.category,
      });
    } else {
      form.reset({
        amount: 0,
        category: '',
      });
    }
  }, [editingBudget, form, isOpen]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setEditingBudget(null);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const budgetData = {
      ...values,
      month: format(new Date(), 'yyyy-MM'), // We only support monthly budgets for now
    };
    if (isEditMode && editingBudget) {
      updateBudget(editingBudget.id, budgetData);
    } else {
      addBudget(budgetData);
    }
    handleOpenChange(false);
  }

  const handleDelete = () => {
    if (editingBudget) {
      deleteBudget(editingBudget.id);
      handleOpenChange(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle className="font-headline">
              {isEditMode ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}
            </SheetTitle>
            {isEditMode && (
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
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irreversible y eliminará el presupuesto
                      permanentemente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className={cn(buttonVariants({ variant: 'destructive' }))}
                      onClick={handleDelete}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <SheetDescription>
            {isEditMode
              ? 'Modifica los detalles del presupuesto.'
              : 'Añade un nuevo presupuesto para una categoría.'}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              id="budget-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-1"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isEditMode}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría de gasto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {expenseCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad del Presupuesto</FormLabel>
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
            form="budget-form"
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isEditMode ? 'Actualizar Presupuesto' : 'Añadir Presupuesto'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
