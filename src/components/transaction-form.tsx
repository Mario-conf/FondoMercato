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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
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
import { CalendarIcon, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect } from 'react';
import { useData } from '@/context/data-provider';

interface TransactionFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const formSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.coerce
    .number()
    .positive({ message: 'La cantidad debe ser positiva' }),
  description: z
    .string()
    .min(2, { message: 'La descripción debe tener al menos 2 caracteres.' }),
  date: z.date(),
  category: z.string().min(1, { message: 'Por favor, selecciona una categoría.' }),
});

export default function TransactionForm({
  isOpen,
  onOpenChange,
}: TransactionFormProps) {
  const {
    expenseCategories,
    incomeCategories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    editingTransaction,
    setEditingTransaction,
  } = useData();

  const isEditMode = !!editingTransaction;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'expense',
      amount: 0,
      description: '',
      date: new Date(),
      category: '',
    },
  });
  
  const transactionType = form.watch('type');

  useEffect(() => {
    if (editingTransaction) {
      form.reset({
        ...editingTransaction,
        date: new Date(editingTransaction.date),
      });
    } else {
      form.reset({
        type: 'expense',
        amount: 0,
        description: '',
        date: new Date(),
        category: '',
      });
    }
  }, [editingTransaction, form, isOpen]);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setEditingTransaction(null);
      form.reset({
        type: 'expense',
        amount: 0,
        description: '',
        date: new Date(),
        category: '',
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
      ...values,
      amount: Number(values.amount),
    };
    if (isEditMode && editingTransaction) {
      updateTransaction(editingTransaction.id, finalValues);
    } else {
      addTransaction(finalValues);
    }
    handleOpenChange(false);
  }

  const handleDelete = () => {
    if (editingTransaction) {
      deleteTransaction(editingTransaction.id);
      handleOpenChange(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle className="font-headline">
              {isEditMode ? 'Editar Transacción' : 'Nueva Transacción'}
            </SheetTitle>
            {isEditMode && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción es irreversible y eliminará la transacción permanentemente.
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
            {isEditMode ? 'Modifica los detalles de la transacción.' : 'Añade un nuevo ingreso o gasto a tu registro.'}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              id="transaction-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-1"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de Transacción</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue('category', '');
                        }}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="expense" id="expense" />
                          </FormControl>
                          <FormLabel htmlFor="expense" className="font-normal">
                            Gasto
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="income" id="income" />
                          </FormControl>
                          <FormLabel htmlFor="income" className="font-normal">
                            Ingreso
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input placeholder="p. ej., Café, Salario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {transactionType === 'expense'
                          ? expenseCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))
                          : incomeCategories.map((cat) => (
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
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: es })
                            ) : (
                              <span>Elige una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={es}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
            form="transaction-form"
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isEditMode ? 'Actualizar Transacción' : 'Añadir Transacción'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
