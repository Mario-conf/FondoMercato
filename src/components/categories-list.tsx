'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { expenseCategories } from '@/lib/types';
import { ArrowLeft, MinusCircle } from 'lucide-react';
import CategoryIcon from './category-icon';

export default function CategoriesList() {
  const incomeCategories = ['Salary', 'Gifts', 'Investments', 'Other'];

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon">
                <ArrowLeft />
            </Button>
            <h2 className="text-xl font-semibold text-center flex-1">Categories</h2>
             <div className="w-10"></div>
        </div>
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses" className="mt-6">
            <div className="space-y-2">
              {expenseCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-4 rounded-xl bg-card p-3"
                >
                  <CategoryIcon category={category} />
                  <span className="flex-1 font-medium">{category}</span>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive rounded-full">
                    <MinusCircle className="h-6 w-6" />
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 h-12 text-base font-semibold">
              Add New Expense Category
            </Button>
          </TabsContent>
          <TabsContent value="income" className="mt-6">
            <div className="space-y-2">
              {incomeCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-4 rounded-xl bg-card p-3"
                >
                  <CategoryIcon category="Income" />
                  <span className="flex-1 font-medium">{category}</span>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive rounded-full">
                    <MinusCircle className="h-6 w-6" />
                  </Button>
                </div>
              ))}
            </div>
             <Button className="w-full mt-6 h-12 text-base font-semibold">
                Add New Income Category
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
