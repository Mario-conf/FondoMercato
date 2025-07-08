
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
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
import { ArrowLeft, MinusCircle, Pencil } from 'lucide-react';
import CategoryIcon from './category-icon';
import { useData } from '@/context/data-provider';
import type { ExpenseCategory } from '@/lib/types';

export default function CategoriesList() {
  const {
    expenseCategories,
    incomeCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
  } = useData();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [categoryType, setCategoryType] = useState<'expense' | 'income'>('expense');
  const [currentCategory, setCurrentCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const openDialog = (
    mode: 'add' | 'edit',
    type: 'expense' | 'income',
    category?: string
  ) => {
    setDialogMode(mode);
    setCategoryType(type);
    if (mode === 'edit' && category) {
      setCurrentCategory(category);
      setNewCategoryName(category);
    } else {
      setCurrentCategory('');
      setNewCategoryName('');
    }
    setIsDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (newCategoryName.trim() === '') return;

    if (categoryType === 'expense') {
      if (dialogMode === 'add') {
        addExpenseCategory(newCategoryName);
      } else {
        updateExpenseCategory(currentCategory, newCategoryName);
      }
    } else {
      if (dialogMode === 'add') {
        addIncomeCategory(newCategoryName);
      } else {
        updateIncomeCategory(currentCategory, newCategoryName);
      }
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCategory = (type: 'expense' | 'income', category: string) => {
    if (type === 'expense') {
        deleteExpenseCategory(category as ExpenseCategory);
    } else {
        deleteIncomeCategory(category);
    }
  };


  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
          <h2 className="text-xl font-semibold text-center flex-1">Categorías</h2>
          <div className="w-10"></div>
        </div>
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Gastos</TabsTrigger>
            <TabsTrigger value="income">Ingresos</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-6">
            <div className="space-y-2">
              {expenseCategories.map((category) => (
                <div key={category} className="flex items-center gap-4 rounded-xl bg-card p-3">
                  <CategoryIcon category={category} />
                  <span className="flex-1 font-medium">{category}</span>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full" onClick={() => openDialog('edit', 'expense', category)}>
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive rounded-full">
                         <MinusCircle className="h-6 w-6" />
                       </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará la categoría y las transacciones asociadas se moverán a "Otros".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCategory('expense', category)}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 h-12 text-base font-semibold" onClick={() => openDialog('add', 'expense')}>
              Añadir Nueva Categoría de Gasto
            </Button>
          </TabsContent>

          <TabsContent value="income" className="mt-6">
            <div className="space-y-2">
              {incomeCategories.map((category) => (
                <div key={category} className="flex items-center gap-4 rounded-xl bg-card p-3">
                  <CategoryIcon category="Ingresos" />
                  <span className="flex-1 font-medium">{category}</span>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full" onClick={() => openDialog('edit', 'income', category)}>
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive rounded-full">
                         <MinusCircle className="h-6 w-6" />
                       </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará la categoría y las transacciones asociadas se moverán a "Otros Ingresos".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCategory('income', category)}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 h-12 text-base font-semibold" onClick={() => openDialog('add', 'income')}>
              Añadir Nueva Categoría de Ingreso
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? 'Añadir Nueva' : 'Editar'} Categoría</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="category-name">Nombre de la Categoría</Label>
            <Input id="category-name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="mt-2" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSaveCategory}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
