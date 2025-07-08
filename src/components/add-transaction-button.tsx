'use client';

import { useData } from '@/context/data-provider';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AddTransactionButton() {
  const { setTransactionFormOpen } = useData();

  return (
    <Button
      className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
      onClick={() => setTransactionFormOpen(true)}
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add Transaction</span>
    </Button>
  );
}
