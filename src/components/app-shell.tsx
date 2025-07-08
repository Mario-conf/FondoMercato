'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/bottom-nav';
import AddTransactionButton from '@/components/add-transaction-button';
import TransactionForm from '@/components/transaction-form';
import { useData } from '@/context/data-provider';
import BudgetForm from './budget-form';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    isTransactionFormOpen,
    setTransactionFormOpen,
    isBudgetFormOpen,
    setBudgetFormOpen,
  } = useData();

  const showNav = !['/login', '/signup', '/onboarding'].includes(pathname);
  const showAddButton = ['/', '/stats'].includes(pathname);

  return (
    <>
      <div className={showNav ? 'pb-16' : ''}>{children}</div>
      {showNav && (
        <>
          <BottomNav />
          {showAddButton && <AddTransactionButton />}
          <TransactionForm
            isOpen={isTransactionFormOpen}
            onOpenChange={setTransactionFormOpen}
          />
          <BudgetForm
            isOpen={isBudgetFormOpen}
            onOpenChange={setBudgetFormOpen}
          />
        </>
      )}
    </>
  );
}
