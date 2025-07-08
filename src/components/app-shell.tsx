'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/bottom-nav';
import AddTransactionButton from '@/components/add-transaction-button';
import TransactionForm from '@/components/transaction-form';
import { useData } from '@/context/data-provider';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isTransactionFormOpen, setTransactionFormOpen } = useData();

    const showNav = !['/login', '/signup', '/onboarding'].includes(pathname);

    return (
        <>
            <div className={showNav ? "pb-16" : ""}>{children}</div>
            {showNav && (
                <>
                    <BottomNav />
                    <AddTransactionButton />
                    <TransactionForm
                        isOpen={isTransactionFormOpen}
                        onOpenChange={setTransactionFormOpen}
                    />
                </>
            )}
        </>
    );
}
