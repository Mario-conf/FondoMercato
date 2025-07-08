
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
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { type Transaction } from '@/lib/types';
import { getCategorySuggestion } from '@/lib/actions';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/data-provider';

interface TransactionFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const formSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.coerce.number().positive({ message: 'La cantidad debe ser positiva' }),
  description: z.string().min(2, { message: 'La descripción debe tener al menos 2 caracteres.' }),
  date: z.date(),
  category: z.string().min(1, { message: 'Por favor, selecciona una categoría.' }),
});

export default function TransactionForm({ isOpen, onOpenChange, onAddTransaction }: TransactionFormProps) {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { toast } = useToast();
  const { expenseCategories } = useData();
  
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

  const handleSuggestCategory = async () => {
    const description = form.getValues('description');
    if (!description) {
      toast({
        variant: 'destructive',
        title: 'Descripción necesaria',
        description: 'Por favor, introduce una descripción para obtener una sugerencia de categoría.',
      });
      return;
    }
    setIsAiLoading(true);
    try {
      const result = await getCategorySuggestion(description);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.suggestedCategory) {
        form.setValue('category', result.suggestedCategory);
        toast({
          title: 'Sugerencia de IA',
          description: `Hemos categorizado esto como "${result.suggestedCategory}".`,
        });
      } else {
         toast({
          title: 'Sin Sugerencia',
          description: `La IA no pudo determinar una categoría.`,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (error as Error).message,
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const finalValues = {
        ...values,
        category: values.type === 'income' ? 'Ingresos' : values.category,
        amount: Number(values.amount) // Ensure amount is a number
    }
    onAddTransaction(finalValues);
    form.reset({
      type: 'expense',
      amount: 0,
      description: '',
      date: new Date(),
      category: '',
    });
    onOpenChange(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">Nueva Transacción</SheetTitle>
          <SheetDescription>Añade un nuevo ingreso o gasto a tu registro.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
            <Form {...form}>
            <form id="transaction-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
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
                            form.setValue('category', value === 'income' ? 'Ingresos' : '');
                        }}
                        defaultValue={field.value}
                        className="flex space-x-4"
                        >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="expense" id="expense" />
                            </FormControl>
                            <FormLabel htmlFor="expense" className="font-normal">Gasto</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="income" id="income" />
                            </FormControl>
                            <FormLabel htmlFor="income" className="font-normal">Ingreso</FormLabel>
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
                        <Input type="number" placeholder="0.00" {...field} />
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

                {transactionType === 'expense' && (
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Categoría</FormLabel>
                            <Button variant="outline" size="sm" type="button" onClick={handleSuggestCategory} disabled={isAiLoading}>
                                <Sparkles className={cn("mr-2 h-4 w-4", isAiLoading && "animate-spin")}/>
                                Sugerir
                            </Button>
                        </div>
                        <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {expenseCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                )}
                
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
          <Button type="submit" form="transaction-form" className="w-full bg-primary hover:bg-primary/90">
            Añadir Transacción
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
